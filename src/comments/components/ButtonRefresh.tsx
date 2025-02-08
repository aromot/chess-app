"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

const ButtonRefresh = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.refresh()}
      variant="secondary"
      className="h-9 w-9 p-0"
    >
      <RefreshCw className="h-4 w-4" />
    </Button>
  );
};

export default ButtonRefresh;
