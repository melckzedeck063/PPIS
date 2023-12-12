
import { configureStore } from '@reduxjs/toolkit';

// import request from './reducers/request_reducer';
// import dependant from './reducers/dependant_reducer';

import users from './reducers/user_reducers';
import concerns from './reducers/conern_reducers';
import notifications from './reducers/notifications_reducer';

export default configureStore({

    reducer : {
        users,
        concerns,
        notifications
        
    }
})