import { DemoStatus, useChessboardDemo } from "./ChessboardDemoProvider";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva("p-3 rounded-lg lg:text-2xl", {
  variants: {
    variant: {
      default: "bg-zinc-700",
      error: "bg-red-800",
      success: "bg-green-800",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface PaperProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

const Paper = ({ variant, children }: PaperProps) => {
  return <div className={cn(buttonVariants({ variant }))}>{children}</div>;
};

const MessageInfo = () => {
  const { status, node } = useChessboardDemo();

  if (status === DemoStatus.idle) {
    return <Paper>Let's train your openings!</Paper>;
  }

  if (status === DemoStatus.user_played) {
    return <Paper>Checking your move...</Paper>;
  }

  if (status === DemoStatus.user_check_success) {
    return <Paper variant="success">👍 It's the right move!</Paper>;
  }

  if (
    status === DemoStatus.user_check_error ||
    status === DemoStatus.user_try_again
  ) {
    return (
      <Paper variant="error">⚠️ This move is not in your repertoire!</Paper>
    );
  }

  if (
    status === DemoStatus.opponent_played ||
    status === DemoStatus.opponent_check_done
  ) {
    return <Paper>Your opponent plays {node.move?.san}.</Paper>;
  }

  if (status === DemoStatus.end_of_variation) {
    return <Paper>End of the variation, try another one?</Paper>;
  }
};

export default MessageInfo;
