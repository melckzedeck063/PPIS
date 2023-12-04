import { createSlice } from "@reduxjs/toolkit";
import { assignConcern, fowardConcern, getAllCAtegories, getConcernById, getMyConcerns, getSubmittedByMe, sendConcern } from "../actions/concern_actions";

const concernSlice = createSlice({
    name: "concerns",
    initialState: {
        new_concern: [], // Change this to an array
        all_concern: [],
        my_concerns: null,
        all_categories :  [],
       current_concern : null,
        error: null,
        message: "",
        status: "",
    },
    reducers: {
        all_concern: (state, action) => {
            state.all_concern.push(action.payload);
        },

        my_concerns: (state, action) => {
            state.my_concerns.push(action.payload);
        },
        new_concern: (state, action) => {
            state.new_concern.push(action.payload);
        },
        all_categories : (state,action) => {
            state.all_categories.push(action.payload);
        }
    },
    extraReducers(builder) {
        builder
            .addCase(sendConcern.pending, (state, action) => {
                state.status = "Pending";
            })
            .addCase(sendConcern.fulfilled, (state, action) => {
                state.status = "Successful";
                state.new_concern = action.payload;
                state.message = "New concern sent successfully";
            })
            .addCase(sendConcern.rejected, (state, action) => {
                state.status = "Failed";
                state.error = action.error.message;
                state.message = "Request failed, try again";
            })

            .addCase(getMyConcerns.pending, (state, action) => {
                state.status = "Pending";
            })
            .addCase(getMyConcerns.fulfilled, (state, action) => {
                state.status = "Successful";
                state.my_concerns = action.payload;
                state.message = "Concerns found successfully";
            })
            .addCase(getMyConcerns.rejected, (state, action) => {
                state.status = "Failed";
                state.error = action.error.message;
                state.message = "Request failed, try again";
            })


            // CATEGORY SECTION 

            .addCase(getAllCAtegories.pending, (state,action) => {
                state.status = "Pending";
            })
            .addCase(getAllCAtegories.fulfilled, (state,action) => {
                state.status = "Succesfull";
                state.all_categories = action.payload;
                state.message  = "Categories data found succesfully";
            })
            .addCase(getAllCAtegories.rejected, (state,action)  => {
                state.status = "Failed";
                state.error  = action.error.message
            })

            .addCase(getSubmittedByMe.pending, (state,action) => {
                state.status = "Pending";
            })
            .addCase(getSubmittedByMe.fulfilled, (state,action) => {
                state.status = "Succesfull";
                state.my_concerns = action.payload;
                state.message = "Concerns data found succesfully";
            })
            .addCase(getSubmittedByMe.rejected,  (state,action) => {
                state.status = "Failed";
                state.message =  action.error.message;
            })
            

            .addCase(getConcernById.pending, (state,action) => {
                state.status = "Pending";
            })
            .addCase(getConcernById.fulfilled, (state,action) => {
                state.status = "Succesfull";
                state.current_concern = action.payload;
                state.message = "Concern  data  found succesfull";
            })
            .addCase(getConcernById.rejected, (state,action) => {
                state.status= "Failed";
                state.message = action.error.message;
            })

            .addCase(assignConcern.pending, (state,action) => {
                state.status = "Pending";
            })
            .addCase(assignConcern.fulfilled, (state,action) => {
                state.status = "Succesfull";
                state.current_concern = action.payload;
                state.message = "Concern  assigned succesfull";
            })
            .addCase(assignConcern.rejected, (state,action) => {
                state.status= "Failed";
                state.message = action.error.message;
            })

            .addCase(fowardConcern.pending, (state,action) => {
                state.status = "Pending";
            })
            .addCase(fowardConcern.fulfilled, (state,action) => {
                state.status = "Succesfull";
                state.current_concern = action.payload;
                state.message = "Concern fowarded succesfull";
            })
            .addCase(fowardConcern.rejected, (state,action) => {
                state.status= "Failed";
                state.message = action.error.message;
            })
          
    },
});

export const { my_concerns, all_concern, new_concern,all_categories } = concernSlice.actions;
export default concernSlice.reducer;
