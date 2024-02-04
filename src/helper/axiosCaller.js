import axios from "axios";

const apiCaller = axios.create({
    baseURL:"https://user-management-backend-xi.vercel.app/",
    responseType:"json"
})

export default apiCaller;