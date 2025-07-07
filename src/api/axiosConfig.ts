import axios from "axios";

const api = axios.create({
    baseURL: "https://astra-api-0btb.onrender.com", // your backend base URL
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
