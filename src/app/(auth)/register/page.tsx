import Title1 from "@/components/ui/title1";
import FormSignUp from "../_components/SignUp/FormSignUp";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg space-y-5">
        <Title1>Inscription</Title1>
        <FormSignUp />
      </div>
    </div>
  );
};

export default RegisterPage;
