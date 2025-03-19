import React from "react";
import { useTraining } from "./TrainingProvider";
import { formatPercentage } from "@/lib/helpers";

const Scores = () => {
  const { stats } = useTraining();
  const total = stats.nbOk + stats.nbKo;

  return (
    <>
      <div className="text-green-600">
        Réponses correctes : {stats.nbOk} / {total} (
        {formatPercentage(stats.nbOk / total, 0)})
      </div>
      <div className="text-red-700">
        Réponses incorrectes : {stats.nbKo} / {total} (
        {formatPercentage(stats.nbKo / total, 0)})
      </div>
    </>
  );
};

export default Scores;
