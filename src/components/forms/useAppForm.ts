import { zodResolver } from "@hookform/resolvers/zod";
import {
  DeepPartial,
  DefaultValues,
  FieldValues,
  useForm,
  UseFormProps,
} from "react-hook-form";
import { AnyZodObject, z } from "zod";

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

  return useForm<z.infer<typeof schema>>(params);
}
