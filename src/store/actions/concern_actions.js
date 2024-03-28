import axios from "axios";
import {BASE_URL, TEST_URL} from "../URL";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { async } from "q";

axios.defaults.headers.post["Content-Type"]="application/json";

const CONCERN_API =  axios.create({baseURL : `${BASE_URL}`});

CONCERN_API.interceptors.request.use((req) => {
    const storage = sessionStorage.getItem("ppis-token");
    const {data} = JSON.parse(storage);
    const {token}  = data;

    if(token){
        // console.log(token);
        req.headers.Authorization = `Bearer ${token}`;
    }

    return  req;
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


export const sendConcern = createAsyncThunk('/new_concern', async(values) => {

    try {
        // console.log(values);
        const response = await CONCERN_API.post(`/concern/create-update`, {
            title : values.title,
            description : values.description,
            categoryUid : values.category,
            submittedToUid : values.representative,
            concernType : values.concernType
        })

        // console.log(response.data);
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
        const response =  await CONCERN_API.get("/concern/get/my-concerns");

         console.log(response.data);
         return response.data;
     } catch (error) {
        console.log(error);
        return error.message
     }
  })



export const getSubmitteToMp = createAsyncThunk('/submitted_to_mp', async () => {
    try {
        const response =  await CONCERN_API.get("/concern/get-for-mp");

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.message
    }
})

export const getSubmittedToMpPrivate = createAsyncThunk('/submitted_to_mp_private', async () => {
    try {
        const response =  await CONCERN_API.get("/concern/get-for-mp-private");

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.message
    }
})

export const getSubmitteToSecretary = createAsyncThunk('/submitted_to_secretary', async () => {
    try {
        const response =  await CONCERN_API.get("/concern/get-for-secretary");

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

        // console.log(response.data);
        return response.data;
    } catch (error) {
      console.log(error);
      return error.message
    }
  })


  export const assignConcern = createAsyncThunk ('/assign', async(values) => {
    // console.log(values)
    try {
          const response =  await CONCERN_API.put(`/concern/assign/secretary?user_uid=${values.assistantUuid}&concern_uid=${values.concernUuid}`);

          console.log(response.data);
          return response.data;
          
    } catch (error) {
        console.log(error);
        return error.message
    }
  })


  export const fowardConcern = createAsyncThunk ('/foward', async(values) => {
    console.log(values)
    try {
          const response =  await CONCERN_API.put(`/concern/forward/minister?user_uid=${values.ministerUuid}&concern_uid=${values.concernUuid}`);

          console.log(response.data);
          return response.data;
          
    } catch (error) {
        console.log(error);
        return error.message
    }
  })

   export  const allConcerns =  createAsyncThunk("/all_concerns", async() => {
       try {
           const response =  await CONCERN_API.get("/concern/get-all");

           // console.log(response.data);
           return response.data;
       }
       catch (error){
           console.log(error)
           return error.message();
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

  export const concernComment = createAsyncThunk('/new_comment', async(values) => {
     try {
          const response = await CONCERN_API.post('/comment/post',{
            description : values.comment,
            concernUid :  values.concernUid
          });

          // console.log(response.data);
          return response.data;

     } catch (error) {
          console.log(error)
          return error.message
     }
  })

  export const getConcernComments = createAsyncThunk('/comments', async(values) => {
       try {
             const response = await CONCERN_API.get(`/comment/${values}`);

            //  console.log(response.data);
             return response.data
       } catch (error) {
          console.log(error);
          return error.message;
       }
  })