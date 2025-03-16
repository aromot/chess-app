import { useFormContext } from "react-hook-form";
import GeneralError from "../errors/GeneralError";

const FormGeneralError = () => {
  const form = useFormContext();

  if (!form.formState.errors.root) {
    return;
  }

  return <GeneralError>{form.formState.errors.root.message}</GeneralError>;
};

export default FormGeneralError;
