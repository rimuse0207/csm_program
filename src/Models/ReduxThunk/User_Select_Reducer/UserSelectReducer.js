import { action, createAsyncAction, createReducer } from 'typesafe-actions';
import { request } from '../../../APIs';
import moment from "moment";

const USER_SELECT_DATA_GET_START = 'USER_SELECT_DATA_GET_START';
const USER_SELECT_DATA_GET_SUCCESS = 'USER_SELECT_DATA_GET_SUCCESS';
const USER_SELECT_DATA_GET_ERROR = 'USER_SELECT_DATA_GET_ERROR';


const User_Select_Data_Async = createAsyncAction(
    USER_SELECT_DATA_GET_START,
    USER_SELECT_DATA_GET_SUCCESS,
    USER_SELECT_DATA_GET_ERROR
)();

const User_Select_Data_Getting= async () => {
    try {
       
        const User_Select_Data_Getting_Axios = await request.get(`/CE_Calendar_app_server/User_Select_Data_Getting`);
        
        if (User_Select_Data_Getting_Axios.data.dataSuccess) {
            return User_Select_Data_Getting_Axios.data.User_Options
        }
        else {
            return false;
        }
       
                
    
    } catch (error) {
        console.log(error);
        return error;
    }
};



export function User_Select_Data_Reduce_Thunk() {
    return async dispatch => {
        const { request, success, failure } = User_Select_Data_Async;
        dispatch(request());
        try {
            const userProfile = await User_Select_Data_Getting();
            if (userProfile) {
                dispatch(success(userProfile));
            } else {
                dispatch(failure("서버와의 연결 끊김"));    
            }
        } catch (e) {
            dispatch(failure(e));
        }
    };
}



const initialState = {
    User_Data: {
        loading: false,
        error: null,
        User_Select_Options:[],
    },
};

const User_Select_Data_Getting_Reducer = createReducer(initialState, {
    [USER_SELECT_DATA_GET_START]: state => ({
        ...state,
        User_Data: {
            loading: true,
            error: null,
            User_Select_Options: [],
        },
    }),
    [USER_SELECT_DATA_GET_SUCCESS]: (state,action) => ({
        ...state,
        User_Data: {
            loading: false,
            error: null,
            User_Select_Options: action.payload,
        },
    }),
    [USER_SELECT_DATA_GET_ERROR]: (state, action) => ({
        ...state,
        User_Data: {
            loading: false,
            error: action.payload,
            User_Select_Options: [],
        },
    }),
   
  
});

export default User_Select_Data_Getting_Reducer;
