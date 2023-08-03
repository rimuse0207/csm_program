import { createAsyncAction, createReducer } from 'typesafe-actions';
import { request } from '../../../APIs';
import moment from "moment";

const CSM_REGI_DATA_GET_START = 'CSM_REGI_DATA_GET_START';
const CSM_REGI_DATA_GET_SUCCESS = 'CSM_REGI_DATA_GET_SUCCESS';
const CSM_REGI_DATA_GET_ERROR = 'CSM_REGI_DATA_GET_ERROR';

const CSM_REGI_DATA_CHANGE_CHECKED = 'CSM_REGI_DATA_CHANGE_CHECKED';



const Csm_Basic_Data_Async = createAsyncAction(
    CSM_REGI_DATA_GET_START,
    CSM_REGI_DATA_GET_SUCCESS,
    CSM_REGI_DATA_GET_ERROR
)();

const Csm_Register_Data_Getting_Axios = async (Now_Page, Filter_Data,Csm_Invoice_Select_State) => {
    try {
       
        const Csm_Regi_Data = await request.post(`/CE_Calendar_app_server/Get_Select_User_Data`, {
               Now_Page, Filter_Data,Csm_Invoice_Select_State
            });
        
        if (Csm_Regi_Data.data.dataSuccess) {
              const Change_Data = Csm_Regi_Data.data.User_Data.map((list) => {
                  return Csm_Invoice_Select_State?.some((item) => item?.Main_Data.csm_basic_data_csm_key === list?.Main_Data.csm_basic_data_csm_key) ? {
                      ...list, Main_Data: {
                          ...list.Main_Data,
                          checked:true
                }}:list
              })
           
            return Change_Data
        } else {
            return false;
        }

    
    } catch (error) {
        console.log(error);
        return error;
    }
};



export function Csm_Register_Data_Reduce_Thunk(
    Now_Page,
    Filter_Data,
    Csm_Invoice_Select_State
) {
    return async dispatch => {
        const { request, success, failure } = Csm_Basic_Data_Async;
        dispatch(request());
        try {
            const userProfile = await Csm_Register_Data_Getting_Axios( Now_Page,Filter_Data,Csm_Invoice_Select_State);
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

export const Csm_Register_Data_Change_Checked = (data) =>({
    type: CSM_REGI_DATA_CHANGE_CHECKED,
    payload: data,
});



const initialState = {
    Csm_Register_Data_State: {
        loading: false,
        error: null,
        Regi_Csm_Data: [],
    },
};

const Csm_Register_Data_Getting = createReducer(initialState, {
    [CSM_REGI_DATA_GET_START]: state => ({
        ...state,
        Csm_Register_Data_State: {
            loading: true,
            error: null,
            Regi_Csm_Data: [],
        },
    }),
    [CSM_REGI_DATA_GET_SUCCESS]: (state, action) => ({
        ...state,
        Csm_Register_Data_State: {
            loading: false,
            error: null,
            Regi_Csm_Data: action.payload,
            
        },
    }),
    [CSM_REGI_DATA_GET_ERROR]: (state, action) => ({
        ...state,
        Csm_Register_Data_State: {
            loading: false,
            error: action.payload,
            Regi_Csm_Data: [],
            
        },
    }),
    [CSM_REGI_DATA_CHANGE_CHECKED]: (state, action) => ({
        ...state,
        Csm_Register_Data_State: {
            ...state.Csm_Basic_Data_State,
            Regi_Csm_Data:action.payload,
        }
    })
  
});

export default Csm_Register_Data_Getting;
