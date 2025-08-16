import React, { useActionState } from "react";
import Cookies from "js-cookie";
import usePostData from "../../Hooks/FetchDataHook";

const Login = () => {
  const [state, action, pending] = useActionState(submitLogin, null);
  const [postData, data, message, error] = usePostData();

  async function submitLogin(preData, formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    console.log(email, password);

    const loginResponse = await postData(
      `https://findjob-rest-api.onrender.com/api/auth/login`,
      { email, password }
    );

    // set the cookie
    Cookies.set("token", loginResponse.token, { expires: 1, path: "/" });
  }
  return (
    <section className="px-5 my-5 max-w-[400px] w-[95%] mx-auto shadow ">
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

        {error && (
          <div className="w-full md:w-[95%] bg-red-500 text-white my-4 px-3 py-2 rounded-md text-sm font-medium">
            {error}
          </div>
        )}
        {message && (
          <div className="w-full md:w-[95%] bg-green-500 text-white my-4 px-3 py-2 rounded-md text-sm font-medium">
            {message}
          </div>
        )}
      </form>
    </section>
  );
};

export default Login;
