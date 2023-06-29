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
       
        const Csm_Regi_Data = await request.get(`/CE_Calendar_app_server/Get_Select_User_Data`, {
                params: {
                   csm_basic_data_state:Filter_Data.csm_basic_data_state==="All" ? "":Filter_Data.csm_basic_data_state,
                    csm_basic_data_grade: Filter_Data.csm_basic_data_grade === "All" ? "" : Filter_Data.csm_basic_data_grade,
                    csm_basic_data_csm_number:Filter_Data.csm_basic_data_csm_number,
                    csm_basic_data_model_number:Filter_Data.csm_basic_data_model_number,
                    csm_basic_data_binds:Filter_Data.csm_basic_data_binds,
                    csm_basic_data_custom:Filter_Data.csm_basic_data_custom,
                    csm_basic_data_part_number:Filter_Data.csm_basic_data_part_number,
                    csm_user_input_data_writer_id:Filter_Data.csm_user_input_data_writer_id,
                    csm_user_input_start_date:moment(Filter_Data.csm_user_input_start_date).format("YYYY-MM-DD"),
                    csm_user_input_end_date: moment(Filter_Data.csm_user_input_end_date).format("YYYY-MM-DD"),
                    csm_calendar_publish:Filter_Data.csm_calendar_publish,
                    csm_calendar_apply:Filter_Data.csm_calendar_apply,
                    csm_calendar_entering:Filter_Data.csm_calendar_entering,
                    csm_calendar_ce:Filter_Data.csm_calendar_ce,
                    csm_calendar_custom:Filter_Data.csm_calendar_custom,
                    csm_calendar_pay:Filter_Data.csm_calendar_pay,
                    csm_calendar_finall: Filter_Data.csm_calendar_finall,
                    cms_calendar_all:Filter_Data.cms_calendar_all,
                }
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
