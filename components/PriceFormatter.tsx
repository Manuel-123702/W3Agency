import { twMerge } from "tailwind-merge";

interface Props {
  amount: number | undefined;
  className?: string;
}

const PriceFormatter = ({ amount = 0, className }: Props) => {
  // Format number with French style (thousands separated by space)
  const formattedNumber = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return (
    <span className={twMerge("text-sm font-semibold text-blue-800", className)}>
      {formattedNumber} FCFA
    </span>
  );
};

export default PriceFormatter;
