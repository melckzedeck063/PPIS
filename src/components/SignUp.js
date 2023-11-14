import React, { useState } from 'react'

import * as MdIcons from 'react-icons/md';
import * as Yup from 'yup';

import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
Modal.setAppElement('#root'); // Set the root element for accessibility


const schema = Yup.object({
    firstname: Yup
    .string()
    .required()
    .trim(),
    lastname : Yup
        .string()
        .required()
        .trim(),
        email :  Yup
        .string()
        .required()
        .email()
        .trim(),
        phone  :  Yup
        .string()
        .required()
        .min(10)
        .max(10)
        .trim(),
        password : Yup
        .string()
        .min(8)
        .trim(),
        confirmPassword : Yup
        .string()
        .required()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .trim()
})

export default function SignUp() {


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
  <div class="w-11/12 p-12 bg-white rounded-lg sm:w-8/12 md:w-1/2 lg:w-5/12">
    <h1 class="text-xl font-semibold">Hello there ?, <span class="font-normal">please fill in your information to continue</span></h1>
    <form class="mt-6" onSubmit={handleSubmit(onSubmit)}>
      <div class="flex justify-between gap-3">
        <span class="w-1/2">
          <label for="firstname" class="block text-xs font-semibold text-gray-600 uppercase">Firstname</label>
          <input id="firstname" type="text" name="firstname" placeholder="John" autocomplete="given-name" class={`text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.firstname ? "border-red-500" : "border-sky-500"}`} 
            defaultValue={""}
            {...register("firstname")}
        />
        <span className="text-red-500 text-sm">{errors.firstname?.message}</span>
        </span>
        <span class="w-1/2">
          <label for="lastname" class="block text-xs font-semibold text-gray-600 uppercase">Lastname</label>
        <input id="lastname" type="text" name="lastname" placeholder="Doe" autocomplete="family-name" class={`text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.lastname ? "border-red-500" : "border-sky-500"}`}
        defaultValue={""}
        {...register("lastname")}
        />
         <span className="text-red-500 text-sm">{errors.lastname?.message}</span>
        </span>
      </div>
           <label for="email" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">E-mail Address</label>
           <input id="email" type="email" name="email" placeholder="john.doe@company.com" autocomplete="email" class={`text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.email?"border-red-500" : "border-sky-500"}`}
             defaultValue={""}
             {...register("email")}
           />
            <span className="text-red-500 text-sm">{errors.email?.message}</span>
        
         <label for="telephone" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Telephone</label>
         <input id="telephone" type="telephone" name="telephone" placeholder="+255710020090" autocomplete="telephone" class={`text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.phone ? "border-red-500" : "border-sky-500"}`} 
           defaultValue={""}
           {...register("phone")}
         />
          <span className="text-red-500 text-sm">{errors.phone?.message}</span>
        
             <label for="password" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
            <input id="password" type="password" name="password" placeholder="********" autocomplete="new-password" class={`text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.password ? "border-red-500" :  "border-sky-500"}`}
              defaultValue={""}
              {...register("password")}
            />
             <span className="text-red-500 text-sm">{errors.password?.message}</span>
         
            <label for="password-confirm" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Confirm password</label>
            <input id="password-confirm" type="password" name="password-confirm" placeholder="********" autocomplete="new-password" class={`text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400`} 
              defaultValue={""}
              {...register("confirmPassword")}
            />
             <span className="text-red-500 text-sm">{errors.confirmPassword?.message}</span>
         
         <div class="flex w-full my-4">
          <button type="submit" class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
            <span class="mr-2 uppercase">Sign Up</span>
            <span>
              <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </button>
        </div>

        
       
       {/* <div className="">
           <p onClick={closeSignupModal} class="flex justify-between cursor-pointer inline-block mt-4 text-xs text-blue-500 cursor-pointer hover:text-black">Already registered?</p>
       </div> */}
    </form>
  </div>
</div>
    </div>
  )
}
