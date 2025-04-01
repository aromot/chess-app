"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTraining } from "./TrainingProvider";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { formatUrl } from "@/lib/helpers";
import { URLS } from "@/app/urls";
import BtnRestartFromBeginning from "./buttons/BtnRestartFromBeginning";
import BtnEditRepertoire from "./buttons/BtnEditRepertoire";

const BtnBackToTraining = () => {
  const { backToTraining } = useTraining();

  return (
    <Button onClick={backToTraining}>
      <ArrowLeft /> Back to your training
    </Button>
  );
};

const ModalFixResult = () => {
  const {
    tree,
    modalFixResultIsOpen,
    backToTraining,
    fixNextMistake,
    nbRemainingVariations,
    directory,
  } = useTraining();

  let nbMisplayedPositions = 0;

  tree.traverseBF((node) => {
    if (node.hasWrongMoves()) {
      nbMisplayedPositions++;
    }
  });

  // [fix next mistake] + [back to training]
  // [back to training]
  // [restart from the beginning] + [edit your repertoire]

  return (
    <Dialog open={modalFixResultIsOpen}>
      <DialogContent hideCloseButton={true}>
        <DialogHeader>
          <DialogTitle>You are correct!</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="text-3xl mb-3">🎉 You are correct!</div>

        {nbMisplayedPositions > 0 && (
          <div className="flex">
            <div className="flex-1">
              <Button onClick={fixNextMistake}>
                Fix next mistake ({nbMisplayedPositions})...
              </Button>
            </div>
            <div>
              {nbRemainingVariations === 0 ? (
                <BtnRestartFromBeginning />
              ) : (
                <BtnBackToTraining />
              )}
            </div>
          </div>
        )}

        {nbMisplayedPositions === 0 && nbRemainingVariations > 0 && (
          <div>
            <BtnBackToTraining />
          </div>
        )}

        {nbRemainingVariations === 0 && (
          <div className="flex mt-5">
            <div className="flex-1">
              <BtnRestartFromBeginning />
            </div>
            <div>
              <BtnEditRepertoire />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalFixResult;
