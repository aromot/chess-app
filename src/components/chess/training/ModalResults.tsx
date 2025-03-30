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
const chartConfig = {
  right: {
    color: "#15803d",
  },
  wrong: {
    color: "#b91c1c",
  },
} satisfies ChartConfig;

const ModalResults = () => {
  const router = useRouter();
  const {
    reset,
    modalResultIsOpen,
    closeModalResult,
    directory,
    stats,
    tree,
    userColor,
    initLines,
  } = useTraining();
  const total = stats.nbOk + stats.nbKo;
  const rightPerc = formatPercentage(stats.nbOk / total, 0);
  const data = [
    { label: "Right moves", nb: stats.nbOk, fill: "var(--color-right)" },
    { label: "Wrong moves", nb: stats.nbKo, fill: "var(--color-wrong)" },
  ];

  const nbRemainingVariations = initLines.filter(
    (line) => !line.trained
  ).length;

  let nbRight = 0,
    nbWrong = 0,
    opponentNbNodeNotTrained = 0,
    userNbVariationNotTrained = 0,
    opponentNbVariationNotTrained = 0;
  tree.traverseBF((node) => {
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
  });

  const progress = Math.round(
    ((initLines.length - nbRemainingVariations) / initLines.length) * 100
  );

  console.log({
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

        <div className="my-3">
          <Progress value={progress} />
        </div>

        <div className="flex mt-5">
          <div className="flex-1">
            <Button
              onClick={() => {
                reset(nbRemainingVariations === 0);
                closeModalResult();
              }}
            >
              Start again
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                router.push(
                  formatUrl(URLS.editDirectory, { id: directory.id })
                );
              }}
            >
              Edit your repertoire
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalResults;
