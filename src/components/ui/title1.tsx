import clsx from "clsx";

const Title1 = ({ children, className, ...props }) => {
  return (
    <h1 className={clsx("text-3xl", className)} {...props}>
      {children}
    </h1>
  );
};

export default Title1;
