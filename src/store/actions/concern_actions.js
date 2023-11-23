import axios from "axios";
import { BASE_URL } from "../URL";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.headers.post["Content-Type"]="application/json";

const CONCERN_API =  axios.create({baseURL : `${BASE_URL}`});

CONCERN_API.interceptors.request.use((req) => {
    const storage = sessionStorage.getItem("token");
    const {data} = JSON.parse(storage);
    const {token}  = data;



    if(token){
        // console.log(token);
        req.headers.Authorization = `Bearer ${token}`;
    }

    return  req;
})


export const sendConcern = createAsyncThunk('/new_concern', async(values) => {

    try {
        // console.log(values);
        const response = await CONCERN_API.post(`/concern/create-update`, {
            title : values.title,
            description : values.description,
            categoryUid : values.category,
            submittedToUid : values.representative
        })

        console.log(response.data);
        return response.data

    } catch (error) {
        console.log("error occured");
        console.log(JSON.stringify(error));
        return error.message;
    }
})

export const getMyConcerns = createAsyncThunk("/my_concerns", async () => {
    try {
      const response = await CONCERN_API.get('/concern/get/submitted-to-me');
      console.log(response.data);
      return response.data; // Assuming response.data is already in the desired format
    } catch (error) {
      console.log(error);
      return error.message;
    }
  });

  export const getSubmittedByMe = createAsyncThunk('/my_submitted', async () => {
     try {
        const response =  await CONCERN_API.get("concern/get/my-concerns");

         console.log(response.data);
         return response.data;
     } catch (error) {
        console.log(error);
        return error.message
     }
  })


  export const  getConcernById = createAsyncThunk('/concern_id', async(values) => {
    // console.log(values)
    try {
        const  response =  await CONCERN_API.get(`/concern/get/${values}`);

        console.log(response.data);
        return response.data;
    } catch (error) {
      console.log(error);
      return error.message
    }
  })


  export  const  getAllCAtegories = createAsyncThunk("/categories", async() =>{
    try {
         const response =  await CONCERN_API.get("/category/all");

        //  console.log(response.data);
         return response.data;

    } catch (error) {
         console.log(error);
         return error.message;
    }
  })