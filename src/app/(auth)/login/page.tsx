import Title1 from "@/components/ui/title1";
import FormCredentialsSignIn from "../_components/SignIn/FormCredentialsSignIn";
import FormGoogleSignIn from "../_components/SignIn/FormGoogleSignIn";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="w-full max-w-md p-6 bg-zinc-700 shadow-lg rounded-lg space-y-5">
        <Title1>Authentification</Title1>
        <FormCredentialsSignIn />
        <FormGoogleSignIn />
      </div>
    </div>
  );
};

export default LoginPage;
