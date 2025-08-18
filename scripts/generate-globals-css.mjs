import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

function toKebabCase(input) {
  return String(input)
    .replaceAll(/[^a-zA-Z0-9]+/g, "-")
    .replaceAll(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replaceAll(/-{2,}/g, "-")
    .replaceAll(/^-|-$/g, "");
}

function isColorToken(node) {
  return (
    node &&
    typeof node === "object" &&
    "value" in node &&
    "type" in node &&
    node.type === "color"
  );
}

function isPlainObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

// Colors/Mode 1 처리
function flattenColorTokens(root, pathParts = [], out = [], pathToVarMap = new Map()) {
  if (!root || typeof root !== "object") return { tokens: out, pathToVarMap };
  for (const [key, value] of Object.entries(root)) {
    const nextPath = [...pathParts, toKebabCase(key)];
    if (isColorToken(value)) {
      const variableName = `--color-${nextPath.slice(1).join("-")}`;
      out.push({ name: variableName, value: value.value });
      pathToVarMap.set(nextPath.join("."), variableName);
    } else if (isPlainObject(value)) {
      flattenColorTokens(value, nextPath, out, pathToVarMap);
    }
  }
  return { tokens: out, pathToVarMap };
}

// Typo/Mode 1 처리 (font, size, line-height 등)
function flattenTypoTokens(typo) {
  const lines = [];
  // 그룹/사이즈별로 모든 weight 값이 동일하면 단일 변수만 생성
  const groupOrder = ["heading", "body", "title", "caption"];
  for (const group of groupOrder) {
    const groupObj = typo[group] || typo[toKebabCase(group)] || typo[group.charAt(0).toUpperCase() + group.slice(1)];
    if (!groupObj) continue;
    // font-family
    if (typo.fontFamilies && typo.fontFamilies.pretendard) {
      lines.push(`  --text-${group}-font-family: pretendard;`);
    }
    // font-weight
    if (typo.fontWeights) {
      for (const [wKey, wVal] of Object.entries(typo.fontWeights)) {
        lines.push(`  --text-${group}-font-weight-${wVal.value.toLowerCase()}: ${wVal.value.toLowerCase() === "regular" ? 400 : FONT_WEIGHT_MAP[wVal.value.toLowerCase()] ?? wVal.value};`);
      }
    }
    // 사이즈별 처리
    for (const [sizeKey, sizeObj] of Object.entries(groupObj)) {
      if (!isPlainObject(sizeObj)) continue;
      // font-size, line-height는 그룹/사이즈 단일 변수로 한 번만 생성, font-weight만 weight별로 생성
      const fontSizes = [];
      const lineHeights = [];
      const fontWeightMap = {};
      for (const [weightKey, weightObj] of Object.entries(sizeObj)) {
        if (!isPlainObject(weightObj) || !weightObj.value) continue;
        const val = weightObj.value;
        function resolveToken(token, tokens, type) {
          if (!token) return "";
          const refMatch = token.match(/^\{(.+)\}$/);
          if (refMatch) {
            const ref = refMatch[1].split(".");
            if (ref.length === 2 && tokens[type] && tokens[type][ref[1]] && tokens[type][ref[1]].value) {
              return tokens[type][ref[1]].value;
            }
          }
          return token.replace(/[^0-9]/g, "");
        }
        const fontSize = resolveToken(val.fontSize, typo, "fontSize");
        const lineHeight = resolveToken(val.lineHeight, typo, "lineHeights");
        const fwToken = val.fontWeight;
        let fw = "";
        if (fwToken) {
          const refMatch = fwToken.match(/^\{(.+)\}$/);
          if (refMatch) {
            const ref = refMatch[1].split(".");
            if (ref.length === 2 && typo.fontWeights && typo.fontWeights[ref[1]] && typo.fontWeights[ref[1]].value) {
              fw = typo.fontWeights[ref[1]].value.toLowerCase();
            }
          } else {
            fw = fwToken.replace(/\{|\}/g, "").split(".").pop().toLowerCase();
          }
        }
        fontSizes.push(fontSize);
        lineHeights.push(lineHeight);
        fontWeightMap[weightKey] = fw;
      }
      // font-size, line-height는 첫 weight 값으로 단일 변수 생성
      if (fontSizes.length > 0) {
        lines.push(`  --text-${group}-${toKebabCase(sizeKey)}-font-size: ${fontSizes[0]}px;`);
      }
      if (lineHeights.length > 0) {
        lines.push(`  --text-${group}-${toKebabCase(sizeKey)}-line-height: ${lineHeights[0]}px;`);
      }
  // font-weight는 그룹 공통 변수만 생성 (사이즈별 변수 생성 제거)
    }
  }
  return lines;
}

function buildTextThemeCss(textRoot) {
  // Only text/leading variables, in requested order
  const lines = [];
  const groupOrder = ["heading", "body", "title", "caption"];
  for (const group of groupOrder) {
    // font-family
    lines.push(`  --font-${group}: var(--text-${group}-font-family);`);
    // sizes
    if (!textRoot[group]) continue;
    const sizeKeys = Object.keys(textRoot[group]).filter(k => !["fontFamily", "fontWeight"].includes(k) && !k.includes("-"));
    for (const sizeKey of sizeKeys) {
      lines.push(`  --text-${group}-${sizeKey}: var(--text-${group}-${sizeKey}-font-size);`);
      lines.push(`  --leading-${group}-${sizeKey}: var(--text-${group}-${sizeKey}-line-height);`);
    }
  }
  return lines;
}

function buildTypographyUtilitiesCss(textRoot) {
  const lines = [];
  const start = "/* generated-typography-utilities:start */";
  const end = "/* generated-typography-utilities:end */";
  lines.push(start);

  // 그룹별 크기/웨이트 정의
  const config = {
    title: { sizes: ["lg", "md", "sm"], weights: ["bold", "semibold", "medium", "regular"] },
    heading: { sizes: ["3xl", "2xl", "1xl", "lg", "md", "sm"], weights: ["bold", "semibold", "medium", "regular"] },
    body: { sizes: ["2xl", "1xl", "lg", "md", "sm", "read"], weights: ["bold", "semibold", "medium", "regular"] },
    caption: { sizes: ["md", "sm"], weights: { md: ["bold", "semibold", "medium", "regular"], sm: ["medium"] } }
  };

  for (const group in config) {
    const sizes = config[group].sizes;
    const weights = config[group].weights;
    for (const size of sizes) {
      let weightList = weights;
      if (group === "caption" && typeof weights === "object") {
        weightList = weights[size] || [];
      }
      for (const weight of weightList) {
        // body-read는 weight가 항상 regular로 고정
        if (group === "body" && size === "read" && weight !== "regular") continue;
        const className = `${group}-${size}-${weight}`;
        lines.push(`@utility ${className} {`);
        lines.push(`  font-size: var(--text-${group}-${size}-font-size);`);
        lines.push(`  line-height: var(--leading-${group}-${size});`);
        lines.push(`  font-weight: var(--text-${group}-font-weight-${weight});`);
        lines.push(`}`);
      }
    }
  }
  lines.push(end);
  return lines;
}

function collectTextPrimitives(typoMode) {
  const textRoot = {};
  for (const [groupKey, groupVal] of Object.entries(typoMode)) {
    if (["fontFamilies", "fontWeights", "fontSize", "lineHeights"].includes(groupKey)) continue;
    if (!isPlainObject(groupVal)) continue;
    const groupName = toKebabCase(groupKey);
    const groupOut = (textRoot[groupName] = {});
    if (typoMode.fontFamilies && typoMode.fontFamilies.pretendard) {
      groupOut.fontFamily = typoMode.fontFamilies.pretendard.value;
    }
    if (typoMode.fontWeights) {
      const weights = {};
      for (const [wKey, wVal] of Object.entries(typoMode.fontWeights)) {
        weights[toKebabCase(wVal.value)] = FONT_WEIGHT_MAP[wVal.value.toLowerCase()] ?? wVal.value;
      }
      groupOut.fontWeight = weights;
    }
    for (const [sizeKey, sizeObj] of Object.entries(groupVal)) {
      if (!isPlainObject(sizeObj)) continue;
      for (const [weightKey, weightObj] of Object.entries(sizeObj)) {
        if (!isPlainObject(weightObj) || !weightObj.value) continue;
        const val = weightObj.value;
        const sizeName = toKebabCase(sizeKey + "-" + weightKey);
        groupOut[sizeName] = {
          fontSize: val.fontSize ? `${val.fontSize.replace(/[^0-9]/g, "")}px` : undefined,
          lineHeight: val.lineHeight ? `${val.lineHeight.replace(/[^0-9]/g, "")}px` : undefined,
          letterSpacing: val.letterSpacing ? `${val.letterSpacing.replace(/[^0-9]/g, "")}px` : undefined,
        };
      }
    }
  }
  return textRoot;
}

// Interactive/Mode 1 처리 (interactive color)
function flattenInteractiveTokens(interactive, colorMap) {
  const lines = [];
  function resolveRef(val) {
    if (typeof val !== "string") return val;
    const match = val.match(/^\{(.+)\}$/);
    if (match) {
      // 예: {gray.500} → --color-gray-500
      const ref = match[1].replace(/\./g, "-").replace(/Base-/g, "base-");
      return `var(--color-${ref})`;
    }
    return val;
  }
  function walk(obj, prefix = []) {
    for (const [key, value] of Object.entries(obj)) {
      if (isColorToken(value)) {
        const varName = `--color-${[...prefix, toKebabCase(key)].join("-")}`;
        lines.push(`  ${varName}: ${resolveRef(value.value)};`);
      } else if (isPlainObject(value)) {
        walk(value, [...prefix, toKebabCase(key)]);
      }
    }
  }
  walk(interactive.colors || {});
  return lines;
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
  const inputPath = resolve(projectRoot, "src/app/tokens.json");
  const outputPath = resolve(projectRoot, "src/app/globals.css");

  const raw = await readFile(inputPath, "utf8");
  const tokens = JSON.parse(raw);

  // Colors
  const colorsMode = tokens["Colors/Mode 1"];
  const { tokens: colorVars } = flattenColorTokens(colorsMode, ["color"]);

  // Typo
  const typoMode = tokens["Typo/Mode 1"];
  const typoVars = flattenTypoTokens(typoMode);
  const textPrimitives = collectTextPrimitives(typoMode);

  // Interactive
  const interactiveMode = tokens["Interactive/Mode 1"];
  const interactiveVars = flattenInteractiveTokens(interactiveMode, colorVars);

  // CSS 생성
  let css = `@import "tailwindcss";\n\n`;
  
  css += `:root {\n`;

  css += "  /* generated-color-tokens:start */\n";
  colorVars.forEach(({ name, value }) => {
    css += `  ${name}: ${value};\n`;
  });
  css += "  /* generated-color-tokens:end */\n\n";

  css += "  /* generated-text-tokens:start */\n";
  typoVars.forEach((line) => {
    css += line + "\n";
  });
  css += "  /* generated-text-tokens:end */\n\n";

  css += "  /* generated-interactive-tokens:start */\n";
  interactiveVars.forEach((line) => {
    css += line + "\n";
  });
  css += "  /* generated-interactive-tokens:end */\n";
  css += "}\n\n";

  css += `@theme inline {\n`;
  css += `  --color-background: var(--background);\n`;
  css += `  --color-foreground: var(--foreground);\n`;
  css += `  --font-sans: var(--font-pretendard);\n`;
  css += `  --font-mono: var(--font-geist-mono);\n\n`;
  css += "  /* generated-semantic-tokens:start */\n";
  css += "  --color-bg-interactive-primary: var(--color-blue-500);\n";
  css += "  /* generated-semantic-tokens:end */\n\n";
  css += "  /* generated-typography-tokens:start */\n";
  buildTextThemeCss(textPrimitives).forEach((line) => {
    css += line + "\n";
  });
  css += "  /* generated-typography-tokens:end */\n";
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

  buildTypographyUtilitiesCss(textPrimitives).forEach((line) => {
    css += line + "\n";
  });

  await writeFile(outputPath, css, "utf8");
  console.log(`globals.css generated!`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});