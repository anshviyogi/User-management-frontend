import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearDetails } from "../../app/authSlice";

interface Response {
    userData: {
        email: String,
        token: String,
        username: String
    }
}

function Dashboard(): JSX.Element {
    const navigate = useNavigate();
    const reduxStore = useSelector((state: Response) => state.userData)
    const dispatch = useDispatch()

    const logoutHandler = () => {
        localStorage.removeItem("token")
        toast.success("Logged out successfully")

        dispatch(clearDetails())

        navigate("/")
    }
    
    return (
        <div className="flex flex-col min-h-screen items-center justify-center space-y-3">
            <h1 className="text-3xl">Dear {reduxStore ? reduxStore?.username?.toLocaleUpperCase() : "User"},</h1>
            <h3 className="text-lg text-red-600">(This is a secured route)</h3>
            <h5>These are some of your following details:</h5>
            <h6>Email: {reduxStore.email}</h6>
            <h6>Username: {reduxStore.username}</h6>
            
            <button className="bg-red-500 text-white px-5 py-1 rounded-md" onClick={logoutHandler}>Logout</button>
        </div>
    )
}

export default Dashboard;