import { Loader2Icon } from "lucide-react";
import { mapValue } from "@/lib/helpers";

enum EnumSize {
  sm = "sm",
  md = "md",
}
type TypeSize = keyof typeof EnumSize;

const Spinner = ({ size = EnumSize.md }: { size?: TypeSize }) => {
  const clsSize = mapValue(size, {
    sm: "h-4 w-4",
    md: "h-8 w-8",
  });

  // from: https://shadcn-ui-blocks.akashmoradiya.com/components/spinner
  return <Loader2Icon className={`animate-spin ${clsSize}`} />;

  // from: https://tw-elements.com/docs/standard/components/spinners/
  // return (
  //   <div
  //     className={`inline-block ${clsSize} animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white`}
  //     role="status"
  //   >
  //     <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
  //       chargement en cours...
  //     </span>
  //   </div>
  // );
};

export default Spinner;
