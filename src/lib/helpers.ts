import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type ISomeType = { [key: string]: unknown };
type mapValueOptionType = {
  exec?: boolean;
};
export function mapValue(
  value: keyof ISomeType,
  map: ISomeType,
  options: mapValueOptionType = {}
) {
  options.exec = options.hasOwnProperty("exec") ? options.exec : true;

  const ret = map[value] || false;

  if (ret === false) return ret;

  if (typeof ret === "function") return options.exec ? ret(value) : ret;

  return ret;
}

const dbgStyles = (dbgColor: string) =>
  `background-color: ${dbgColor}; color: #fff; padding: 1px 3px; border-radius: 5px;`;

export const dbg = {
  error: function (props) {
    console.log("%cerror", dbgStyles("#f00"), props);
  },
  success: function (props) {
    console.log("%csuccess", dbgStyles("#0a0"), props);
  },
  warn: function (props) {
    console.log("%cwarn", dbgStyles("#f60"), props);
  },
  info: function (props) {
    console.log("%cinfo", dbgStyles("#0288d1"), props);
  },
  debug: function (props) {
    console.log("%cdebug", dbgStyles("#9100bf"), props);
  },
};

export async function checkAuth() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }
}

export async function saltAndHashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export function isDev() {
  return process.env.NODE_ENV === "development";
}

export function formatSAN(san: string): string {
  return san
    .replace("N", "♞")
    .replace("K", "♚")
    .replace("Q", "♛")
    .replace("R", "♜")
    .replace("B", "♝");
}
