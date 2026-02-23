import { twMerge } from "tailwind-merge";

interface Props {
  amount: number | undefined;
  className?: string;
}

const PriceFormatter = ({ amount, className }: Props) => {
  const formattedPrice = new Number(amount).toLocaleString("fr-FR", {
    currency: "XAF",
    style: "currency",
  });
  return (
    <span className={twMerge("text-sm font-semibold text-blue-800", className)}>
      {formattedPrice}
    </span>
  );
};

export default PriceFormatter;
