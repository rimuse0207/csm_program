import { createAsyncAction, createReducer } from 'typesafe-actions';
import { request } from '../../../APIs';
import { useSelector } from 'react-redux';


const CSM_BASIC_DATA_GET_START = 'CSM_BASIC_DATA_GET_START';
const CSM_BASIC_DATA_GET_SUCCESS = 'CSM_BASIC_DATA_GET_SUCCESS';
const CSM_BASIC_DATA_GET_ERROR = 'CSM_BASIC_DATA_GET_ERROR';

const CSM_BASIC_DATA_CHANGE_CHECKED = 'CSM_BASIC_DATA_CHANGE_CHECKED';



const Csm_Basic_Data_Async = createAsyncAction(
    CSM_BASIC_DATA_GET_START,
    CSM_BASIC_DATA_GET_SUCCESS,
    CSM_BASIC_DATA_GET_ERROR
)();

const Csm_Basic_Data_Getting_Axios = async (Now_Page, Filter_Data,CsmSelectState) => {
    try {
       
        const Csm_Basic_Data = await request.post(`/CE_Calendar_app_server/tesdt`, {
           Now_Page, Filter_Data,CsmSelectState
        });
        if (Csm_Basic_Data.data.dataSuccess && Csm_Basic_Data.data) {
            
        // 선택 데이터 확인
          const GettingData = Csm_Basic_Data.data.test_Rows;
            const Change_Data = GettingData.map((list) => {
                return CsmSelectState.some((item) => item.csm_basic_data_csm_key === list.csm_basic_data_csm_key ) ? {...list,checked:true}:list
            })
            
            return {
                   test_Rows: Change_Data,
                   Totla_Rows:Csm_Basic_Data.data.Totla_Rows,
            }
        } else {
            return false;
        }

    
    } catch (error) {
        console.log(error);
        return error;
    }
};



export function Csm_Baisc_Data_Reduce_Thunk(
    Now_Page,
    Filter_Data,
    CsmSelectState
) {
    return async dispatch => {
        const { request, success, failure } = Csm_Basic_Data_Async;
        dispatch(request());
        try {
            const userProfile = await Csm_Basic_Data_Getting_Axios( Now_Page,Filter_Data,CsmSelectState);
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

export const Csm_Basic_Data_Change_Checked = (data) =>({
    type: CSM_BASIC_DATA_CHANGE_CHECKED,
    payload: data,
});



const initialState = {
    Csm_Basic_Data_State: {
        loading: false,
        error: null,
        Csm_Data: [],
        All_Count:0,
    },
};

const Csm_Basic_Data_Getting = createReducer(initialState, {
    [CSM_BASIC_DATA_GET_START]: state => ({
        ...state,
        Csm_Basic_Data_State: {
            ...state.Csm_Basic_Data_State,
                loading: true,      
        },
    }),
    [CSM_BASIC_DATA_GET_SUCCESS]: (state, action) => ({
        ...state,
        Csm_Basic_Data_State: {
            loading: false,
            error: null,
            Csm_Data: action.payload.test_Rows,
            All_Count:action.payload.Totla_Rows,
            
        },
    }),
    [CSM_BASIC_DATA_GET_ERROR]: (state, action) => ({
        ...state,
        Csm_Basic_Data_State: {
            loading: false,
            error: action.payload,
            Csm_Data: [],
            All_Count:0,
        },
    }),
    [CSM_BASIC_DATA_CHANGE_CHECKED]: (state, action) => ({
        ...state,
        Csm_Basic_Data_State: {
            ...state.Csm_Basic_Data_State,
            Csm_Data:action.payload,
        }
    })
  
});

export default Csm_Basic_Data_Getting;
