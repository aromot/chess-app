import clsx from "clsx";

const Title2 = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={clsx("text-2xl", className)} {...props}>
      {children}
    </h2>
  );
};

export default Title2;
