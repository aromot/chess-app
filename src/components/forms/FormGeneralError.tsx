import { TriangleAlert } from "lucide-react";
import { Alert } from "../ui/alert";
import { useFormContext } from "react-hook-form";

const FormGeneralError = () => {
  const form = useFormContext();

  if (!form.formState.errors.root) {
    return;
  }

  return (
    <Alert variant="destructive">
      <div className="flex gap-3 items-center">
        <div>
          <TriangleAlert className="h-4 w-4" />
        </div>
        <div>{form.formState.errors.root.message}</div>
      </div>
    </Alert>
  );
};

export default FormGeneralError;
