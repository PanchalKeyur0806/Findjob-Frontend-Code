import React, { useActionState } from "react";
import usePostData from "../../Hooks/FetchDataHook";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const [state, action, pending] = useActionState(submitUser, {
    success: null,
    message: "",
  });
  const [postData, data, message, error] = usePostData();
  const navigate = useNavigate();

  // send data to backend
  async function submitUser(preData, formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const phoneNumber = formData.get("phoneNumber");
    const dateOfBirth = formData.get("dateOfBirth");
    const roles = formData.get("roles");

    const responseData = await postData(
      `http://localhost:7000/api/auth/register`,
      {
        name,
        email,
        password,
        phoneNumber,
        dateOfBirth,
        roles,
      }
    );
    if (!responseData) return;

    setTimeout(() => {
      navigate("/");
    }, 3000);
  }

  // handle google login
  async function handleGoogleLogin() {
    const url = `https://findjob-rest-api.onrender.com/api/auth/google`;
    window.open(url, "_self");
  }

  return (
    <main>
      <section className="md:max-w-[800px] w-[95%] mx-auto bg-purple-800 text-white rounded">
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
              labelName="email"
              fieldType={"email"}
              fieldId={"email"}
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
    </main>
  );
};

export default Register;
