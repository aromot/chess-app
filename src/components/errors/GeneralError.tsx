import { ReactNode } from "react";
import { Alert } from "../ui/alert";
import { TriangleAlert } from "lucide-react";

const GeneralError = ({ children }: { children: ReactNode }) => {
  return (
    <Alert variant="destructive">
      <div className="flex gap-3 items-center">
        <div>
          <TriangleAlert className="h-4 w-4" />
        </div>
        <div>{children}</div>
      </div>
    </Alert>
  );
};

export default GeneralError;
