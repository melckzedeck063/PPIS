import { createSlice } from "@reduxjs/toolkit";

import {
    getAllConstituency,
    signInUser,
    signUpUser,
    g,
    getAllConstituencyetAllStaffs,
    getAllStaffs,
    registerUser,
    activateAccount,
    deleteUser, getAllAssistants
} from "../actions/users_actions";
// import {  getAllConstituency, getAllStaffs, getUserById, myProfile, signInUser, signUpUser, updateMe, updateUser } from "../actions/user_actions";


export const userSlice = createSlice({
    name: "users",
    initialState : {
        loged_user : null,
        current_user :  null,
        user_profile : null,
        new_user : null,
        activate_account :  null,
        users : [],
        staffs : [],
        assistants : [],
        constituencies : [],
        status :  '',
        error  :  false,
        message : ""
    },

    reducers : {
        all_users : (state,action) =>{
            state.users.push(action.payload)
        },
        create_user : (state, action) => {
            state.current_user.push(action.payload)
        },
        signIn : (state,action) => {
            state.loged_user.push(action.payload)
        },
        constituencies : (state,action) => {
            state.constituencies.push(action.payload);
        }
    },
    extraReducers (builder){
        builder
        .addCase(signInUser.pending,(state,action) => {
            state.status = "Loading"
        })
        .addCase(signInUser.fulfilled, (state,action) => {
            state.status = "Successfull";
            state.message = action.payload;
            state.loged_user = action.payload;
            state.error  = false;
        })
        .addCase(signInUser.rejected, (state,action) => {
            state.status = "Failed";
            state.message = "Invalid  login credentials";
            state.error = true;
        })
        .addCase(signUpUser.pending,(state,action) => {
            state.status = "Loading"
        })
        .addCase(signUpUser.fulfilled, (state,action) => {
            state.status = "Successfull";
            state.message = "New account created  succesfully ";
            state.new_user = action.payload;
            state.error = false;
        })
        .addCase(signUpUser.rejected, (state,action) => {
            state.status = "Failed";
            state.message = "Request  failed please try again";
            state.error = true
        })

        .addCase(registerUser.pending,(state,action) => {
            state.status = "Loading"
        })
        .addCase(registerUser.fulfilled, (state,action) => {
            state.status = "Successfull";
            state.message = "New account user succesfully ";
            state.new_user = action.payload
        })
        .addCase(registerUser.rejected, (state,action) => {
            state.status = "Failed";
            state.message = "Request  failed please try again";
            state.error = true
        })
        .addCase(getAllStaffs.pending,(state,action) => {
            state.status = "Loading"
        })
        .addCase(getAllStaffs.fulfilled, (state,action) => {
            state.status = "Successfull";
            state.message = "User data found succesfully ";
            state.staffs = action.payload
        })
        .addCase(getAllStaffs.rejected, (state,action) => {
            state.status = "Failed";
            state.message = "Request  failed please try again";
            state.error = true
        })
            .addCase(getAllAssistants.pending,(state,action) => {
                state.status = "Loading"
            })
            .addCase(getAllAssistants.fulfilled, (state,action) => {
                state.status = "Successfull";
                state.message = "User data found succesfully ";
                state.assistants = action.payload
            })
            .addCase(getAllAssistants.rejected, (state,action) => {
                state.status = "Failed";
                state.message = "Request  failed please try again";
                state.error = true
            })
        .addCase(getAllConstituency.pending,(state,action) => {
            state.status = "Loading"
        })
        .addCase(getAllConstituency.fulfilled, (state,action) => {
            state.status = "Successfull";
            state.message = "Constintuecy data found succesfully ";
            state.constituencies = action.payload;
        })
        .addCase(getAllConstituency.rejected, (state,action) => {
            state.status = "Failed";
            state.message = "Request  failed please try again";
            state.error = true;
        })
        .addCase(activateAccount.pending,(state,action) => {
            state.status = "Loading"
        })
        .addCase(activateAccount.fulfilled, (state,action) => {
            state.status = "Successfull";
            state.message = "Account activated succesfully ";
            state.activate_account = action.payload
        })
        .addCase(activateAccount.rejected, (state,action) => {
            state.status = "Failed";
            state.message = "Request  failed please try again";
            state.error = true
        })

            .addCase(deleteUser.pending, (state,action) => {
                state.status = "Processing";
            })
            .addCase(deleteUser.fulfilled, (state,action) => {
                state.status = "Successful";
                state.current_user =  action.payload;
                state.error  = false;
                state.message = "User deleted successful";
            })
            .addCase(deleteUser.rejected, (state,action) => {
                state.status = "Failed";
                state.error =  true;
                state.message = "Request failed";
            })

        .addMatcher(
            (action) => action.type.endsWith("/fulfilled"),
            (state, action) => {
              // Make sure to check if action.payload is defined before accessing it
              state.message = action.payload ? action.payload : "";
            }
          );
        // .addCase(updateUser.pending,(state,action) => {
        //     state.status = "Loading"
        // })
        // .addCase(updateUser.fulfilled, (state,action) => {
        //     state.status = "Successfull";
        //     state.message = "New account created  succesfully ";
        //     state.current_user = action.payload
        // })
        // .addCase(updateUser.rejected, (state,action) => {
        //     state.status = "Failed";
        //     state.message = "Request  failed please try again";
        //     state.error = action.error.message
        // })
        // .addCase(myProfile.pending,(state,action) => {
        //     state.status = "Loading"
        // })
        // .addCase(myProfile.fulfilled, (state,action) => {
        //     state.status = "Successfull";
        //     state.message = "New account created  succesfully ";
        //     state.user_profile = action.payload
        // })
        // .addCase(myProfile.rejected, (state,action) => {
        //     state.status = "Failed";
        //     state.message = "Request  failed please try again";
        //     state.error = action.error.message
        // })
        // .addCase(updateMe.pending,(state,action) => {
        //     state.status = "Loading"
        // })
        // .addCase(updateMe.fulfilled, (state,action) => {
        //     state.status = "Successfull";
        //     state.message = "New account created  succesfully ";
        //     state.user_profile = action.payload
        // })
        // .addCase(updateMe.rejected, (state,action) => {
        //     state.status = "Failed";
        //     state.message = "Request  failed please try again";
        //     state.error = action.error.message
        // })
    }
})


export const {signIn, create_user, all_users, constituencies} =  userSlice.actions;
export default userSlice.reducer;