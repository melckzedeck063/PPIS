import React, { useState } from 'react';
import SideNav from './sidebar/SideNav';
import NavBar from './sidebar/NavBar';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = Yup.object({
        password : Yup
        .string()
        .min(8)
        .trim(),
        new_password : Yup
        .string()
        .min(8)
        .trim(),
        confirmPassword : Yup
        .string()
        .required()
        .oneOf([Yup.ref("new_password")], "Passwords do not match")
        .trim()
})

const ChangePassword = () => {

  const [btnClicked, setBtnClicked]  =  useState(false);

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

    const loginClicked = () => {
      setBtnClicked(true);
      setTimeout(() => {
        setBtnClicked(false);
    
      }, 3000);
    }

  return (

    <div>
              <div className="flex w-full"> 
          <SideNav />
          
          
          <div  className="w-full bg-slate-200">
             <NavBar />
              <div className="pl-4">
                <form onSubmit={handleSubmit(onSubmit)} >
              <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Change Password</h2>

        {/* Current Password */}
        <div className="mb-4">
          <label htmlFor="currentPassword" className="block text-gray-600 text-sm font-semibold mb-2">
            Current Password
          </label>
          <input id="password" type="password" name="password" placeholder="********" autocomplete="new-password" class={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.password ? "border-red-500" :  "border-sky-500"}`}
              defaultValue={""}
              {...register("password")}
            />
             <span className="text-red-500 text-sm">{errors.password?.message}</span>
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-gray-600 text-sm font-semibold mb-2">
            New Password
          </label>
          <input id="new_password" type="password" name="new_password" placeholder="********" autocomplete="new-password" class={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.new_password ? "border-red-500" :  "border-sky-500"}`}
              defaultValue={""}
              {...register("new_password")}
            />
             <span className="text-red-500 text-sm">{errors.new_password?.message}</span>
        </div>

        {/* Confirm New Password */}
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-600 text-sm font-semibold mb-2">
            Confirm New Password
          </label>
          <input id="password-confirm" type="password" name="password-confirm" placeholder="********" autocomplete="new-password" class={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400`} 
              defaultValue={""}
              {...register("confirmPassword")}
            />
             <span className="text-red-500 text-sm">{errors.confirmPassword?.message}</span>
        </div>

        {/* Change Password Button */}
        <div class="flex w-full my-1.5">
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
                    <span class="mr-2 uppercase">Update</span>
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
      </div>
    </div>
         </form>
              </div>
          </div>
            </div>
          </div> 

    
  );
};

export default ChangePassword;
