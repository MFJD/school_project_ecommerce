import api from "./api";

export const loginRequest = async (data: {
    email: string;
    password: string;
}) => {
    const res = await api.post("/auth/login", data);
    return res.data;
};

export const registerRequest = async (data: {
    name: string;
    email: string;
    password: string;
}) => {
    const res = await api.post("/auth/register", data);
    return res.data;
};
