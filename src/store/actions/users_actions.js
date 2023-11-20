
import axios from "axios";

import { AUTH_URL,BASE_URL } from "../URL";  
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.headers.post['Content-Type'] = 'application/json';

const AUTH_API = axios.create({ baseURL: AUTH_URL });
AUTH_API.interceptors.request.use((req) => {
    const storage = sessionStorage.getItem('token');
    const {data} = JSON.parse(storage);
    const {token}  = data;

    if (token) {
        req.headers.Authorization = `Bearer ${token}`
    }

    return req
})


const CONST_API = axios.create({ baseURL:BASE_URL });
CONST_API.interceptors.request.use((req) => {
    const storage = sessionStorage.getItem('token');
    const {data} = JSON.parse(storage);
    const {token}  = data;

    if (token) {
        req.headers.Authorization = `Bearer ${token}`
    }

    return req
})


export const signInUser = createAsyncThunk('/user', async (values) => {
    // console.log(values)
    try {
        const response = await axios.post(`${AUTH_URL}/login`, {
            username: values.username,
            password: values.password
        });

        // console.log(response.data)
        sessionStorage.setItem('token', JSON.stringify(response.data))
    }
    catch (error) {
        console.log(error)
        return error.message
    }
})


export const signUpUser = createAsyncThunk('user/new', async (values) => {
    try {
        const response = await axios.post(`${AUTH_URL}/signup`, {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            gender: values.gender,
            dob: values.dob,
            telephone: values.telephone,
            password: values.password,
            confirmPassword: values.confirmPassword
        })

        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.log(error)
        return error.message
    }
})

export const getAllStaffs = createAsyncThunk('/staffs', async () => {
    try {
        const response = await AUTH_API.get('/all_staffs');

        //    console.log(response.data)
        return response.data;
    }
    catch (error) {
        console.log(error);
        return error.message
    }
})

export const getAllCustomers = createAsyncThunk('/all_users', async () => {
    try {
        const response = await AUTH_API.get('/all_users');

        //    console.log(response.data)
        return response.data;
    }
    catch (error) {
        console.log(error);
        return error.message
    }
})

export const getUserById = createAsyncThunk('/current/user', async (id) => {
    try {
        const response = await AUTH_API.get(`/user/${id}`);

        // console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.log(error);
        return error.message
    }
})

export const updateUser = createAsyncThunk('/update', async (values, id) => {
    try {
        const response = await AUTH_API.patch(`/update_user/${id}`, {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            dob: values.dob,
            gender: values.gender,
            telephone: values.telephone,
            role: values.role
        })

        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.log(error);
        return error.message;
    }
})

export const updateMe = createAsyncThunk('/me/update', async (values) => {
    try {
        const response = await AUTH_API.patch(`/update/me/`, {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            middleName: values.middleName,
            dob: values.dob,
            gender: values.gender,
            telephone: values.telephone,
            role: values.role
        });
        return response.data;
    }
    catch (error) {
        console.log(error);
        return error.message
    }
})
export const myProfile = createAsyncThunk('/profile', async () => {
    try {
        const response = await AUTH_API.get('/me');

        console.log(response.data);
        return response.data;

    }
    catch (error) {
        console.log(error);
        return error.message
    }
});


//  CONSTITUENCY SECTION

export const getAllConstituency = createAsyncThunk ("/constituency",  async() => {
    try {
           const response =  await CONST_API.get("/constituency/");

           console.log(response.data);
           return response.data;
           
    } catch (error) {
        console.log(error);
        return  error.message
    }
})