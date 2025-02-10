"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DirectorySchema, DirectoryFormValues } from "../../schema";
import { editDirectory } from "../../actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Directory } from "@prisma/client";
// Définir les props attendues par le composant
interface FormEditDirectoryProps {
  onSuccess: () => void; // Callback pour gérer la fermeture du dialogue
  directory: Directory;
}

export function FormEditDirectory({
  onSuccess,
  directory,
}: FormEditDirectoryProps) {
  const form = useForm<DirectoryFormValues>({
    resolver: zodResolver(DirectorySchema),
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button type="submit" className="mt-4">
          Modifier
        </Button>
      </form>
    </Form>
  );
}
