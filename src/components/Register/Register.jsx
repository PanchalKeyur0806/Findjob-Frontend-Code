import axios from "axios";
import React, { useActionState, useState } from "react";
import usePostData from "../../Hooks/FetchDataHook";
import { useNavigate, useOutletContext } from "react-router-dom";

const InputFields = ({ labelName, fieldName, fieldType, fieldId }) => {
  return (
    <div className="mt-5 flex flex-col gap-2">
      <label htmlFor={labelName} className="font-medium">
        {labelName}
      </label>
      <input
        type={fieldType}
        name={fieldName}
        id={fieldId}
        placeholder="Enter your value"
        className="w-full md:w-[95%] outline  rounded-md px-4 py-3 bg-white text-black"
      />
    </div>
  );
};

const Register = () => {
  const { setIsAuthenticated } = useOutletContext();
  // navigation hook
  const navigate = useNavigate();

  // others hooks
  const [state, action, pending] = useActionState(submitUser, {
    success: null,
    message: "",
  });
  const [otpopen, setOtpOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpMessage, setOtpMessage] = useState("");

  // custom hook
  const [postData, data, message, error] = usePostData();

  // check that project is in development
  const isDevelopment = import.meta.env.VITE_REACT_ENV === "development";

  // function for otp
  function valueOfOtp(e) {
    setOtp(e.target.value);
  }

  // function for getting email
  function valueOfEmail(e) {
    setEmail(e.target.value);
  }

  // send data to backend
  async function submitUser(preData, formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const phoneNumber = formData.get("phoneNumber");
    const dateOfBirth = formData.get("dateOfBirth");
    const roles = formData.get("roles");

    const url = isDevelopment
      ? "http://localhost:7000/api/auth/register"
      : import.meta.env.VITE_BACKEND_URL + "api/auth/register";

    const responseData = await postData(url, {
      name,
      email,
      password,
      phoneNumber,
      dateOfBirth,
      roles,
    });
    if (!responseData) return;

    if (responseData.status && responseData.status === "success") {
      setOtpOpen(true);
    }
  }

  // handle otp after registering the user
  async function handlingOtp() {
    try {
      setOtpError("");

      const url = isDevelopment
        ? "http://localhost:7000/api/auth/verifyotp"
        : import.meta.env.VITE_BACKEND_URL + "api/auth/verifyotp";

      const otpResponse = await axios.post(
        url,
        { email, otp },
        {
          withCredentials: true,
        }
      );

      setOtpMessage(otpResponse.data.message);
      setIsAuthenticated(true);

      // go to homepage after completion of otp verification
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setOtpMessage("");
      setOtpError(error.response.data.message);
    }
  }

  // handle google login
  async function handleGoogleLogin() {
    const url = `https://findjob-rest-api.onrender.com/api/auth/google`;
    window.open(url, "_self");
  }

  return (
    <main>
      <section
        className={
          otpopen
            ? "hidden"
            : "md:max-w-[800px] w-[95%] mx-auto bg-purple-800 text-white rounded"
        }
      >
        <h1 className="my-5 text-center text-3xl font-bold font-mono">
          Register Here
        </h1>

        <form action={action} className="mt-8 mb-7 px-5 py-5">
          {/* Enter your full name */}
          <div className="grid gap-1 grid-cols-1 sm:grid-cols-2">
            <InputFields
              labelName="name"
              fieldType={"name"}
              fieldId={"name"}
              fieldName={"name"}
            />

            {/* Enter your email address */}
            <InputFields
              labelName="registerEmail"
              fieldType={"email"}
              fieldId={"registerEmail"}
              fieldName={"email"}
            />
          </div>

          {/* Enter your password */}
          <div className="grid gap-1 grid-cols-1 sm:grid-cols-2">
            <InputFields
              labelName={"password"}
              fieldType={"password"}
              fieldName={"password"}
              fieldId={"password"}
            />

            {/* PhoneNumber */}
            <InputFields
              labelName={"phoneNumber"}
              fieldType={"tel"}
              fieldName={"phoneNumber"}
              fieldId={"phoneNumber"}
            />
          </div>

          {/* Date_of_birth */}

          <div className="grid gap-1 grid-cols-1 sm:grid-cols-2">
            <InputFields
              labelName={"dateOfBirth"}
              fieldType={"date"}
              fieldName={"dateOfBirth"}
              fieldId={"dateOfBirth"}
            />

            <div className="mt-5 flex flex-col gap-2">
              <label htmlFor="roles">Enter your role</label>
              <select
                name="roles"
                id="roles"
                className="w-full md:w-[95%] rounded px-4 py-3 bg-white text-black"
                defaultValue={"candidate"}
              >
                <option value="candidate">Candidate</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>
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

          <div className="mt-10 flex flex-col">
            <button
              type="submit"
              className=" px-4 py-3 bg-white text-black rounded cursor-pointer "
              disabled={pending}
            >
              {pending ? "Loading ...." : "Register"}
            </button>
          </div>

          <p className="text-center my-3">Or</p>

          <div>
            <h1
              onClick={handleGoogleLogin}
              className="w-full font-medium text-center bg-white text-black py-3 rounded cursor-pointer"
            >
              Login via Google
            </h1>
          </div>
        </form>
      </section>

      <section
        className={
          otpopen ? "h-[65vh] flex justify-center items-center" : "hidden"
        }
      >
        <div className="max-w-[500px] w-[95%] mx-auto rounded-md shadow">
          <div>
            <h1 className="my-8 mx-15 text-4xl font-medium">Enter Your Otp</h1>
          </div>
          {/* card description */}
          <div className="mx-15">
            {/* email field */}
            <div>
              <label htmlFor="email">Enter Your Email Here :- </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-full sm:w-[70%] px-4 py-2 outline rounded"
                onChange={valueOfEmail}
              />
            </div>

            {/* otp value */}
            <div className="mt-5 flex flex-col gap-3 ">
              <label htmlFor="otp">Enter Your Otp Here :- </label>
              <input
                type="text"
                name="otp"
                id="otp"
                placeholder="Enter your otp"
                className="w-full sm:w-[70%] px-4 py-2 outline rounded"
                onChange={valueOfOtp}
              />
            </div>

            {otpError && (
              <div className="w-full md:w-[70%] bg-red-500 text-white my-4 px-3 py-2 rounded-md text-sm font-medium">
                {otpError}
              </div>
            )}
            {otpMessage && (
              <div className="w-full md:w-[70%] bg-green-500 text-white my-4 px-3 py-2 rounded-md text-sm font-medium">
                {otpMessage}
              </div>
            )}

            {/* submit button */}
            <div className="mt-8 flex gap-5">
              <button
                type="submit"
                onClick={handlingOtp}
                className="mb-3 px-4 py-2 bg-green-800 text-white rounded shadow cursor-pointer transition-all duration-200 ease-in-out hover:bg-green-900"
              >
                Verify Otp
              </button>
              <button
                type="submit"
                className="mb-3 px-4 py-2 bg-red-800 text-white rounded shadow cursor-pointer transition-all duration-200 ease-in-out hover:bg-red-900"
              >
                Resend Otp
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;
