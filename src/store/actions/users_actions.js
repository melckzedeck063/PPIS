
import axios from "axios";

import {AUTH_URL, BASE_URL, TEST_AUTH, TEST_URL} from "../URL";
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
    const storage = sessionStorage.getItem('ppis-token');
    const {data} = JSON.parse(storage);
    const {token}  = data;

    if (token) {
        req.headers.Authorization = `Bearer ${token}`
    }

    return req
})

const TEST_API = axios.create({ baseURL:TEST_URL });
TEST_API.interceptors.request.use((req) => {
    const storage = sessionStorage.getItem('ppis-token');
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
        const response = await axios.post(`${TEST_AUTH}/login`, {
            username: values.username,
            password: values.password
        });

        console.log(response.data)
        sessionStorage.setItem('ppis-token', JSON.stringify(response.data))
        return response.data
    }
    catch (error) {
        console.log(error)
        return error.message
    }
})


export const signUpUser = createAsyncThunk('user/new', async (values) => {
    console.log(values);

    try {
        const response = await TEST_API.post(`/user/create-update`, {
            username: values.email,
            firstName: values.firstname,
            lastName: values.lastname,
            phoneNumber: values.phone,
            constituentUid :  values.province,
            userType : values.userRole
            
        })

        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.log(error)
        return error.message
    }
})

export  const registerUser = createAsyncThunk('/new_user', async (values) => {
    console.log(values);

    try {
        const response = await axios.post(`${AUTH_URL}/register`, {
            firstName: values.firstname,
            lastName: values.lastname,
            username: values.email,
            phoneNumber: values.phone,
            nidaNumber :  values.nida,
            constituentUid : values.province,
            password : values.password
            
        })

        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.log(error)
        return error.message
    }
})

export const activateAccount = createAsyncThunk('/activate', async(values) => {
    try {
           const response  =  await axios.get(`${AUTH_URL}/activate-account?code=${values.code}`);

           console.log(response.data);
           return response.data;

    } catch (error) {
        console.log(error);
        return error.message
    }
})

export const getAllStaffs = createAsyncThunk('/staffs', async () => {
    try {
        const response = await TEST_API.get('/user/get-officials');

           // console.log(response.data)
        return response.data;
    }
    catch (error) {
        console.log(error);
        return error.message
    }
})

export const getAllAssistants = createAsyncThunk('/assistants', async () => {
    try {
        const response = await TEST_API.get('/user/get-assistants');

        console.log(response.data)
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

        // console.log(response.data);
        return response.data;

    }
    catch (error) {
        console.log(error);
        return error.message
    }
});

export const deleteUser =  createAsyncThunk('delete_user', async (values) =>  {
    try {
         const response =  await CONST_API.delete(`/user/delete/${values}`);

         console.log(response.data);
         return  response.data;
    }
    catch (error){
        console.log(error);
        return error.message;
    }
})

//  CONSTITUENCY SECTION

export const getAllConstituency = createAsyncThunk ("/constituency",  async() => {
    try {
           const response =  await axios.get(`${TEST_AUTH}/constituency-list`);

           // console.log(response.data);
           return response.data;
           
    } catch (error) {
        console.log(error);
        return  error.message
    }
})

export const  success_global = createAsyncThunk('/success', async(msg)  => {
    return {
        type: "SUCCESS_MESSAGE",
        message : msg
    }
});


export const error_global  =    createAsyncThunk('/error', async(msg) => {
    return {
        type : "ERROR_MESSAGE",
        message  : msg
    }
});