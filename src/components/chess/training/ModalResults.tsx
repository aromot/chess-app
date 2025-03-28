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
  const { reset, modalResultIsOpen, closeModalResult, directory, stats, tree } =
    useTraining();
  const total = stats.nbOk + stats.nbKo;
  const rightPerc = formatPercentage(stats.nbOk / total, 0);
  const data = [
    { label: "Right moves", nb: stats.nbOk, fill: "var(--color-right)" },
    { label: "Wrong moves", nb: stats.nbKo, fill: "var(--color-wrong)" },
  ];

  let nbRight = 0,
    nbWrong = 0,
    nbNodeNotTrained = 0,
    nbVariantNotTrained = 0;
  tree.traverseBF((node) => {
    if (node.trainingResult === undefined) {
      nbNodeNotTrained++;
      if (node.isVariation()) {
        nbVariantNotTrained++;
      }
    }
    if (node.isTrainedRight()) {
      nbRight++;
    }
    if (node.isTrainedWrong()) {
      nbWrong++;
    }
  });

  console.log({ nbRight, nbWrong, nbNodeNotTrained, nbVariantNotTrained });

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
        {nbVariantNotTrained > 0 && (
          <div className="mt-5">
            {nbVariantNotTrained === 1 ? (
              <>There are still 1 remaining variation not trained.</>
            ) : (
              <>
                There are still {nbVariantNotTrained} remaining variations not
                trained.
              </>
            )}
          </div>
        )}
        <div className="flex mt-5">
          <div className="flex-1">
            <Button
              onClick={() => {
                reset();
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
