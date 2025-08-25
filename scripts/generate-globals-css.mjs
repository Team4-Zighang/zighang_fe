import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

function toKebabCase(input) {
  return String(input)
    .replaceAll(/[^a-zA-Z0-9]+/g, '-')
    .replaceAll(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replaceAll(/-{2,}/g, '-')
    .replaceAll(/^-|-$/g, '');
}

function isColorToken(node) {
  return (
    node &&
    typeof node === 'object' &&
    'value' in node &&
    'type' in node &&
    node.type === 'color'
  );
}

function isPlainObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

// Semantic/Mode 1 처리
function flattenSemanticTokens(
  root,
  colorPathToVarMap,
  out = [],
  pathParts = []
) {
  if (!root || typeof root !== 'object') return out;
  for (const [key, value] of Object.entries(root)) {
    const nextPath = [...pathParts, toKebabCase(key)];
    if (
      isColorToken(value) ||
      (value && value.type === 'color' && value.value)
    ) {
      let resolvedValue = value.value;
      // 토큰 참조 치환
      const refMatch = resolvedValue.match(/^\{(.+)\}$/);
      if (refMatch) {
        const ref = refMatch[1].replace(/\./g, '-');
        // colorPathToVarMap은 flattenColorTokens에서 생성됨
        const varName = `--color-${ref}`;
        // 실제 값으로 치환
        const found = out.find((t) => t.name === varName);
        resolvedValue = found ? found.value : resolvedValue;
      }
      out.push({ name: `--color-${nextPath.join('-')}`, value: resolvedValue });
    } else if (isPlainObject(value)) {
      flattenSemanticTokens(value, colorPathToVarMap, out, nextPath);
    }
  }
  return out;
}

function flattenColorTokens(
  root,
  pathParts = [],
  out = [],
  pathToVarMap = new Map()
) {
  if (!root || typeof root !== 'object') return { tokens: out, pathToVarMap };
  for (const [key, value] of Object.entries(root)) {
    const nextPath = [...pathParts, toKebabCase(key)];
    if (isColorToken(value)) {
      const variableName = `--color-${nextPath.slice(1).join('-')}`;
      out.push({ name: variableName, value: value.value });
      pathToVarMap.set(nextPath.join('.'), variableName);
    } else if (isPlainObject(value)) {
      flattenColorTokens(value, nextPath, out, pathToVarMap);
    }
  }
  return { tokens: out, pathToVarMap };
}

// Typo/Mode 1 처리 (font, size, line-height 등)
function flattenTypoTokens(typo) {
  const lines = [];
  const v1Utilities = [];
  // font-weight: pretendard-0~3 공통 매핑 (root에 한 번만)
  if (typo.fontWeights) {
    for (const [wKey, wVal] of Object.entries(typo.fontWeights)) {
      let weightNum = 400;
      if (wKey === 'pretendard-0') weightNum = 600;
      else if (wKey === 'pretendard-1') weightNum = 500;
      else if (wKey === 'pretendard-2') weightNum = 700;
      else if (wKey === 'pretendard-3') weightNum = 400;
      lines.push(`  --text-font-weight-${wKey}: ${weightNum};`);
    }
  }

  // V2: title, heading, body, caption 그룹별 처리
  const groupOrder = ['heading', 'body', 'title', 'caption'];
  for (const group of groupOrder) {
    const groupObj =
      typo[group] ||
      typo[toKebabCase(group)] ||
      typo[group.charAt(0).toUpperCase() + group.slice(1)];
    if (!groupObj) continue;
    // font-family
    if (typo.fontFamilies && typo.fontFamilies.pretendard) {
      lines.push(`  --text-${group}-font-family: pretendard;`);
    }
    // V2 구조 flatten: 사이즈별-웨이트별 변수 생성
    for (const [sizeKey, sizeObj] of Object.entries(groupObj)) {
      if (!isPlainObject(sizeObj)) continue;
      for (const [weightKey, weightObj] of Object.entries(sizeObj)) {
        if (!isPlainObject(weightObj) || !weightObj.value) continue;
        const val = weightObj.value;
        function resolveToken(token, tokens, type) {
          if (!token) return '';
          const refMatch = token.match(/^\{(.+)\}$/);
          if (refMatch) {
            const ref = refMatch[1].split('.');
            if (
              ref.length === 2 &&
              tokens[type] &&
              tokens[type][ref[1]] &&
              tokens[type][ref[1]].value
            ) {
              return tokens[type][ref[1]].value;
            }
          }
          return token.replace(/[^0-9]/g, '');
        }
        const fontSize = resolveToken(val.fontSize, typo, 'fontSize');
        const lineHeight = resolveToken(val.lineHeight, typo, 'lineHeights');
        const fontWeight = (() => {
          // fontWeight 값이 토큰 참조일 경우
          if (val.fontWeight && val.fontWeight.match(/^\{(.+)\}$/)) {
            const ref = val.fontWeight.replace(/[{}]/g, '').split('.');
            if (
              ref.length === 2 &&
              typo.fontWeights &&
              typo.fontWeights[ref[1]]
            ) {
              const wKey = ref[1];
              if (wKey === 'pretendard-0') return 600;
              if (wKey === 'pretendard-1') return 500;
              if (wKey === 'pretendard-2') return 700;
              if (wKey === 'pretendard-3') return 400;
            }
          }
          return undefined;
        })();
        const varPrefix = `--text-${group}-${toKebabCase(sizeKey)}-${toKebabCase(weightKey)}`;
        if (fontSize) lines.push(`${varPrefix}-font-size: ${fontSize}px;`);
        if (lineHeight)
          lines.push(`${varPrefix}-line-height: ${lineHeight}px;`);
        if (fontWeight) lines.push(`${varPrefix}-font-weight: ${fontWeight};`);
      }
    }
  }

  // V1: Web/Mobile utility 생성 (body 아래에 출력용)
  if (typo.V1) {
    function resolveToken(token, tokens) {
      if (!token) return '';
      const refMatch = token.match(/^(.+)$/);
      if (refMatch) {
        const ref = refMatch[1].split('.');
        if (
          ref.length === 2 &&
          tokens[ref[0]] &&
          tokens[ref[0]][ref[1]] &&
          tokens[ref[0]][ref[1]].value
        ) {
          return tokens[ref[0]][ref[1]].value;
        }
      }
      return token;
    }
    for (const device of Object.keys(typo.V1)) {
      for (const styleName of Object.keys(typo.V1[device])) {
        const style = typo.V1[device][styleName];
        if (!style || !style.value) continue;
        const val = style.value;
        const fontSizeVar = `var(--text-${toKebabCase(device)}-${toKebabCase(styleName)}-font-size)`;
        const lineHeightVar = `var(--text-${toKebabCase(device)}-${toKebabCase(styleName)}-line-height)`;
        // fontWeight 토큰에서 pretendard-x 추출
        let fontWeightKey = '';
        if (val.fontWeight) {
          const match = val.fontWeight.match(/pretendard-[0-3]/);
          if (match) fontWeightKey = match[0];
        }
        let fontWeightVar = fontWeightKey
          ? `var(--text-font-weight-${fontWeightKey})`
          : '';
        let util = `@utility ${toKebabCase(device)}-${toKebabCase(styleName)} {\n  font-size: ${fontSizeVar};\n  line-height: ${lineHeightVar};\n  font-weight: ${fontWeightVar};\n}`;
        v1Utilities.push(util);
      }
    }
  }

  // V1: Web/Mobile 스타일 처리
  if (typo.V1) {
    function resolveToken(token, tokens) {
      if (!token) return '';
      const refMatch = token.match(/^\{(.+)\}$/);
      if (refMatch) {
        const ref = refMatch[1].split('.');
        if (
          ref.length === 2 &&
          tokens[ref[0]] &&
          tokens[ref[0]][ref[1]] &&
          tokens[ref[0]][ref[1]].value
        ) {
          return tokens[ref[0]][ref[1]].value;
        }
      }
      return token;
    }
    for (const device of Object.keys(typo.V1)) {
      for (const styleName of Object.keys(typo.V1[device])) {
        const style = typo.V1[device][styleName];
        if (!style || !style.value) continue;
        const val = style.value;
        const fontFamily = val.fontFamily ? 'pretendard' : '';
        const fontWeightKey = val.fontWeight
          ? val.fontWeight.replace(/\{|\}/g, '').split('.').pop().toLowerCase()
          : '';
        const fontSize = resolveToken(val.fontSize, typo);
        const lineHeight = resolveToken(val.lineHeight, typo);
        // 공통 변수는 한 번만 생성
        if (
          fontFamily &&
          !lines.includes(`  --text-font-family: ${fontFamily};`)
        ) {
          lines.push(`  --text-font-family: ${fontFamily};`);
        }
        // 스타일별 변수 생성
        if (fontSize) {
          lines.push(
            `  --text-${toKebabCase(device)}-${toKebabCase(styleName)}-font-size: ${fontSize}${isNaN(Number(fontSize)) ? '' : 'px'};`
          );
        }
        if (lineHeight) {
          lines.push(
            `  --text-${toKebabCase(device)}-${toKebabCase(styleName)}-line-height: ${lineHeight}${isNaN(Number(lineHeight)) ? '' : 'px'};`
          );
        }
      }
    }
  }
  return { lines, v1Utilities };
}

function collectTextPrimitives(typoMode) {
  const textRoot = {};
  for (const [groupKey, groupVal] of Object.entries(typoMode)) {
    if (
      ['fontFamilies', 'fontWeights', 'fontSize', 'lineHeights'].includes(
        groupKey
      )
    )
      continue;
    if (!isPlainObject(groupVal)) continue;
    const groupName = toKebabCase(groupKey);
    const groupOut = (textRoot[groupName] = {});
    if (typoMode.fontFamilies && typoMode.fontFamilies.pretendard) {
      groupOut.fontFamily = typoMode.fontFamilies.pretendard.value;
    }
    if (typoMode.fontWeights) {
      const weights = {};
      for (const [wKey, wVal] of Object.entries(typoMode.fontWeights)) {
        weights[toKebabCase(wVal.value)] =
          FONT_WEIGHT_MAP[wVal.value.toLowerCase()] ?? wVal.value;
      }
      groupOut.fontWeight = weights;
    }
    for (const [sizeKey, sizeObj] of Object.entries(groupVal)) {
      if (!isPlainObject(sizeObj)) continue;
      for (const [weightKey, weightObj] of Object.entries(sizeObj)) {
        if (!isPlainObject(weightObj) || !weightObj.value) continue;
        const val = weightObj.value;
        const sizeName = toKebabCase(sizeKey + '-' + weightKey);
        groupOut[sizeName] = {
          fontSize: val.fontSize
            ? `${val.fontSize.replace(/[^0-9]/g, '')}px`
            : undefined,
          lineHeight: val.lineHeight
            ? `${val.lineHeight.replace(/[^0-9]/g, '')}px`
            : undefined,
          letterSpacing: val.letterSpacing
            ? `${val.letterSpacing.replace(/[^0-9]/g, '')}px`
            : undefined,
        };
      }
    }
  }
  return textRoot;
}

// Map common weight names to numeric values
const FONT_WEIGHT_MAP = {
  thin: 100,
  extralight: 200,
  ultralight: 200,
  light: 300,
  normal: 400,
  regular: 400,
  book: 400,
  medium: 500,
  semibold: 600,
  demibold: 600,
  bold: 700,
  extrabold: 800,
  ultrabold: 800,
  black: 900,
};

async function main() {
  const projectRoot = process.cwd();
  const inputPath = resolve(projectRoot, 'src/app/tokens.json');
  const outputPath = resolve(projectRoot, 'src/app/globals.css');

  const raw = await readFile(inputPath, 'utf8');
  const tokens = JSON.parse(raw);

  // Colors
  const colorsMode = tokens['Color Palette/Mode 1'];
  const { tokens: colorVars } = flattenColorTokens(colorsMode, ['color']);

  // Typo
  const typoMode = tokens['Typo/Mode 1'];
  const { lines: typoVars, v1Utilities } = flattenTypoTokens(typoMode);
  const textPrimitives = collectTextPrimitives(typoMode);

  // letterSpacing
  const letterSpacing = typoMode.letterSpacing || {};

  // CSS 생성
  let css = `@import "tailwindcss";\n\n`;

  css += `:root {\n`;

  css += '  /* generated-color-tokens:start */\n';
  colorVars.forEach(({ name, value }) => {
    css += `  ${name}: ${value};\n`;
  });
  css += '  /* generated-color-tokens:end */\n\n';

  // letterSpacing 변수 추가
  Object.entries(letterSpacing).forEach(([key, obj]) => {
    if (obj && obj.value !== undefined) {
      css += `  --letter-spacing-${key}: ${obj.value};\n`;
    }
  });

  css += '  /* generated-text-tokens:start */\n';
  typoVars.forEach((line) => {
    css += line + '\n';
  });
  css += '  /* generated-text-tokens:end */\n';
  css += '}\n\n';

  css += `@theme inline {\n`;
  css += `  --color-background: var(--background);\n`;
  css += `  --color-foreground: var(--foreground);\n`;
  css += `  --font-sans: var(--font-pretendard);\n`;
  css += `  --font-mono: var(--font-geist-mono);\n\n`;
  css += '  /* generated-semantic-tokens:start */\n';
  css += '  --color-bg-interactive-primary: var(--color-blue-500);\n';
  css += '  /* generated-semantic-tokens:end */\n\n';
  // buildTextThemeCss 함수 호출 제거 (오류 방지)
  css += `}\n\n`;

  // 다크모드 및 body 스타일 추가
  css += `@media (prefers-color-scheme: dark) {\n`;
  css += `  :root {\n`;
  css += `    --background: #0a0a0a;\n`;
  css += `    --foreground: #ededed;\n`;
  css += `  }\n`;
  css += `}\n\n`;
  css += `body {\n`;
  css += `  background: var(--background);\n`;
  css += `  color: var(--foreground);\n`;
  css += `  font-family: Pretendard, Helvetica, sans-serif;\n`;
  css += `}\n\n`;
  // body 아래에 v1 utility 추가
  if (v1Utilities.length > 0) {
    css += '// v1\n';
    v1Utilities.forEach((util) => {
      css += util + '\n';
    });
  }

  await writeFile(outputPath, css, 'utf8');
  console.log(`globals.css generated!`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
