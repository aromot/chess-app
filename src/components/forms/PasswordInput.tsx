import FormInput from "./FormInput";

type Props = {
  label: string;
  name: string;
  placeholder: string;
};

const PasswordInput = (props: Props) => {
  return <FormInput type="password" {...props} />;
};

export default PasswordInput;
