"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import Link from "next/link";
import HomepageTitle from "./HomepageTitle";
import { URLS } from "../urls";
import { useMounted } from "@/hooks/use-mounted";
import { getCurrentBreakpoint } from "@/lib/helpers";

// https://medium.com/@eric.burel/how-to-get-rid-of-window-is-not-defined-and-hydration-mismatch-errors-in-next-js-567cc51b4a17
const HomepageContents = () => {
  const mounted = useMounted();
  if (!mounted) return null;

  const breakpoint = getCurrentBreakpoint();
  const bps: { [key: string]: ButtonProps["size"] } = {
    "2xl": "xl",
    xl: "xl",
    lg: "lg",
    md: "lg",
    sm: "lg",
    xs: "lg",
  };
  const btnSize: ButtonProps["size"] = bps[breakpoint];

  return (
    <div className="flex-1 text-white flex flex-col">
      <div className="md:pt-3">
        <div className="hidden md:block">
          <HomepageTitle />
        </div>

        <div className="md:mt-10 xl:mt-20 mb-10 xl:mb-16 pl-4 md:pl-0 pr-4 lg:pr-0 md:text-2xl text-justify">
          <div className="mb-10">
            Build your own chess repertoire...
            <br />
            Billie Chess proposes a{" "}
            <span className="underline underline-offset-8">
              personnalized interactive training!
            </span>
          </div>
          <div>
            Whether you're a beginner or advanced player, this app turns opening
            theory into a powerful tool for success on the board.
          </div>
        </div>

        <div className="flex mb-8 md:mb-0">
          <div className="flex-1 text-center">
            <Button asChild size={btnSize} className="text-2xl lg:text-3xl">
              <Link href={URLS.login}>Sign in</Link>
            </Button>
          </div>
          {/* <div className="flex-1 text-center">
            <Button asChild size={btnSize} className="text-2xl lg:text-3xl">
              <Link href={URLS.register}>Sign up</Link>
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HomepageContents;
