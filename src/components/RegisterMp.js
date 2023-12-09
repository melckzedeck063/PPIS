import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Modal from 'react-modal';

import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
    Card,
  } from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { signInUser, signUpUser } from '../store/actions/users_actions';
import MainLayout from './sidebar/MainLayout';
import { ShowToast } from './sidebar/notifications';
  
    Modal.setAppElement('#root');



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
        .min(12)
        .max(12)
        .trim(),
        userRole : Yup
        .string()
        .required()
        .trim(),
        province : Yup
        .string()
        .required()
        .trim()
})

export default function RegisterMP() {

    const { register, handleSubmit, reset, formState: { errors, isValid, isDirty, isSubmitSuccessful } } = useForm({
        mode: 'all',
        reValidateMode: 'onChange',
        shouldFocusError: true,
        resolver: yupResolver(schema)
    })

    const constituencies  = useSelector(state  => state.users);
    // console.log(constituencies.constituencies.dataList)
    console.log(constituencies.new_user);

    const dispatch = useDispatch();
    const [btnClicked, setBtnClicked]  =  useState(false);


    const onSubmit = data => {
        // console.log(data)
        dispatch(signUpUser(data));
        
    }

    useEffect(() => {
      if(isSubmitSuccessful){
        reset({
          firstname : "",
          lastname : "",
          email : "",
          phone : "",
          province  : "",
          userRole : ""
        })
      }
    })

    const loginClicked = () => {
      setBtnClicked(true);
      setTimeout(() => {
        setBtnClicked(false);
      }, 3000);

      setTimeout(() => {
        if(constituencies?.new_user?.error === false){
          ShowToast("SUCCESS", constituencies?.new_user?.message)
        }
        else if(constituencies?.new_user?.error === true){
          ShowToast("ERROR", constituencies?.new_user?.message);
        }
        else {
          ShowToast("ERROR", "Request failed please try again");
        }
      }, 1500);
    }

  return (
    <MainLayout>
          <div className='bg-gray-200'>
<div class="grid min-h-screen place-items-center">
  <div class="w-11/12 p-11 bg-white rounded-lg sm:w-9/12 md:w-1/2 lg:w-5/12">
    <h1 class="text-xl font-semibold">Hello there ?, <span class="font-normal">please fill in your information to continue</span></h1>
    <form class="mt-6" onSubmit={handleSubmit(onSubmit)}>
      <div class="flex justify-between gap-3">
        <span class="w-1/2">
          <label for="firstname" class="block text-xs font-semibold text-gray-600 uppercase">Firstname</label>
          <input id="firstname" type="text" name="firstname" placeholder="John" autocomplete="given-name" class={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.firstname? "border-red-500" : "border-sky-500"}`} 
            defaultValue={""}
            {...register("firstname")}
        />
        <span className="text-red-500 text-sm">{errors.firstname?.message}</span>
        </span>
        <span class="w-1/2">
          <label for="lastname" class="block text-xs font-semibold text-gray-600 uppercase">Lastname</label>
        <input id="lastname" type="text" name="lastname" placeholder="Doe" autocomplete="family-name" class={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.lastname ? "border-red-500" : "border-sky-500"}`}
        defaultValue={""}
        {...register("lastname")}
        />
         <span className="text-red-500 text-sm">{errors.lastname?.message}</span>
        </span>
      </div>
           <label for="email" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">E-mail Address</label>
           <input id="email" type="email" name="email" placeholder="john.doe@company.com" autocomplete="email" class={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.email?"border-red-500" : "border-sky-500"}`}
             defaultValue={""}
             {...register("email")}
           />
            <span className="text-red-500 text-sm">{errors.email?.message}</span>
        
         <label for="telephone" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Telephone</label>
         <input id="telephone" type="telephone" name="telephone" placeholder="+255710020090" autocomplete="telephone" class={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.phone ? "border-red-500" : "border-sky-500"}`} 
           defaultValue={""}
           {...register("phone")}
         />
          <span className="text-red-500 text-sm">{errors.phone?.message}</span>
        
          <label for="password" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                User Role
              </label>
              <select
                id="userRole"
                name="userRole"
                class={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${
                  errors.userRole ? 'border-red-500' : 'border-sky-500'
                }`}
                defaultValue={''}
                {...register('userRole')}
              >
                <option value="" disabled>
                  Select User Role
                </option>
                <option value="ADMIN">ADMIN</option>
                <option value="MINISTER">MINISTER</option>
                <option value="MP">MP</option>
                <option value="SECRETARY">SECRETARY</option>
              </select>
              <span className="text-red-500 text-sm">{errors.userRole?.message}</span>

              <label for="region" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                province
              </label>
              <select
                id="province"
                name="province"
                class={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 my-2 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${
                  errors.province ? 'border-red-500' : 'border-sky-500'
                }`}
                defaultValue={''}
                {...register('province')}
              >
                <option value="" disabled>
                  Select Province
                </option>
                {
                  constituencies && constituencies.constituencies &&  constituencies.constituencies.dataList &&(
                    constituencies && constituencies.constituencies &&  constituencies.constituencies.error === false?(
                      constituencies?.constituencies?.dataList.map((item,index) => (
                        <option key={index} value={item.uuid}> {item.constituentName} </option>
                      ))
                    )
                    : 
                    <>
                     <option value="">No data found</option>
                    </>
                    
                    
                  )

                }
              </select>
              <span className="text-red-500 text-sm">{errors.province?.message}</span>

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
                    <span class="mr-2 uppercase">Register</span>
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
  


    </MainLayout>
  )
}
