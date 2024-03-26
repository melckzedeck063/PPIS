import React, {useEffect, useState} from 'react';
import SideNav from './sidebar/SideNav';
import NavBar from './sidebar/NavBar';


import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Spinner } from "@material-tailwind/react";
import Footer from './sidebar/Footer';
import {useDispatch, useSelector} from "react-redux";
import {getAllStaffs, myProfile} from "../store/actions/users_actions";

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
        province : Yup
        .string()
        .required()
        .trim(),
        nida : Yup
        .string()
        .required()
        .min(16)
        .max(16)
        .trim()
});

const UserProfile = () => {

  const [btnClicked, setBtnClicked]  =  useState(false);
    const dispatch = useDispatch();
    const [reload, setReload] = useState(0);
    const profile =  useSelector(state => state.users);

    useEffect(() => {
        if (profile && profile.user_profile && profile.user_profile.length<1 && reload <= 2) {
            dispatch(myProfile());
            setReload(prevReload => prevReload + 1);
        }
    }, [dispatch, reload]);
    const row = profile?.user_profile || {};

    console.log(row);


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
              <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 onClick={() => dispatch(myProfile())} className="text-2xl font-bold mb-4">User Profile</h2>

          {
              profile && profile.user_profile  && profile.user_profile.active === true ? (
                      <>
                          <form onSubmit={handleSubmit(onSubmit)}>
                              <div className="flex justify-between gap-3">
        <span className="w-1/2">
          <label htmlFor="firstname" className="block text-xs font-semibold text-gray-600 uppercase">Firstname</label>
          <input id="firstname" type="text" name="firstname" placeholder="John" autoComplete="given-name"
                 className={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.firstname ? "border-red-500" : "border-sky-500"}`}
                 defaultValue={row.firstName}
                 {...register("firstname")}
          />
        <span className="text-red-500 text-sm">{errors.firstname?.message}</span>
        </span>
                                  <span className="w-1/2">
          <label htmlFor="lastname" className="block text-xs font-semibold text-gray-600 uppercase">Lastname</label>
        <input id="lastname" type="text" name="lastname" placeholder="Doe" autoComplete="family-name"
               className={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.lastname ? "border-red-500" : "border-sky-500"}`}
               defaultValue={row.lastName}
               {...register("lastname")}
        />
         <span className="text-red-500 text-sm">{errors.lastname?.message}</span>
        </span>
                              </div>

                              <label htmlFor="email" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">E-mail
                                  Address</label>
                              <input id="email" type="email" name="email" placeholder="john.doe@company.com"
                                     autoComplete="email"
                                     className={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.email ? "border-red-500" : "border-sky-500"}`}
                                     defaultValue={row.username}
                                     {...register("email")}
                              />
                              <span className="text-red-500 text-sm">{errors.email?.message}</span>

                              <label htmlFor="telephone"
                                     className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Telephone</label>
                              <input id="telephone" type="tel" name="telephone" placeholder="255710020090"
                                     autoComplete="tel"
                                     className={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.phone ? "border-red-500" : "border-sky-500"}`}
                                     defaultValue={row.phone}
                                     {...register("phone")}
                              />
                              <span className="text-red-500 text-sm">{errors.phone?.message}</span>

                              <label htmlFor="province"
                                     className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Province</label>
                              <select id="province" type="tel" name="telephone" placeholder="255710020090"
                                      autoComplete="tel"
                                      className={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.phone ? "border-red-500" : "border-sky-500"}`}
                                      defaultValue={""}
                                      {...register("province")}
                              >
                                  {/*<option value="" disabled>Select province</option>*/}
                                  <option value={row.constituent?.constituentName || ""}>{row.constituent?.constituentName || ""}</option>

                              </select>
                              <span className="text-red-500 text-sm">{errors.province?.message}</span>

                              <div className="my-2">
                                  <label htmlFor="nida"
                                         className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Nida</label>
                                  <input id="nida" type="nida" name="nida" placeholder="19912710-02009-0000-124"
                                         autoComplete="nida"
                                         className={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.phone ? "border-red-500" : "border-sky-500"}`}
                                         defaultValue={""}
                                         {...register("nida")}
                                  />
                                  <span className="text-red-500 text-sm">{errors.nida?.message}</span>

                                  {/* Add/Edit Button (for demonstration) */}
                              </div>
                              <div className="flex w-full my-1.5">
                                  <button onClick={loginClicked} disabled={!isValid || !isDirty}
                                          className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">

                                      {
                                          btnClicked && (
                                              <div className="w-12 h-12 border-4 border-white rounded-full loader"></div>
                                          )
                                      }
                                      {
                                          !btnClicked && (
                                              <div className='bn1' style={{display: 'flex'}}>
                                                  <span className="mr-2 uppercase">Submit</span>
                                                  <span>
                      <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round"
                           stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </span>
                                              </div>

                                          )
                                      }

                                  </button>
                              </div>
                          </form>
                      </>
                  )
                  :
                  <>
                      <div>Loading</div>
                  </>
          }
      </div>
              </div>
              </div>
              <Footer/>
          </div>
              </div>
    </div>


  );
};

export default UserProfile;
