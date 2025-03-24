"use client";

import * as React from "react";
import { NavUser } from "@/components/app/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormChangePassword } from "@/app/(auth)/_components/ChangePassword/FormChangePassword";
import { useRouter } from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open: sidebarOpen } = useSidebar();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <div className="flex gap-2 items-center">
            <Image
              src="/logo-outline.svg"
              width={32}
              height={40}
              alt="logo"
              style={{ height: "auto" }}
            />
            {sidebarOpen && (
              <span className="text-2xl font-bold truncate">Chess App</span>
            )}
          </div>
        </SidebarHeader>
        <SidebarContent></SidebarContent>
        <SidebarFooter style={{ pointerEvents: "all" }}>
          <NavUser
            onClickChangePassword={() => {
              document.body.style.removeProperty("pointer-events");
              setOpen(true);
            }}
          />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le mot de passe</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <FormChangePassword
            onSuccess={() => {
              setOpen(false);
              router.refresh(); // Fermer le dialogue après un ajout réussi
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
