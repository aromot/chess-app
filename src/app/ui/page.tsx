import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Title1 from "@/components/ui/title1";
import Title2 from "@/components/ui/title2";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const UiPage = () => {
  return (
    <div className="space-y-3 p-5">
      <div>
        <Title1>Titre 1</Title1>
        <Title2>Titre 2</Title2>
      </div>
      <div>
        <Title1>Boutons</Title1>
        <Button>Click me</Button>
      </div>
      <div>
        <Title1>Alerts</Title1>
        <Alert variant={"destructive"}>
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>Attention, derrière toi !</AlertTitle>
          <AlertDescription>Voici une alerte</AlertDescription>
        </Alert>
      </div>
      <div className="max-w-xs">
        <Title1>Accordion</Title1>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Mes répertoires</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>Répertoire blancs e4</li>
                <li>Répertoire blancs d4</li>
                <li>Répertoire noirs e4-e5</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <Title1>DataTable</Title1>
        <DataTable
          columns={[
            {
              accessorKey: "id",
              header: "Id",
            },
            {
              accessorKey: "name",
              header: "Désignation",
            },
            {
              accessorKey: "price",
              header: "Prix",
            },
          ]}
          data={[
            { id: 1, name: "Ballon de plage", price: 10 },
            { id: 2, name: "Raquette de ping-pong", price: 150 },
            { id: 3, name: "Lot de 5 balles de tennis", price: 50 },
            { id: 4, name: "Serviette de plage", price: 120 },
          ]}
        />
      </div>

      <div>
        <Title1>Dialog (Modale)</Title1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open dialog</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Titre de la modale</DialogTitle>
              <DialogDescription>Ici une description</DialogDescription>
            </DialogHeader>
            <div>Ici le contenu</div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <Link href="/">&laquo; accueil</Link>
      </div>
    </div>
  );
};

export default UiPage;
