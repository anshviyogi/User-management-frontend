import { createBrowserRouter } from "react-router-dom";
import Authenticate from "../common/Auth/index.tsx";
import Dashboard from "../Components/Dashboard/index.tsx";
import Wrapper from "../helper/Wrapper.ts";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Wrapper><Authenticate type='login'/></Wrapper>
    },
    {
        path:"/register",
        element: <Wrapper><Authenticate type='register'/></Wrapper>
    },
    {
        path:"/dashboard",
        element: <Wrapper><Dashboard /></Wrapper>
    },
])