"use client";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuCheckboxes } from "./DropdownMenuCheckboxes";
import React from "react";
import { FormExample } from "./FormExample";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { auth } from "@/auth";

const ItemWrapper = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="mb-9">
      {title && <Title1>{title}</Title1>}
      {children}
    </div>
  );
};

const Titles = () => (
  <ItemWrapper title="Titre 1">
    <Title2>Titre 2</Title2>
  </ItemWrapper>
);

const Buttons = () => (
  <ItemWrapper title="Boutons">
    <div className="flex gap-5">
      {["default", "secondary", "outline", "destructive", "ghost", "link"].map(
        (type) => (
          <Button key={type} variant={type}>
            {type}
          </Button>
        )
      )}
    </div>
  </ItemWrapper>
);

const Alerts = () => (
  <ItemWrapper title="Alerts">
    <Alert variant={"destructive"}>
      <TriangleAlert className="h-4 w-4" />
      <AlertTitle>Attention, derrière toi !</AlertTitle>
      <AlertDescription>Voici une alerte</AlertDescription>
    </Alert>
  </ItemWrapper>
);

const AccordionDemo = () => (
  <ItemWrapper title="Accordion">
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
  </ItemWrapper>
);

const DataTableDemo = () => (
  <ItemWrapper title="DataTable">
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
  </ItemWrapper>
);

const DialogDemo = () => (
  <ItemWrapper title="Dialog (Modal)">
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
  </ItemWrapper>
);

const DropdownMenuDemo = () => (
  <ItemWrapper title="Dropdown Menu">
    <DropdownMenuCheckboxes />
  </ItemWrapper>
);

const FormDemo = () => (
  <ItemWrapper title="Formulaire (Form, Label, Input et Textarea)">
    <FormExample />
  </ItemWrapper>
);

const PaginationDemo = () => (
  <ItemWrapper title="Pagination">
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  </ItemWrapper>
);

const SelectDemo = () => (
  <ItemWrapper title="Select">
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  </ItemWrapper>
);

const SkeletonDemo = () => (
  <ItemWrapper title="Skeleton">
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  </ItemWrapper>
);

const SonnerDemo = () => {
  return (
    <ItemWrapper title="Sonner / Toast">
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Show Toast
      </Button>
    </ItemWrapper>
  );
};

const TableDemo = () => (
  <ItemWrapper title="Table">
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Cash</TableCell>
          <TableCell className="text-right">$75.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </ItemWrapper>
);

const TooltipDemo = () => (
  <ItemWrapper title="Tooltip">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>Hover</TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </ItemWrapper>
);

const UI = () => {
  return (
    <>
      <Titles />
      <Buttons />
      <Alerts />
      <div className="max-w-xs">
        <AccordionDemo />
      </div>
      <DataTableDemo />
      <DialogDemo />
      <DropdownMenuDemo />
      <FormDemo />
      <PaginationDemo />
      <SelectDemo />
      <SkeletonDemo />
      <SonnerDemo />
      <TableDemo />
      <TooltipDemo />

      <Toaster />
    </>
  );
};

export default UI;
