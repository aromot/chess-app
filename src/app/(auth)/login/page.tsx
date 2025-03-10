import Title1 from "@/components/ui/title1";
import FormSignIn from "../_components/SignIn/FormSignIn";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg space-y-5">
        <Title1>Authentification</Title1>
        <FormSignIn />
      </div>
    </div>
  );
};

export default LoginPage;
