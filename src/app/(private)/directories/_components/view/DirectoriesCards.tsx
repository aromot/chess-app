import {
  ComponentProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDirectory } from "../DirectoryProvider";
import MessageEmpty from "./MessageEmpty";
import { cn } from "@/lib/utils";
import { formatUrl } from "@/lib/helpers";
import { URLS } from "@/app/urls";
import { formatDateTime } from "@/lib/i18n";
import Link from "next/link";
import ButtonEditDirectory from "../edit/ButtonEditDirectory";
import ButtonTrain from "../train/ButtonTrain";
import ButtonDeleteDirectory from "../delete/ButtonDeleteDirectory";
import ButtonAddDirectory from "../add/ButtonAddDirectory";
import { Directory } from "../../../../../../prisma/generated/client";

const DirCard = ({ className, children, ...props }: ComponentProps<"div">) => {
  return (
    <div className={cn("bg-zinc-700 p-3 rounded-md", className)} {...props}>
      {children}
    </div>
  );
};

const PAGE_SIZE = 10;

const DirectoriesCards = () => {
  const { directories } = useDirectory();
  const [page, setPage] = useState(0);
  const [items, setItems] = useState<Directory[]>([]);
  const [initiated, setInitiated] = useState<boolean>(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(() => {
    const newItems = directories.data.slice(
      page * PAGE_SIZE,
      (page + 1) * PAGE_SIZE
    );
    setItems((prev) => prev.concat(newItems));
  }, [page, directories.data]);

  useEffect(() => {
    loadMore();
    if (!initiated) {
      setInitiated(true);
    }
  }, [page, loadMore]); // SURTOUT NE PAS ajouter initiated en dépendance sinon on charge en double au début (erreur de conception ?).

  // Set up IntersectionObserver
  useEffect(() => {
    if (!initiated) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [initiated]);

  if (!initiated) {
    return (
      <div className="mt-28">
        <DirCard>
          <div className="my-8 text-center text-3xl">LOADING...</div>
        </DirCard>
      </div>
    );
  }

  if (items.length === 0 && loaderRef?.current) {
    return (
      <div className="mt-28">
        <DirCard>
          <div className="my-8 text-center">
            <MessageEmpty />
          </div>
        </DirCard>
      </div>
    );
  }

  return (
    <div className="mt-28 space-y-2">
      {items.map((directory, i) => {
        return (
          <DirCard key={i}>
            <div className="text-2xl truncate">
              <Link
                className="underline"
                href={formatUrl(URLS.editDirectory, { id: directory.id })}
              >
                {directory.name}
              </Link>
            </div>
            <div className="text-sm flex">
              <div className="flex-1">
                {directory.white ? "white" : "black"}
              </div>
              <div>added on {formatDateTime(directory.createdAt)}</div>
            </div>
            <div className="flex mt-3">
              <div className="flex-1 flex gap-10">
                <ButtonEditDirectory variant="default" directory={directory} />
                <ButtonTrain variant="default" directory={directory} />
              </div>
              <ButtonDeleteDirectory directory={directory} />
            </div>
          </DirCard>
        );
      })}
      <div className="text-center py-5">
        <ButtonAddDirectory />
      </div>

      <div
        ref={loaderRef}
        className={cn(
          "h-10 flex items-center w-full justify-center text-center",
          items.length === directories.data.length && "hidden"
        )}
      >
        Loading more...
      </div>
    </div>
  );
};

export default DirectoriesCards;
