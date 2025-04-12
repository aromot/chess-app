"use client";

import {
  DirectoryEditSchema,
  DirectoryFormValues,
} from "../../_schemas/schema";
import { editDirectory } from "../../_actions/actions";
import { Directory } from "@prisma/client";
import { useAppForm } from "@/components/forms/useAppForm";
import AppForm from "@/components/forms/AppForm";
import FormInput from "@/components/forms/FormInput";
import ButtonSubmit from "@/components/forms/ButtonSubmit";
import FormSelect from "@/components/forms/FormSelect";

// Définir les props attendues par le composant
interface FormEditDirectoryProps {
  onSuccess: () => void; // Callback pour gérer la fermeture du dialogue
  directory: Directory;
}

export function FormEditDirectory({
  onSuccess,
  directory,
}: FormEditDirectoryProps) {
  const form = useAppForm({
    schema: DirectoryEditSchema,
    defaultValues: {
      id: directory.id,
      name: directory.name,
      white: directory.white ? "true" : "false",
    },
  });
  const onSubmit = async (data: DirectoryFormValues) => {
    const res = await editDirectory(directory.id, data.name, data.white);
    console.log({ res });
    onSuccess();
  };

  return (
    <AppForm form={form} onSubmit={onSubmit} className="space-y-4">
      <FormInput name="name" label="Name" />
      <FormSelect
        name="white"
        label="Color"
        placeholder="Select a color"
        options={[
          { label: "White", value: "true" },
          { label: "Black", value: "false" },
        ]}
      />
      <ButtonSubmit className="mt-4" loadingText="saving...">
        Save
      </ButtonSubmit>
    </AppForm>
  );
}
