import { FieldValues } from "react-hook-form";
import { Form } from "../ui/form";

const AppForm = ({ children, form, onSubmit, ...props }: FieldValues) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </Form>
  );
};

export default AppForm;
