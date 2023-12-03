import React from 'react';
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
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .trim()
})

const ChangePassword = () => {

    const { register, handleSubmit, reset, formState: { errors, isValid, isDirty, isSubmitSuccessful } } = useForm({
        mode: 'all',
        reValidateMode: 'onChange',
        shouldFocusError: true,
        resolver: yupResolver(schema)
    })

    const onSubmit = data => {
        console.log(data)
        // dispatch(signUpUser(data))

        // dispatch(registerUser(data))
        // openModal()

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
          <input id="password" type="password" name="new_password" placeholder="********" autocomplete="new-password" class={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.new_password ? "border-red-500" :  "border-sky-500"}`}
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
        <button
          type="button"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
          // Add an onClick handler to handle the change password functionality
        >
          Change Password
        </button>
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
