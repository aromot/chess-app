"use client";

import Title1 from "@/components/ui/title1";
import { useIsMobile } from "./useIsMobile";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { URLS } from "@/app/urls";
import ButtonAddDirectory from "../directories/_components/add/ButtonAddDirectory";
import { useSession } from "next-auth/react";
import TestSendEmail from "./_components/TestSendEmail";

const DashboardHeader = () => {
  const isMobile = useIsMobile();
  const session = useSession();
  const isAdmin = session.data?.user?.role === "admin";

  return (
    <div>
      {isMobile ? (
        <div className="fixed top-0 left-0 w-full bg-background p-3">
          <Title1 className="truncate">
            <SidebarTrigger /> Dashboard
          </Title1>

          {isAdmin && (
            <div>
              <Link href={URLS.ui}>UI guidelines</Link>
              <br />
              <TestSendEmail />
            </div>
          )}

          <div className="text-right">
            <ButtonAddDirectory size="sm" />
          </div>
        </div>
      ) : (
        <>
          <Title1 className="truncate">
            <SidebarTrigger /> Dashboard
          </Title1>

          {isAdmin && (
            <div>
              <Link href={URLS.ui}>UI guidelines</Link>
              <br />
              <TestSendEmail />
            </div>
          )}

          <div className="block sm:hidden text-right">
            <ButtonAddDirectory size="sm" />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardHeader;
