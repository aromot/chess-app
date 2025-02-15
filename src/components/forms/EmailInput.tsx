import FormInput from "./FormInput";

type Props = {
  label: string;
  name: string;
  placeholder: string;
};

const EmailInput = (props: Props) => {
  return <FormInput type="email" {...props} />;
};

export default EmailInput;
