import { URLS } from "@/app/urls";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";

const BtnBack = () => {
  return (
    <Link href={URLS.dashboard}>
      <ArrowLeftCircle />
    </Link>
  );
};

export default BtnBack;
