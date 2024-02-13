import axios from "axios";
import {BASE_URL} from "../URL";
import {createAsyncThunk} from "@reduxjs/toolkit";


axios.defaults.headers.post['Content-Type'] = "application/json";

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



export const createMinistry = createAsyncThunk('ministry', async (values) => {
    try {
        console.log(values);
        const  response = await  CONST_API.post("/ministry/create-update",{
            name : values.name,
            shortCode  :  values.shortCode
        })

        console.log(response.data);

        return response.data;
    }
    catch (error){
        console.log(error);
        return error.message;
    }
})

export const getAllMinstries =   createAsyncThunk("ministries", async () => {
    try {
        const response =  await CONST_API.get("ministry/get-all");

        console.log(response.data);
        return response.data
    }
    catch (error){
        console.log(error);

        return error.message
    }
})

export const  assignMinister = createAsyncThunk("assign_minister", async(values) => {
    try {
         const response = await  CONST_API.get(`/ministry/${values.ministerUuid}/${values.ministryUuid}`);

         console.log(response.data);
         return  response.data;
    }
    catch (error){
        console.log(error)
        return error.message;
    }
})

export const getMinistryById =  createAsyncThunk("ministry_id", async(values) => {
    try {
        const response = await CONST_API.get(`/ministry/${values}`);

        console.log(response.data);
        return  response.data;
    }
    catch (error){
        console.log(error);

        return error.message;
    }
})


export  const deleteMinistry = createAsyncThunk( 'delete_ministry',  async (values)  => {
    try {
        const response =  await  CONST_API.delete(`/ministry/delete/${values}`);

        console.log(response.data);
        return response.data;
    }
    catch (error){
        console.log(error);

        return error.message
    }
})



export const dashboardSummary = createAsyncThunk('dashboard', async()  =>{
    try {
        const response = await CONST_API.get('/dashboard/');

        console.log(response.data);
        return  response.data;
    }
    catch (error){
        console.log(error);
        return error.message
    }
})