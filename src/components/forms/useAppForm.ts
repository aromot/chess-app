import { zodResolver } from "@hookform/resolvers/zod";
import {
  DeepPartial,
  DefaultValues,
  FieldValues,
  useForm,
  UseFormProps,
} from "react-hook-form";
import { AnyZodObject, z, ZodIssue } from "zod";

export function useAppForm({
  schema,
  defaultValues,
}: {
  schema?: AnyZodObject | undefined;
  defaultValues?: DefaultValues<DeepPartial<FieldValues>>;
  // defaultValues?: FieldValues | undefined;
}) {
  const params: UseFormProps = {};

  if (schema) {
    params.resolver = zodResolver(schema);
  }

  if (defaultValues) {
    params.defaultValues = defaultValues;
  }

  const form = useForm<z.infer<typeof schema>>(params);

  form.handleServerValidationErrors = (res) => {
    if (res?.error == "validation") {
      res.errors.forEach((err: ZodIssue) => {
        err.path.forEach((path) => {
          form.setError(path, {
            type: "manual",
            message: err.message,
          });
        });
      });
    }
  };

  return form;
}
