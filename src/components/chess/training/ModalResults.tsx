"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTraining } from "./TrainingProvider";
import { useRouter } from "next/navigation";
import { formatPercentage, formatUrl } from "@/lib/helpers";
import { URLS } from "@/app/urls";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { Info, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import BtnRestartFromBeginning from "./buttons/BtnRestartFromBeginning";
import BtnEditRepertoire from "./buttons/BtnEditRepertoire";
const chartConfig = {
  right: {
    color: "#15803d",
  },
  wrong: {
    color: "#b91c1c",
  },
} satisfies ChartConfig;

const RepertoireProgress = ({ progress }: { progress: number }) => {
  const { reset, closeModals, nbRemainingVariations } = useTraining();
  const [barProgress, setBarProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBarProgress(progress);
    }, 500);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <>
      <div className="text-center">
        You have revised{" "}
        <span className="font-bold">{formatPercentage(progress / 100, 0)}</span>{" "}
        of your repertoire.
      </div>
      <Progress value={barProgress} />
      {nbRemainingVariations > 0 && (
        <div className="text-center mt-1">
          <Button
            size="lg"
            onClick={() => {
              reset();
              closeModals();
            }}
            className="text-2xl"
          >
            Go ahead!
          </Button>
        </div>
      )}
    </>
  );
};

const ModalResults = () => {
  const {
    modalResultIsOpen,
    stats,
    tree,
    userColor,
    initLines,
    fixMistakes,
    nbRemainingVariations,
  } = useTraining();

  const progress = Math.round(
    ((initLines.length - nbRemainingVariations) / initLines.length) * 100
  );

  const total = stats.nbOk + stats.nbKo;
  const rightPerc = formatPercentage(stats.nbOk / total, 0);
  const data = [
    { label: "Right moves", nb: stats.nbOk, fill: "var(--color-right)" },
    { label: "Wrong moves", nb: stats.nbKo, fill: "var(--color-wrong)" },
  ];

  let nbRight = 0,
    nbWrong = 0,
    opponentNbNodeNotTrained = 0,
    userNbVariationNotTrained = 0,
    opponentNbVariationNotTrained = 0,
    nbMisplayedPositions = 0;

  tree.traverseBF((node) => {
    if (node.hasWrongMoves()) {
      nbMisplayedPositions++;
      console.log(
        "%cWrong moves for position #" +
          node.position.id +
          " / move " +
          node.move.san +
          ": " +
          node.trainingWrongMoves.join(", "),
        "background: #f00"
      );
    }

    // ici c'est le noeud root, on le skip pour les stats (il est tard... j'ai bon ?).
    if (!node.move) {
      return;
    }

    // Si c'est un move de l'utilisateur,
    // on veut juste savoir si on a bon ou pas.
    if (node.move.color === userColor) {
      if (node.isTrainedRight()) {
        nbRight++;
      }
      if (node.isTrainedWrong()) {
        nbWrong++;
      }
      if (!node.isTrained() && node.isVariation()) {
        userNbVariationNotTrained++;
      }
    } else {
      // Si c'est un move de l'adversaire,
      // on veut savoir si on l'a déjà travaillé ou pas.
      if (!node.isTrained()) {
        opponentNbNodeNotTrained++;
        if (node.isVariation()) {
          opponentNbVariationNotTrained++;
        }
      }
    }
  });

  console.log({
    nbRight,
    nbWrong,
    opponentNbNodeNotTrained,
    userNbVariationNotTrained,
    opponentNbVariationNotTrained,
    progress,
    nbRemainingVariations,
    initLines_length: initLines.length,
  });

  return (
    <Dialog open={modalResultIsOpen}>
      <DialogContent hideCloseButton={true}>
        <DialogHeader>
          <DialogTitle>Variation completed!</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>You completed the variation.</div>
        <div>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={data}
                dataKey="nb"
                nameKey="label"
                innerRadius={80}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-5xl font-bold"
                          >
                            {rightPerc}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 35}
                            className="fill-muted-foreground"
                          >
                            right moves
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
        {nbRemainingVariations > 0 ? (
          <div className="mt-5">
            {nbRemainingVariations === 1 ? (
              <>There are still 1 remaining variation not trained.</>
            ) : (
              <>
                There are still {nbRemainingVariations} remaining variations not
                trained.
              </>
            )}
          </div>
        ) : (
          <div className="mt-5">Your completed your repertoire.</div>
        )}

        {nbMisplayedPositions === 0 ? (
          <div className="text-green-700 flex gap-3 items-center bg-green-100 p-3 rounded-lg">
            <ThumbsUp className="h-4 w-4" />
            <div>No misplayed position</div>
          </div>
        ) : (
          <div className="text-orange-700 flex gap-3 items-center bg-orange-100 p-3 rounded-lg">
            <Info className="h-4 w-4" />
            <div className="flex w-full items-center">
              <div className="flex-1">
                Misplayed positions = {nbMisplayedPositions}
              </div>
              <Button
                onClick={() => {
                  fixMistakes();
                }}
              >
                Fix your mistakes
              </Button>
            </div>
          </div>
        )}

        <div className="my-3">
          <RepertoireProgress progress={progress} />
        </div>

        <div className="flex mt-5">
          <div className="flex-1">
            <BtnRestartFromBeginning />
          </div>
          <div>
            <BtnEditRepertoire />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalResults;
