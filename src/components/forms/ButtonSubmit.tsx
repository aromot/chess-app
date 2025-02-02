import { useFormContext } from "react-hook-form";
import { Button, ButtonProps } from "../ui/button";
import Spinner from "../loaders/Spinner";

interface ButtonSubmitProps extends ButtonProps {
  loadingText?: string;
}

const ButtonSubmit = ({
  children,
  loadingText = "Chargement en cours...",
  ...props
}: ButtonSubmitProps) => {
  const { formState } = useFormContext();

  return (
    <Button type="submit" disabled={formState.isSubmitting} {...props}>
      {formState.isSubmitting ? (
        <>
          <Spinner size="sm" />
          {loadingText}
          {/* <CircularProgress
        size={24}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: '-12px',
          marginLeft: '-12px',
        }}
      /> */}
        </>
      ) : (
        <>{children}</>
      )}
    </Button>
  );
};

export default ButtonSubmit;
