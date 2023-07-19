import { createAsyncAction, createReducer } from 'typesafe-actions';
import { request } from '../../../APIs';
import moment from "moment";

const CSM_GRADE_DATA_GET_START = 'CSM_GRADE_DATA_GET_START';
const CSM_GRADE_DATA_GET_SUCCESS = 'CSM_GRADE_DATA_GET_SUCCESS';
const CSM_GRADE_DATA_GET_ERROR = 'CSM_GRADE_DATA_GET_ERROR';



const Csm_Grade_Data_Async = createAsyncAction(
    CSM_GRADE_DATA_GET_START,
    CSM_GRADE_DATA_GET_SUCCESS,
    CSM_GRADE_DATA_GET_ERROR
)();

const Csm_Grade_Count_Data_Getting_Axios = async () => {
    try {
       
        const Csm_Regi_Data = await request.get(`/CE_Calendar_app_server/Csm_Grade_Count_Data_Getting`);
        
        if (Csm_Regi_Data.data.dataSuccess) {
           
            return Csm_Regi_Data.data
        } else {
            return false;
        }

    
    } catch (error) {
        console.log(error);
        return error;
    }
};



export function Csm_Grade_Data_Reduce_Thunk(
   
) {
    return async dispatch => {
        const { request, success, failure } = Csm_Grade_Data_Async;
        dispatch(request());
        try {
            const userProfile = await Csm_Grade_Count_Data_Getting_Axios();
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
    Csm_Grade_Count_Data_State: {
        loading: false,
        error: null,
        All_Grade_Count_Data: [],
        Grinder_Grade_Count_Data: [],
        Laser_Grade_Count_Data: [],
        Dicer_Grade_Count_Data: [],
    },
};

const Csm_Grade_Data_Reducer = createReducer(initialState, {
    [CSM_GRADE_DATA_GET_START]: state => ({
        ...state,
        Csm_Grade_Count_Data_State: {
            loading: true,
            error: null,
               All_Grade_Count_Data: [],
                Grinder_Grade_Count_Data: [],
                Laser_Grade_Count_Data: [],
                Dicer_Grade_Count_Data: [],
        },
    }),
    [CSM_GRADE_DATA_GET_SUCCESS]: (state, action) => ({
        ...state,
        Csm_Grade_Count_Data_State: {
            loading: false,
            error: null,
                All_Grade_Count_Data: action.payload.All_Grade_Count_Data_Rows,
                Grinder_Grade_Count_Data: action.payload.Grinder_Grade_Count_Data_Rows,
                Laser_Grade_Count_Data: action.payload.Laser_Grade_Count_Data_Rows,
                Dicer_Grade_Count_Data: action.payload.Dicer_Grade_Count_Data_Rows,
        },
    }),
    [CSM_GRADE_DATA_GET_ERROR]: (state, action) => ({
        ...state,
        Csm_Grade_Count_Data_State: {
            loading: false,
            error: action.payload,
              All_Grade_Count_Data: [],
                Grinder_Grade_Count_Data: [],
                Laser_Grade_Count_Data: [],
                Dicer_Grade_Count_Data: [],
            
        },
    }),
   
  
});

export default Csm_Grade_Data_Reducer;
