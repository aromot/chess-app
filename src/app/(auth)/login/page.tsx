import Title1 from "@/components/ui/title1";
import FormGoogleSignIn from "../_components/SignIn/FormGoogleSignIn";
import AuthIntro from "../_components/SignIn/AuthIntro";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="w-full max-w-md p-6 bg-zinc-700 shadow-lg rounded-lg space-y-5">
        <Title1>Authentification</Title1>
        <AuthIntro />

        <FormGoogleSignIn />
      </div>
    </div>
  );
};

export default LoginPage;
