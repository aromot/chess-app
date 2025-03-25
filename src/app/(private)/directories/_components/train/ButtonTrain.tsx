"use client";

import { URLS } from "@/app/urls";
import { Button } from "@/components/ui/button";
import { formatUrl } from "@/lib/helpers";
import { Directory } from "@prisma/client";
import { useRouter } from "next/navigation";

const ButtonTrain = ({ directory }: { directory: Directory }) => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className="h-8 px-3"
      onClick={() =>
        router.push(formatUrl(URLS.training, { id: directory.id }))
      }
    >
      Train
    </Button>
  );
};

export default ButtonTrain;
