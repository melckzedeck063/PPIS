import React, { useEffect, useState } from 'react'

import * as MdIcons from 'react-icons/md';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { Spinner } from "@material-tailwind/react";
import OTPform from './OTPform';
import { useDispatch, useSelector } from 'react-redux';
import { sendConcern } from '../store/actions/concern_actions';
import axios from 'axios';
Modal.setAppElement('#root'); // Set the root element for accessibility


const schema = Yup.object({
    // title: Yup
    // .string()
    // .required()
    // .trim(),
    description : Yup
        .string()
        .required()
        .trim(),
        category :  Yup
        .string()
        .required()
        .trim(),
        // representative : Yup
        // .string()
        // .required()
        // .trim(),
        concernType : Yup
        .string()
        .required()
        .trim()
})


 
export function CustomSpinner() {
  return <Spinner className="h-16 w-16 text-blue-800/50" />;
}


export default function NewConcern() {

    const dispatch =  useDispatch();

    const categories =  useSelector(state => state.concerns);
    const  staffs =   useSelector(state => state.users);
    const [btnClicked, setBtnClicked]  =  useState(false);
    const [sendConcernResponse, setSendConcernResponse] = useState(null);

  const { register, handleSubmit, reset, formState: { errors, isValid, isDirty, isSubmitSuccessful } } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    resolver: yupResolver(schema)
  });

  const checkForAbuse = async (data) => {
    try {
      const edenAIOptions = {
        method: 'POST',
        url: 'https://api.edenai.run/v2/text/moderation',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjA3ZTQ5YWQtMmYyOS00OGIzLWE1ODktYzdhN2ZhNDBjNGY0IiwidHlwZSI6ImFwaV90b2tlbiJ9.h-WZ4vFLlI0_LFytgUW8HsUrIBayqcV4JLdzw-Mmooo',
          'Content-Type': 'application/json',
        },
        data: {
          providers: 'microsoft, openai',
          language: 'en',
          text: `${data.title} ${data.description}`,
          fallback_providers: '',
        },
      };

     const edenAIResponse = await axios.request(edenAIOptions);

    console.log(edenAIResponse.data);

    // Handle the EdenAI response
    if (edenAIResponse.data && edenAIResponse.data.is_abusive) {
      alert('Your content contains abusive language. Please revise and try again.');
    } else {
      // Check OpenAI nsfw_likelihood_score
      const nsfwLikelihoodScore = edenAIResponse.data.openai.nsfw_likelihood_score || 0;

      if (nsfwLikelihoodScore > 0.5) {
        alert('Your content may not be appropriate. Please revise and try again.');
      } else {
        // If content is not abusive, proceed with form submission
        try {
      // Dispatch the sendConcern action and await the response
      const response = await dispatch(sendConcern(data));
      // Set the response in the state for rendering
      setSendConcernResponse(response.payload);
    } catch (error) {
      // Handle errors if needed
      console.error('Error sending concern:', error);
    }
      }
    }
    } catch (error) {
      console.error(error.response);
      // Handle EdenAI API error here
      alert('An error occurred while checking for abuse. Please try again later.');
    }
  };

  const onSubmit = (data) => {
    // Call the function to check for abuse before submitting
    checkForAbuse(data);
  };


    useEffect(() => {
      if(isSubmitSuccessful){
        reset({
          description : "",
          category : "",
          concernType: ""
        })
      }
    })


    const loginClicked = () => {
      setBtnClicked(true);
      setTimeout(() => {
        setBtnClicked(false);
    
      }, 3000);
    }
    


  return (
    <div className='bg-gray-200'>
<div class="grid min-h-screen place-items-center">
  <div class="w-11/12 p-11 bg-white rounded-lg sm:w-9/12 md:w-1/2 lg:w-5/12">
    <h1 class="text-xl font-semibold">Hello there ?, <span class="font-bold">Send us your concern</span></h1>
    <form class="mt-6" onSubmit={handleSubmit(onSubmit)}>
      {/* <div class="flex justify-between gap-3">
        <span class="w-1/2"> */}
          {/* <label for="title" class="block text-xs font-semibold text-gray-600 uppercase">Title</label>
          <input id="title" type="text" name="title" placeholder="Concern title" autocomplete="given-name" class={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.title? "border-red-500" : "border-sky-500"}`} 
            defaultValue={""}
            {...register("title")}
        />
        <span className="text-red-500 text-sm">{errors.title?.message}</span> */}
        {/* </span> */}
        <span class="w-1/2">
          <label for="description" class="block text-xs font-semibold text-gray-600 uppercase">Your  Concern</label>
        <textarea id="description" type="text" name="description" placeholder="Water..." autocomplete="family-name" class={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.description ? "border-red-500" : "border-sky-500"}`}
        defaultValue={""}
        {...register("description")}
        ></textarea>
         <span className="text-red-500 text-sm">{errors.description?.message}</span>
        </span>
      {/* </div> */}
           
        
      <label for="password" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                User Role
              </label>
              <select
                id="userRole"
                name="userRole"
                class={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${
                  errors.category ? 'border-red-500' : 'border-sky-500'
                }`}
                defaultValue={''}
                {...register('category')}
              >
                <option value="" disabled>
                  Select Category
                </option>
                {
                  categories && categories.all_categories && (
                    categories &&  categories.all_categories.error === false ? (
                      categories.all_categories.dataList.map((item,index) => (
                        <option key={index} value={item.uuid}> {item.categoryName} </option>
                      ))
                    )
                    :
                    <>
                     <option value="">No data found</option>
                    </>
                  )
                }
              </select>
              <span className="text-red-500 text-sm">{errors.category?.message}</span>

              {/* <label for="region" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                Region
              </label>
              <select
                id="region"
                name="region"
                class={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${
                  errors.representative ? 'border-red-500' : 'border-sky-500'
                }`}
                defaultValue={''}
                {...register('representative')}
              >
                <option value="" disabled>
                  Select Representative
                </option>
                  {
                    staffs && staffs.staffs &&(
                      staffs && staffs.staffs && staffs.staffs.empty === false ? (
                        staffs.staffs.content.map((item,index) => (
                          <option key={index} value={item.uuid}> {item.fullName} </option>
                        )
                      )
                    )
                    :
                    <>
                    <option value="">No data found</option>
                    </>
                    )
                  }
              </select>
              <span className="text-red-500 text-sm">{errors.representative?.message}</span> */}

              <label for="concern_type" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                Concern  Type
              </label>
              <select
                id="region"
                name="region"
                class={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 my-2 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${
                  errors.concernType ? 'border-red-500' : 'border-sky-500'
                }`}
                defaultValue={''}
                {...register('concernType')}
              >
                <option value="" disabled>
                  Select Option
                </option>
                  <option value="Private">Private</option>
                  <option value="Public">Public</option>
              </select>
              <span className="text-red-500 text-sm">{errors.concernType?.message}</span>
           
         
           <div class="flex w-full">
                <button onClick={loginClicked}  disabled={!isValid || !isDirty}
                  class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                   
                   {
                    btnClicked  &&(
                      <div class="w-12 h-12 border-4 border-white rounded-full loader"></div>
                    )
                   }
                   {
                    !btnClicked && (
                  <div className='bn1' style={{display:'flex'}}>
                    <span class="mr-2 uppercase">Submit</span>
                    <span>
                      <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </div>

                    )
                   }
                </button>
          </div>
    </form>
    
  </div>
</div>
    </div>
  )
}
