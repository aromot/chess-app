import clsx from "clsx";
import { useTraining } from "./TrainingProvider";
import { createStarExplosion, formatPercentage } from "@/lib/helpers";
import { useEffect } from "react";

type CardProps = {
  id: string;
  type: "right" | "wrong";
  title: string;
  value: number;
};

const Card = ({ id, type, title, value }: CardProps) => {
  const { stats } = useTraining();
  const total = stats.nbOk + stats.nbKo;

  return (
    <div
      id={id}
      className={clsx(
        total === 0 && "opacity-50",
        type === "right" ? "bg-green-700" : "bg-red-700",
        "p-5",
        "rounded-lg",
        "relative"
      )}
    >
      <div className="text-3xl">{title}</div>
      <div className="flex justify-center mt-2">
        <div>
          <span className="text-6xl">{value}</span>
          <span className="text-2xl"> / {total}</span>
        </div>
      </div>
      {total > 0 && (
        <div className="text-center text-sm mt-3">
          {formatPercentage(value / total, 0)}
        </div>
      )}
    </div>
  );
};

const Scores = () => {
  const { stats, isTrainerAnswers, trainerAnswer, trainingState } =
    useTraining();

  useEffect(() => {
    if (isTrainerAnswers && trainerAnswer) {
      const card = document.getElementById("card-right");
      if (card) {
        createStarExplosion(card);
      }
    }

    if (isTrainerAnswers && !trainerAnswer) {
      const card = document.getElementById("card-wrong");
      if (card) {
        card.classList.add("shakeX");
        window.setTimeout(() => {
          card.classList.remove("shakeX");
        }, 500);
      }
    }
  }, [trainerAnswer, isTrainerAnswers, trainingState, stats]);

  return (
    <div className="flex gap-10">
      <Card
        id="card-right"
        type="right"
        title="Correct moves"
        value={stats.nbOk}
      />
      <Card
        id="card-wrong"
        type="wrong"
        title="Wrong moves"
        value={stats.nbKo}
      />
    </div>
  );
};

export default Scores;
