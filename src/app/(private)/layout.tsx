"use server";

import { headers } from "next/headers";
import { userAgent } from "next/server";
import { AppSidebar } from "@/components/app/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import LayoutClient from "./layoutClient";

const PrivateLayout = async ({ children }: { children: React.ReactNode }) => {
  const reqUserAgent = userAgent({
    headers: await headers(),
  });
  // console.log({ reqUserAgent });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <LayoutClient reqUserAgent={reqUserAgent}>{children}</LayoutClient>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default PrivateLayout;
