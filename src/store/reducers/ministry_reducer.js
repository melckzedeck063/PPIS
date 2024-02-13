import {createSlice} from "@reduxjs/toolkit";
import {
    assignMinister,
    createMinistry, dashboardSummary,
    deleteMinistry,
    getAllMinstries,
    getMinistryById
} from "../actions/ministry_actions";


export const ministrySlice =  createSlice({
    name : "ministries",
    initialState : {
        current_ministry : null,
        ministries : [],
        dashboard_data : [],
        new_ministry : null,
        status : null,
        message : "",
        error  : false
    },
    reducers : {
        newMinistry : (state, action) => {
            state.new_ministry.push(action.payload);
        },
        getMinistries : (state,action) => {
            state.ministries.push(action.payload);
        },
        getMinistry : (state,action) => {
            state.current_ministry.push(action.payload);
        }
    },

    extraReducers(builder) {
        builder

            .addCase(createMinistry.pending, (state,action) => {
                state.status = "Processing";
            })
            .addCase(createMinistry.fulfilled, (state, action) => {
                state.status = "Successful";
                state.new_ministry = action.payload;
                state.message = "Successful";
                state.error  = false;
            })
            .addCase(createMinistry.rejected, (state, action) => {
                state.status= "Request failed";
                state.error = true;
                state.message  = "Failed"
            })

            .addCase(getAllMinstries.pending, (state, action) => {
                state.status = "Loading"
            })
            .addCase(getAllMinstries.fulfilled, (state, action) => {
                state.status = "Successful";
                state.ministries = action.payload;
                state.error = false;
                state.message = "Data  found"
            })
            .addCase(getAllMinstries.rejected , (state,action) => {
                state.status = "Request failed";
                state.error  = true;
                state.message = "Failed"
            })

            .addCase(assignMinister.pending, (state, action) => {
                state.status = "Processing";
            })
            .addCase(assignMinister.fulfilled, (state,action) => {
                state.status= "Successful";
                state.current_ministry = action.payload;
                state.error = false;
                state.message = "Assigned successfully";
            })
            .addCase(assignMinister.rejected, (state, action) => {
                state.status = "Failed";
                state.error = true;
                state.message = "Request failed";
            })
            .addCase(getMinistryById.pending, (state, action) => {
                state.status = "Loading";
            })
            .addCase(getMinistryById.fulfilled, (state, action) => {
                state.status = "Successful";
                state.current_ministry = action.payload;
                state.error = false;
                state.message  = "Data found";
            })
            .addCase(getMinistryById.rejected, (state, action) => {
                state.status = "Failed";
                state.error = false;
                state.message = "Request failed";
            })

            .addCase(deleteMinistry.pending, (state, action) => {
                state.status = "Processing";
            })
            .addCase(deleteMinistry.fulfilled, (state, action) => {
                state.status = "Successful";
                state.current_ministry = action.payload;
                state.error = false;
                state.message = "Ministry deleted";
            })
            .addCase(deleteMinistry.rejected, (state, action) => {
                state.status = "Failed";
                state.error = true;
                state.message = "Request failed";
            })

            .addCase(dashboardSummary.pending, (state, action) => {
                state.status = "Processing";
            })
            .addCase(dashboardSummary.fulfilled, (state, action) => {
                state.status = "Successful";
                state.dashboard_data = action.payload;
                state.error = false;
                state.message = "Ministry deleted";
            })
            .addCase(dashboardSummary.rejected, (state, action) => {
                state.status = "Failed";
                state.error = true;
                state.message = "Request failed";
            })
    }

})

export const { newMinistry, getMinistries, getMinistry }  = ministrySlice.actions;

export default  ministrySlice.reducer;