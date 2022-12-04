import LoginForm from "./LoginForm";
import { useRouter } from "next/navigation";

type signinProps = {};

const Signin = ({}: signinProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[100vh]">
      <p
        style={{
          fontWeight: "bold",
          fontSize: "18px",
          marginBottom: "30px",
        }}
      >
        SpMath 로그인
      </p>
      <div className="h-[400px] w-[300px] text-left">
        <LoginForm />
      </div>

      <div className="pt-5 absolute bottom-5 w-full border-t border-t-slate-200 text-center">
        © soreply ~ 2022
      </div>
    </div>
  );
};

export default Signin;
