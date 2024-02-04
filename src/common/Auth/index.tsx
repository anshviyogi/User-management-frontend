import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiCaller from "../../helper/axiosCaller";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../app/authSlice";
import { useEffect } from "react";

interface MyValues {
  password: String;
  email: String;
}

let schema = yup.object<MyValues>().shape({
  email: yup.string().required("This field is required"),
  password: yup.string().required("This field is required"),
});

let registerSchema = yup.object<MyValues>().shape({
  firstName: yup.string().required("This field is required"),
  lastName: yup.string().required("This field is required"),
  email: yup.string().required("This field is required"),
  password: yup
    .string()
    .required("This field is required")
    .min(5, "Cannot be less than 5 characters")
    .max(15, "Cannot be more than 15 characters"),
});

type Props = {
  type: String;
};

function Authenticate({ type }: Props): JSX.Element {
  const history = useNavigate();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  async function createUser(data: MyValues) {
    try {
      await apiCaller.post("/register", data).then((response: any) => {
        if (response.data.success) {
          toast.success(response.data.message);
          history("/");
        } else {
          toast.warn(response.data.message)
        }
      });
    } catch (error: any) {
      return toast.warn(error.message);
    }
  }

  async function login(data: MyValues) {
    try {
      await apiCaller.post("/login", data).then((response: any) => {
        if (response.data.success) {
          localStorage.setItem("token", response.data.token)
          dispatch(setUserDetails({
            email: data.email,
            token: response.data.token,
            username: response.data.username
          }))
          
          history("/dashboard")
          return toast.success(response.data.message)
        } else {
          return toast.warn(response.data.message)
        }
      });
    } catch (error: any) {
      return toast.warn(error.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen backgroundImageHome">
      {/*Login box*/}
      <Formik
        validationSchema={type === "register" ? registerSchema : schema}
        initialValues={{
          password: "",
          email: "",
          firstName: "",
          lastName: "",
        }}
        onSubmit={(data, { resetForm }) => {
          if (type === "register") {
            createUser(data);
          } else {
            login(data);
          }
          resetForm();
        }}
      >
        {({ errors }) => (
          <Form className="px-8 py-10 w-[90%] sm:w-[40%] rounded-md something">
            <h1 className="text-3xl font-poppins mb-4 text-center">
              {type === "register" ? "Register" : "Login"}
            </h1>

            {/* Register Add-on of name */}
            {type === "register" && (
              <div className="space-y-1 mb-2 flex justify-between space-x-2">
                <div className="mt-1">
                  <label>First Name</label>
                  <Field
                    type="text"
                    name="firstName"
                    className="w-full border border-gray-400 outline-none focus:border-gray-600 px-4 py-2 rounded-md"
                    placeholder="Alex"
                  />
                  <span className="text-sm text-red-500">
                    {errors.firstName && errors.firstName}
                  </span>
                </div>

                <div>
                  <label>Last Name</label>
                  <Field
                    type="text"
                    name="lastName"
                    className="w-full border border-gray-400 outline-none focus:border-gray-600 px-4 py-2 rounded-md"
                    placeholder="Alinder"
                  />
                  <span className="text-sm text-red-500">
                    {errors.lastName && errors.lastName}
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-1 mb-2">
              <label>Email</label>
              <Field
                type="email"
                name="email"
                className="w-full border border-gray-400 outline-none focus:border-gray-600 px-4 py-2 rounded-md"
                placeholder="Email"
                aria-labelledby="email-label"
              />
              <span className="text-sm text-red-500">
                {errors.email && errors.email}
              </span>
            </div>

            <div className="space-y-1 mb-2">
              <label>Password</label>
              <Field
                type="password"
                name="password"
                className="w-full border border-gray-400 outline-none focus:border-gray-600 px-4 py-2 rounded-md"
                placeholder="Password"
                aria-labelledby="password-label"
              />
              <span className="text-sm text-red-500">{errors.password}</span>
            </div>

            <button
              type="submit"
              className="bg-transparent w-full text-black px-5 py-2 text-lg rounded-md something mt-3"
            >
              {type === "register" ? "Register" : "Login"}
            </button>
            <div className="absolute right-10 mt-2 cursor-pointer">
              {type === "register" ? (
                <p
                  onClick={() => {
                    history("/");
                  }}
                >
                  Already have an account?
                </p>
              ) : (
                <p onClick={() => history("/register")}>Register now?</p>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Authenticate;
