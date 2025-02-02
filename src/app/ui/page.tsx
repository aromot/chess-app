import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Title1 from "@/components/ui/title1";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";

const UiPage = () => {
  return (
    <div className="space-y-3 p-5">
      <div>
        <Title1>Titre 1</Title1>
      </div>
      <div>
        <Button>Click me</Button>
      </div>
      <div>
        <Alert variant={"destructive"}>
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>Attention, derrière toi !</AlertTitle>
          <AlertDescription>Voici une alerte</AlertDescription>
        </Alert>
      </div>
      <div>
        <Link href="/">accueil</Link>
      </div>
    </div>
  );
};

export default UiPage;
