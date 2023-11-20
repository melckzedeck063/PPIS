import { createSlice } from "@reduxjs/toolkit";
import { getMyConcerns, sendConcern } from "../actions/concern_actions";

const concernSlice = createSlice({
    name: "concerns",
    initialState: {
        new_concern: [], // Change this to an array
        all_concern: [],
        my_concerns: null,
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
            });
    },
});

export const { my_concerns, all_concern, new_concern } = concernSlice.actions;
export default concernSlice.reducer;
