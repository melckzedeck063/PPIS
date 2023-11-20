import React, { useState } from 'react'

import * as MdIcons from 'react-icons/md';
import * as Yup from 'yup';

import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { Spinner } from "@material-tailwind/react";
import OTPform from './OTPform';
import { yupResolver } from '@hookform/resolvers/yup';
Modal.setAppElement('#root'); // Set the root element for accessibility


const schema = Yup.object({
    title: Yup
    .string()
    .required()
    .trim(),
    description : Yup
        .string()
        .required()
        .trim(),
        category :  Yup
        .string()
        .required()
        .trim(),
        representative : Yup
        .string()
        .required()
        .trim(),
        confirmPassword : Yup
        .string()
        .required()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .trim()
})


 
export function CustomSpinner() {
  return <Spinner className="h-16 w-16 text-blue-800/50" />;
}


export default function NewConcern() {




    const { register, handleSubmit, reset, formState: { errors, isValid, isDirty, isSubmitSuccessful } } = useForm({
        mode: 'all',
        reValidateMode: 'onChange',
        shouldFocusError: true,
        resolver: yupResolver(schema)
    })

    const onSubmit = data => {
        console.log(data)
        // dispatch(signUpUser(data))
    }


  return (
    <div className='bg-gray-200'>
<div class="grid min-h-screen place-items-center">
  <div class="w-11/12 p-11 bg-white rounded-lg sm:w-9/12 md:w-1/2 lg:w-5/12">
    <h1 class="text-xl font-semibold">Hello there ?, <span class="font-normal">Send us your concern</span></h1>
    <form class="mt-6" onSubmit={handleSubmit(onSubmit)}>
      {/* <div class="flex justify-between gap-3">
        <span class="w-1/2"> */}
          <label for="title" class="block text-xs font-semibold text-gray-600 uppercase">Title</label>
          <input id="title" type="text" name="title" placeholder="Concern title" autocomplete="given-name" class={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.title? "border-red-500" : "border-sky-500"}`} 
            defaultValue={""}
            {...register("title")}
        />
        <span className="text-red-500 text-sm">{errors.title?.message}</span>
        {/* </span> */}
        <span class="w-1/2">
          <label for="description" class="block text-xs font-semibold text-gray-600 uppercase">Description</label>
        <input id="description" type="text" name="description" placeholder="Water..." autocomplete="family-name" class={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.description ? "border-red-500" : "border-sky-500"}`}
        defaultValue={""}
        {...register("description")}
        />
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
                <option value="Minister">Land Conflicts</option>
                <option value="PrimeMinister">Roads</option>
                <option value="Secretary">Water & Electricity</option>
              </select>
              <span className="text-red-500 text-sm">{errors.category?.message}</span>

              <label for="region" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">
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
                <option value="Mpwapwa">Mpwapwa</option>
                <option value="Kongwa">Kongwa</option>
                <option value="Bahi">Bahi</option>
              </select>
              <span className="text-red-500 text-sm">{errors.representative?.message}</span>
           <div className="mx-auto my-2">
            {/* {showSpinner? <CustomSpinner  /> : ""} */}
           </div>
         <div class="flex w-full my-4">
          <button type="submit" class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
            <span class="mr-2 uppercase">Submit</span>
            <span>
              <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </button>
        </div>

        
       
       
    </form>
    
  </div>
</div>
    </div>
  )
}
