import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiCaller from "./axiosCaller";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../app/authSlice";

interface Props {
  isValid: Boolean,
  email: String,
  username: String
}

function Wrapper({ children }: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let token = localStorage.getItem("token") as string;

  async function tokenValidation() {
    try {
      let response = await apiCaller.post("/verifyToken", {token});
      console.log(response)

      if (response.data.success) {
        // User is valid
        return {isValid: true, email: response.data.email, username: response.data.username};
      } else {
        // User is not valid
        return {isValid: false};
      }
    } catch (error: any) {
      // Some error occured
      return {isValid: false};
    }
  }

  useEffect(() => {
    async function check(){
      if (token) {
        let result = await tokenValidation();

        if (result.isValid) {
          // The token is valid - cannot navigate to login/register page
          dispatch(setUserDetails({
            email: result.email,
            token,
            username: result.username
          }))

          navigate("/dashboard")
        } else {
          // The token is presend but not valid - cannot navigate to dashboard
          return children
        }
      } else {
        return children;
      }
    }
    check()
  }, []);

  return children;
}

export default Wrapper;
