import { useActionState } from "react";
import { useAuth } from "../../Contexts/useAuth";
import LoadingBar from "react-top-loading-bar";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [, action, pending] = useActionState(submitLogin, null);

  const navigate = useNavigate();

  const { login, error, progress } = useAuth();

  async function submitLogin(preData, formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    await login({ email, password });
    setTimeout(() => {
      navigate("/");
    }, 100);
  }
  return (
    <>
      <LoadingBar color="#8b5cf6" progress={progress} />
      <section className="px-5 my-5 max-w-[400px] w-[95%] mx-auto shadow font-poppins">
        <form action={action}>
          {/* Heading */}
          <div className="pt-3">
            <h1 className="text-4xl font-medium font-mono">Login</h1>
          </div>

          {/* email field */}
          <div className="my-5 flex flex-col gap-2">
            <label htmlFor="email">Enter You Email :- </label>
            <input
              type="email"
              name="email"
              id="email"
              className="outline px-4 py-2 rounded"
              placeholder="Enter you email"
            />
          </div>

          {/* passowrd field */}
          <div className="my-5 flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="outline px-4 py-2 rounded"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="bg-red-600 text-white rounded-xl px-5 py-2">
              {error}
            </div>
          )}

          {/* button */}
          <div className="mt-5 mb-3 text-center">
            <button
              type="submit"
              disabled={pending}
              className="px-4 py-2 w-full bg-purple-800 text-white  font-medium rounded cursor-pointer transition-all duration-200 ease-in hover:bg-purple-900"
            >
              {pending ? "Loading..." : "Login"}
            </button>
          </div>

          <p className=" text-center ">Or</p>

          <div className="my-3 pb-2 text-center">
            <button className="px-4 py-2 w-full bg-purple-800 text-white font-medium rounded cursor-pointer transition-all duration-200 ease-in hover:bg-purple-900">
              Login via Google
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
