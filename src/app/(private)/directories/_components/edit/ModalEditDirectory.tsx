"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormEditDirectory } from "./FormEditDirectory";
import { useDirectory } from "../DirectoryProvider";
import { useRouter } from "next/navigation";

const ModalEditDirectory = () => {
  const { openEdit, setOpenEdit, directory } = useDirectory();
  const router = useRouter();

  if (!directory) return null;

  return (
    <Dialog open={openEdit} onOpenChange={setOpenEdit}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit repertoire</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormEditDirectory
          directory={directory}
          onSuccess={() => {
            setOpenEdit(false);
            router.refresh(); // Fermer le dialogue après un ajout réussi
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ModalEditDirectory;
