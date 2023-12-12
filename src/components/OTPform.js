import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux';
import { activateAccount } from '../store/actions/users_actions';
import { ShowToast } from './sidebar/notifications';
import { Alert } from '@material-tailwind/react';

const schema = Yup.object({
  code: Yup
      .string()
      .required()
      .trim(),

})


export default function OTPform() {

  const dispatch = useDispatch();
  const [btnClicked, setBtnClicked]  =  useState(false);
  const [successMessage, setSuccessMessage]  = useState({message :"", error : false});
  const [failureMessage, setFailureMessage] = useState({message :"", error : false});
  const [open, setOpen] = React.useState(false);
  const [opened, setOpened] = React.useState(false);

  const login_message =  useSelector(state => state.users);
  // console.log(login_message.activate_account);

  console.log(successMessage);
  console.log(failureMessage);

  const { register, handleSubmit, reset, formState: { errors, isDirty, isValid, isSubmitSuccessful } } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(schema)
})

const onSubmit = data => {
    dispatch( activateAccount(data))
}

const loginClicked = () => {
  setBtnClicked(true);
  setTimeout(() => {
    setBtnClicked(false);

  }, 3000);
}

useEffect(() => {
  if (login_message?.activate_account?.error !== undefined && login_message?.activate_account?.error !== null) {
    if (login_message?.activate_account?.error === false) {
      // ShowToast("SUCCESS", login_message?.activate_account?.message);
      setSuccessMessage({ message :login_message?.activate_account?.message , error : true})
      setOpen(true)
      setTimeout(() => {
        setSuccessMessage(null)
        setOpen(false)
      }, 4000);
    } else if (login_message?.activate_account?.error === true) {
      // ShowToast("ERROR", login_message?.activate_account?.message);
      setFailureMessage({ message : login_message?.activate_account?.message , error: true});
      setOpened(true)
      setTimeout(() => {
        setFailureMessage(null)
        setOpened(false)
      }, 4000);
    }
  }
}, [login_message]);


useEffect(() =>{
   if(isSubmitSuccessful){
    reset({
      code : "",
    })
   }
})

  return (
    <div>
        <main id="content" role="main" class="w-full max-w-md mx-auto p-6">
    <div class="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-100 dark:border-gray-400">
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <h1 class="block text-2xl font-bold text-blue-900">Activate Your Acoount</h1>

          <Alert open={open} color="green" onClose={() => setOpen(false)}>
              Account activated succesfully
          </Alert>
          <Alert open={opened} color="red" onClose={() => setOpened(false)}>
              Invalid OTP Code please try again
          </Alert>

          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        
            <a class="text-blue-700 decoration-2 hover:underline font-medium" href="#">
              Enter OTP Code
            </a>
          </p>
        </div>

        <div class="mt-5">
          <form onSubmit={handleSubmit(onSubmit)} >
            <div class="grid gap-y-4">
              <div>
                <label for="email" class="block text-sm font-bold ml-1 mb-2 text-blue-900">Enter OTP sent to you</label>
                <div class="relative">
                  <input type="number" id="number" name="code" class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error"
                    defaultValue={""}
                    {...register("code")}
                  />
                  <span className="text-sm text-red-500"> {errors.code?.message} </span>
                </div>
                
              </div>
                   
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
          
            </div>
          </form>
        </div>
      </div>
    </div>

    {/* <p class="mt-3 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700">
      <a class="pr-3.5 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200" href="#" target="_blank">
        <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
        View Github
      </a>
      <a class="pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200" href="#">
        
        Contact us!
      </a>
    </p> */}
  </main>
    </div>
  )
}
