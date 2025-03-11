import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type Props = {
  type?: "text" | "email" | "password";
  // type: HTMLInputElement["type"];
  label: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
};

const FormInput = ({ type = "text", label, name, placeholder, disabled, value }: Props) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input type={type} placeholder={placeholder} disabled={field.disabled} {...field} />
          </FormControl>
          <FormDescription></FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
