import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { User } from "../types/types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { createUserAsync } from "../authSlice";

let counter = 0;

const Register = () => {
  const dispatchUser = useAppDispatch();
  const navigate = useNavigate();
  const { error, loggedinUser } = useAppSelector((state) => state.users);
  console.log({ error, loggedinUser });

  const form = useForm<User>();

  const { register, handleSubmit, formState } = form;

  const { errors, isSubmitting } = formState;
  console.log(errors);

  const onSubmit = (data: User) => {
    console.log(data);
    dispatchUser(
      createUserAsync({ email: data.email, password: data.password })
    );
  };
  if (loggedinUser) {
    console.log(loggedinUser);
    navigate("/", { replace: true });
  }

  if (error) {
    console.log("error--->", error);
  }

  return (
    <>
      <h1>Counter - {counter++}</h1>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "email is required !",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                    validate: {
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      uniqEmail: async (values, _formValues) => {
                        const response = await fetch(
                          "http://localhost:5000/users"
                        );
                        const users =
                          (await response.json()) as unknown as User[];
                        const user = users.find((user) => {
                          return user.email === values;
                        });

                        if (user) {
                          return "user allready exists";
                        } else {
                          return true;
                        }
                      },
                    },
                  })}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <h1 className="text-sm font-semibold text-error">
                {" "}
                {errors?.email ? errors.email.message : null}{" "}
              </h1>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "password is required !",
                    },
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                      message: "password is not valid",
                    },
                  })}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <h1 className="text-sm font-semibold text-error">
                {" "}
                {errors?.password ? errors.password.message : null}{" "}
              </h1>
            </div>
            <div>
              <div className="flex items-center -mt-4 justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="confirm_password"
                  {...register("confirm_password", {
                    required: {
                      value: true,
                      message: "This field is required!",
                    },
                    validate: {
                      notMatched: (values, formValues) => {
                        return values !== formValues.password
                          ? "password not matched"
                          : true;
                      },
                    },
                  })}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <h1 className="text-sm font-semibold text-error">
                {" "}
                {errors?.confirm_password
                  ? errors.confirm_password.message
                  : null}{" "}
              </h1>
            </div>

            <div>
              <button
                disabled={isSubmitting}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Allready have an account
            <NavLink
              to={"/auth/login"}
              className="font-semibold leading-6 ml-2 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
