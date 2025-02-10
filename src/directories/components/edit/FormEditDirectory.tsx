"use client";

import { DirectorySchema, DirectoryFormValues } from "../../schema";
import { editDirectory } from "../../actions";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Directory } from "@prisma/client";
import { useAppForm } from "@/components/forms/useAppForm";
import AppForm from "@/components/forms/AppForm";
import FormInput from "@/components/forms/FormInput";
import ButtonSubmit from "@/components/forms/ButtonSubmit";

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
    schema: DirectorySchema,
    defaultValues: {
      name: directory.name,
      white: directory.white,
    },
  });
  const onSubmit = async (data: DirectoryFormValues) => {
    await editDirectory(directory.id, data.name, data.white);
    onSuccess(); // Fermer le dialogue après un ajout réussi
  };

  return (
    <AppForm form={form} onSubmit={onSubmit} className="space-y-4">
      <FormInput name="name" label="Nom" />
      <FormField
        control={form.control}
        name="white"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Couleur</FormLabel>
            <Select
              onValueChange={(value) => field.onChange(value === "true")}
              value={field.value ? "true" : "false"}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une couleur" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="true">Blanc</SelectItem>
                <SelectItem value="false">Noir</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <ButtonSubmit className="mt-4" loadingText="enregistrement en cours...">
        Modifier
      </ButtonSubmit>
    </AppForm>
  );
}
