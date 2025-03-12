import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = Readonly<{
  label: string;
  children: unknown;
}>;

export function DebugModal({ label, children }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">{label}</Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <pre
            style={{ fontSize: 12 }}
            className="bg-gray-200 text-teal-950 rounded-md p-2"
          >
            {JSON.stringify(children, null, 2)}
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  );
}
