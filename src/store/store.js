
import { configureStore } from '@reduxjs/toolkit';

// import request from './reducers/request_reducer';
// import dependant from './reducers/dependant_reducer';

import users from './reducers/user_reducers';

export default configureStore({

    reducer : {
        users
        // request,
        // dependant
        
    }
})