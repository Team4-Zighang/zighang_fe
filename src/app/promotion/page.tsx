import PromotionBase from './components/PromotionBase';
import PromotionMobile from './components/PromotionMobile';

export default function Page() {
  return (
    <main className="flex flex-col">
      <div className="hidden md:block">
        <PromotionBase />
      </div>

      <div className="block md:hidden">
        <PromotionMobile />
      </div>
    </main>
  );
}
