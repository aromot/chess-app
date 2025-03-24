"use client";

import { DirectorySchema, DirectoryFormValues } from "../../_schemas/schema";
import {
  Form,
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

// Définir les props attendues par le composant
interface FormAddDirectoryProps {
  onSuccess: () => void; // Callback pour gérer la fermeture du dialogue
}

export function FormAddDirectory({ onSuccess }: FormAddDirectoryProps) {
  const form = useAppForm({
    schema: DirectorySchema,
    defaultValues: {
      name: "",
      white: true,
      fenPosInit: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    },
  });
  const onSubmit = async (data: DirectoryFormValues) => {
    await createDirectory(data.name, data.white, data.fenPosInit);
    onSuccess(); // Fermer le dialogue après un ajout réussi
  };

  return (
    <AppForm form={form} onSubmit={onSubmit} className="space-y-4">
      <FormInput label="Nom" name="name" />
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
      <FormInput label="FEN DEPART" name="fenPosInit" disabled />
      <ButtonSubmit loadingText="ajout en cours..." className="mt-4">
        Ajouter
      </ButtonSubmit>
    </AppForm>
  );
}
