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

  return session;
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

type ContextObject = {
  [key: string]: string | number;
};

export function formatUrl(path: string, context: ContextObject) {
  if (Object.keys(context).length === 0) return path;

  for (const k in context)
    path = path.replace(new RegExp(":" + k + "\\??"), context[k].toString());

  return path;
}

export function getRandomItemFromArray<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function arraysAreEqual(arr1: unknown[], arr2: unknown[]) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

export function formatPercentage(perc: number, precision: number = 2) {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: precision,
    minimumFractionDigits: precision,
  }).format(perc);
}

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min); // Round up the min value
  max = Math.floor(max); // Round down the max value
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function createStarExplosion(elt: HTMLElement) {
  const numberOfStars = 15; // Number of stars in the explosion
  const buttonRect = elt.getBoundingClientRect(); // Get button position: ;

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    // const xOffset = Math.random() * 400 - 200; // Random X offset
    // const yOffset = Math.random() * 400 - 200; // Random Y offset
    const xOffset = Math.random() * 130 - 65;
    const yOffset = Math.random() * 130 - 65;
    star.style.setProperty("--x", `${xOffset}px`);
    star.style.setProperty("--y", `${yOffset}px`);

    // SVG star shape
    star.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 17.4l5.6 3.3-1.5-6.2 4.8-4.3-6.3-.5L12 2l-2 6.7-6.3.5 4.8 4.3-1.5 6.2L12 17.4z"/>
      </svg>
    `;

    // Position the star at the button's center
    star.style.left = `${buttonRect.left + buttonRect.width / 2 - 10}px`;
    star.style.top = `${buttonRect.top + buttonRect.height / 2 - 10}px`;

    document.body.appendChild(star);

    // Remove the star after animation
    setTimeout(() => {
      star.remove();
    }, 1500);
  }
}

export function classExistsInCSS(className: string) {
  const stylesheets = document.styleSheets;

  for (let i = 0; i < stylesheets.length; i++) {
    const rules = stylesheets[i].cssRules || stylesheets[i].rules;

    for (let j = 0; j < rules.length; j++) {
      if (rules[j].selectorText === `.${className}`) {
        return true;
      }
    }
  }

  return false;
}

export type BreakpointType = "2xl" | "xl" | "lg" | "md" | "sm" | "xs";
export function getCurrentBreakpoint(): BreakpointType {
  const width = window.innerWidth;

  if (width >= 1536) {
    return "2xl";
  } else if (width >= 1280) {
    return "xl";
  } else if (width >= 1024) {
    return "lg";
  } else if (width >= 768) {
    return "md";
  } else if (width >= 640) {
    return "sm";
  }
  return "xs"; // Or any value for extra small screens
}
