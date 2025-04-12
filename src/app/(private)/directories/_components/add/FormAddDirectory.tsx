"use client";

import { DirectorySchema, DirectoryFormValues } from "../../_schemas/schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppForm } from "@/components/forms/useAppForm";
import AppForm from "@/components/forms/AppForm";
import FormInput from "@/components/forms/FormInput";
import ButtonSubmit from "@/components/forms/ButtonSubmit";
import { createDirectory } from "../../_actions/actions";
import { useSession } from "next-auth/react";
import FormSelect from "@/components/forms/FormSelect";

// Définir les props attendues par le composant
interface FormAddDirectoryProps {
  onSuccess: () => void; // Callback pour gérer la fermeture du dialogue
}

export function FormAddDirectory({ onSuccess }: FormAddDirectoryProps) {
  const session = useSession();
  const form = useAppForm({
    schema: DirectorySchema,
    defaultValues: {
      name: "",
      white: "true",
      fenPosInit: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      userId: session.data?.user?.id,
    },
  });
  const onSubmit = async (data: DirectoryFormValues) => {
    const res = await createDirectory(
      data.name,
      data.white,
      data.fenPosInit,
      data.userId
    );
    console.log({ res });

    onSuccess();
  };

  return (
    <AppForm form={form} onSubmit={onSubmit} className="space-y-4">
      <FormInput label="Name" name="name" />
      <FormSelect
        name="white"
        label="Color"
        placeholder="Select a color"
        options={[
          { label: "White", value: "true" },
          { label: "Black", value: "false" },
        ]}
      />
      <FormInput label="Initial FEN" name="fenPosInit" />
      <ButtonSubmit loadingText="saving..." className="mt-4">
        Add this new repertoire
      </ButtonSubmit>
    </AppForm>
  );
}
