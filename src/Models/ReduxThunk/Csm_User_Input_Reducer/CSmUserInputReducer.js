import { createAsyncAction } from "typesafe-actions";
import { request } from "../../../APIs";

const CSM_USER_INPUT_REDUCER_CHANGE_DATA = 'CSM_USER_INPUT_REDUCER_CHANGE_DATA';
const CSM_USER_INPUT_REDUCER_RESET_DATA = 'CSM_USER_INPUT_REDUCER_RESET_DATA';

const CSM_USER_INPUT_HOTEL_CHANGE_DATA = 'CSM_USER_INPUT_HOTEL_CHANGE_DATA'


const CSM_USER_INPUT_REDUCER_CHANGE_CUSTOM_DATA_START = 'CSM_USER_INPUT_REDUCER_CHANGE_CUSTOM_DATA_START'
const CSM_USER_INPUT_REDUCER_CHANGE_CUSTOM_DATA_SUCCESS = 'CSM_USER_INPUT_REDUCER_CHANGE_CUSTOM_DATA_SUCCESS'
const CSM_USER_INPUT_REDUCER_CHANGE_CUSTOM_DATA_ERROR = 'CSM_USER_INPUT_REDUCER_CHANGE_CUSTOM_DATA_ERROR'

const CSM_USER_INPUT_REDUCER_CHANGE_CSM_NUMBER_DATA_START = 'CSM_USER_INPUT_REDUCER_CHANGE_CSM_NUMBER_DATA_START'
const CSM_USER_INPUT_REDUCER_CHANGE_CSM_NUMBER_DATA_SUCCESS = 'CSM_USER_INPUT_REDUCER_CHANGE_CSM_NUMBER_DATA_SUCCESS'
const CSM_USER_INPUT_REDUCER_CHANGE_CSM_NUMBER_DATA_ERROR = 'CSM_USER_INPUT_REDUCER_CHANGE_CSM_NUMBER_DATA_ERROR'

const CSM_USER_INPUT_REDUCER_CHANGE_MODEL_NUMBER_DATA_START = 'CSM_USER_INPUT_REDUCER_CHANGE_MODEL_NUMBER_DATA_START'
const CSM_USER_INPUT_REDUCER_CHANGE_MODEL_NUMBER_DATA_SUCCESS = 'CSM_USER_INPUT_REDUCER_CHANGE_MODEL_NUMBER_DATA_SUCCESS'
const CSM_USER_INPUT_REDUCER_CHANGE_MODEL_NUMBER_DATA_ERROR = 'CSM_USER_INPUT_REDUCER_CHANGE_MODEL_NUMBER_DATA_ERROR'

const CSM_USER_INPUT_REDUCER_CHANGE_BIND_DATA_START = 'CSM_USER_INPUT_REDUCER_CHANGE_BIND_DATA_START'
const CSM_USER_INPUT_REDUCER_CHANGE_BIND_DATA_SUCCESS = 'CSM_USER_INPUT_REDUCER_CHANGE_BIND_DATA_SUCCESS'
const CSM_USER_INPUT_REDUCER_CHANGE_BIND_DATA_ERROR = 'CSM_USER_INPUT_REDUCER_CHANGE_BIND_DATA_ERROR'

const CSM_USER_INPUT_REDUCER_CHANGE_BIND_DATA_CHANGE = 'CSM_USER_INPUT_REDUCER_CHANGE_BIND_DATA_CHANGE'

const Csm_User_Input_Change_Custom_Data_Async = createAsyncAction(
    CSM_USER_INPUT_REDUCER_CHANGE_CUSTOM_DATA_START,
    CSM_USER_INPUT_REDUCER_CHANGE_CUSTOM_DATA_SUCCESS,
    CSM_USER_INPUT_REDUCER_CHANGE_CUSTOM_DATA_ERROR,
)();

const Csm_User_Input_Change_Csm_Number_Data_Async = createAsyncAction(
    CSM_USER_INPUT_REDUCER_CHANGE_CSM_NUMBER_DATA_START,
    CSM_USER_INPUT_REDUCER_CHANGE_CSM_NUMBER_DATA_SUCCESS,
    CSM_USER_INPUT_REDUCER_CHANGE_CSM_NUMBER_DATA_ERROR
)();

const Csm_User_Input_Change_Model_Number_Data_Async = createAsyncAction(
    CSM_USER_INPUT_REDUCER_CHANGE_MODEL_NUMBER_DATA_START,
    CSM_USER_INPUT_REDUCER_CHANGE_MODEL_NUMBER_DATA_SUCCESS,
    CSM_USER_INPUT_REDUCER_CHANGE_MODEL_NUMBER_DATA_ERROR
)();

const Csm_User_Input_Change_Bind_Data_Async = createAsyncAction(
    CSM_USER_INPUT_REDUCER_CHANGE_BIND_DATA_START,
    CSM_USER_INPUT_REDUCER_CHANGE_BIND_DATA_SUCCESS,
    CSM_USER_INPUT_REDUCER_CHANGE_BIND_DATA_ERROR
)();



const initState = {
    Csm_User_Input_Data: {
        start_Date: new Date(),
        end_Date:new Date(),
        lodgment_checked: "one_day",
        lodgment_day_count:1,
        location_checked: "Pangyo",
        Round_Trip_Count : 1,
        custom: {
         custom_options:[],
         custom_checked: {
            value: "",
            label: '',
            },
            custom_loading: false,
            custom_error: null,
        },
        csm_number: {
             csm_number_options:[],
        csm_number_checked: {
            value: "",
            label:""
            },
            csm_number_loading: false,
        csm_number_error:null,
       },
       
        model_number: {
              model_number_options:[],
             model_number_checked: {
                 value: "",
                 label:"",
            },      
            model_number_loading: false,
             model_number_error:null,
        },
        bind: {
        bind_options:[],
        bind_checked: {
            value: "",
            label:""
            },
            bind_loading: false,
            bind_error:false,
      }
        
    }
};

export const Csm_User_Input_Change_Data = data => ({
    type: CSM_USER_INPUT_REDUCER_CHANGE_DATA,
    payload: data,
});

/// 고객사 조회
const Csm_User_Input_Change_Custom_Data_Axios = async (location) => {
     try {
       
        const Custom_Data_Axios = await request.get(`/CE_Calendar_app_server/Csm_Distance_Info_Data`, {
            params:{
               location
           }
        });
        
        if (Custom_Data_Axios.data.dataSuccess) {
           
            return Custom_Data_Axios.data.csm_distance_lists_data
        } else {
            return false;
        }

    
    } catch (error) {
        console.log(error);
        return error;
    }
}

export function Csm_User_Input_Change_Custom_Data_Redux_Thunk(
    location
) {
    return async dispatch => {
        const { request, success, failure } = Csm_User_Input_Change_Custom_Data_Async;
        dispatch(request());
        try {
            const Csm_User_Input_Change_Custom_Data = await Csm_User_Input_Change_Custom_Data_Axios(location);
            if (Csm_User_Input_Change_Custom_Data) {
                console.log(Csm_User_Input_Change_Custom_Data)
                dispatch(success(Csm_User_Input_Change_Custom_Data));
            } else {
                dispatch(failure("서버와의 연결 끊김"));    
            }
        } catch (e) {
            dispatch(failure(e));
        }
    };
}

// CSM번호 조회

const Csm_User_Input_Change_Csm_Number_Data_Axios = async (location) => {
     try {
       
        const Csm_Number_Data_Axios = await request.get(`/CE_Calendar_app_server/Csm_Distance_Info_Data`);
        
        if (Csm_Number_Data_Axios.data.dataSuccess) {
           
            return Csm_Number_Data_Axios.data.setCsm_csmNumber_lists_data
        } else {
            return false;
        }

    
    } catch (error) {
        console.log(error);
        return error;
    }
}

export function Csm_User_Input_Change_Csm_Number_Data_Redux_Thunk(
    
) {
    return async dispatch => {
        const { request, success, failure } = Csm_User_Input_Change_Csm_Number_Data_Async;
        dispatch(request());
        try {
            const Csm_User_Input_Change_Csm_Number_Data = await Csm_User_Input_Change_Csm_Number_Data_Axios();
            if (Csm_User_Input_Change_Csm_Number_Data) {
                dispatch(success(Csm_User_Input_Change_Csm_Number_Data));
            } else {
                dispatch(failure("서버와의 연결 끊김"));    
            }
        } catch (e) {
            dispatch(failure(e));
        }
    };
}


// CSM번호 조회

const Csm_User_Input_Change_Model_Number_Data_Axios = async (csm_number) => {
     try {
       
         const Model_Number_Data_Axios = await request.get(`/CE_Calendar_app_server/Csm_Distance_Info_Data_EquitMentModel`, {
             params: {
                csm_number
            }
        });
        
        if (Model_Number_Data_Axios.data.dataSuccess) {
           
            return Model_Number_Data_Axios.data.setCsm_equitModel_lists_data
        } else {
            return false;
        }

    
    } catch (error) {
        console.log(error);
        return error;
    }
}

export function Csm_User_Input_Change_Model_Number_Data_Redux_Thunk(
    csm_number
) {
    return async dispatch => {
        const { request, success, failure } = Csm_User_Input_Change_Model_Number_Data_Async;
        dispatch(request());
        try {
            const Csm_User_Input_Change_Model_Number_Data = await Csm_User_Input_Change_Model_Number_Data_Axios(csm_number);
            if (Csm_User_Input_Change_Model_Number_Data) {
                dispatch(success(Csm_User_Input_Change_Model_Number_Data));
            } else {
                dispatch(failure("서버와의 연결 끊김"));    
            }
        } catch (e) {
            dispatch(failure(e));
        }
    };
}



// Bind 조회

const Csm_User_Input_Change_Bind_Data_Axios = async (csm_number,csm_models,Csm_Select_Data) => {
     try {
         const Bind_Data_Axios = await request.get(`/CE_Calendar_app_server/Csm_Distance_Info_Data_Binds`, {
             params: {
                 csm_number,
                 csm_models
            }
        });
        
         if (Bind_Data_Axios.data.dataSuccess) {
             
             if (Bind_Data_Axios.data.setCsm_Binds_lists_data) {
                 const Change_Select = Bind_Data_Axios.data.setCsm_Binds_lists_data.map((list) => {
                     return Csm_Select_Data.some(item => {
                         console.log(item.csm_basic_data_csm_key === list.csm_basic_data_csm_key);
                        return item.csm_basic_data_csm_key === list.csm_Binds_Lists_Data.csm_basic_data_csm_key ? true:false
                    }) ? {...list,select:true}:list
                 })
                 return Change_Select
             } else {
                 return false
             }
        } else {
            return false;
        }

    
    } catch (error) {
        console.log(error);
        return error;
    }
}

export function Csm_User_Input_Change_Bind_Data_Redux_Thunk(
    csm_number,
    csm_models,
    Csm_Select_Data
) {
    return async dispatch => {
        const { request, success, failure } = Csm_User_Input_Change_Bind_Data_Async;
        dispatch(request());
        try {
            const Csm_User_Input_Change_Bind_Data = await Csm_User_Input_Change_Bind_Data_Axios(csm_number,csm_models,Csm_Select_Data);
            if (Csm_User_Input_Change_Bind_Data) {
                dispatch(success(Csm_User_Input_Change_Bind_Data));
            } else {
                dispatch(failure("서버와의 연결 끊김"));    
            }
        } catch (e) {
            dispatch(failure(e));
        }
    };
}


export const Csm_User_Input_Reset_Data = (data) => ({
    type: CSM_USER_INPUT_REDUCER_RESET_DATA,
    payload: data,
});


export const Csm_User_Input_Change_Bind_Data = (data) => ({
    type: CSM_USER_INPUT_REDUCER_CHANGE_BIND_DATA_CHANGE,
    payload:data
})   



const Csm_User_Input_State = (state = initState, action) => {
    switch (action.type) {
        case CSM_USER_INPUT_REDUCER_CHANGE_DATA:
            return {
                ...state,
                Csm_User_Input_Data: action.payload 
            };
       
        case CSM_USER_INPUT_REDUCER_RESET_DATA:
            return initState
        case CSM_USER_INPUT_REDUCER_CHANGE_CUSTOM_DATA_START:
            return {
                ...state,
                Csm_User_Input_Data: {
                    ...state.Csm_User_Input_Data,
                        custom: {
                        ...state.Csm_User_Input_Data.custom,
                        custom_loading: true,
                    } ,
                            csm_number: {
                                csm_number_options:[],
                            csm_number_checked: {
                                value: "",
                                label:""
                                },
                                csm_number_loading: false,
                            csm_number_error:null,
                        },
                            model_number: {
                                model_number_options:[],
                                model_number_checked: {
                                    value: "",
                                    label:"",
                                },      
                                model_number_loading: false,
                                model_number_error:null,
                            },
                            bind: {
                            bind_options:[],
                            bind_checked: {
                                value: "",
                                label:""
                                },
                                bind_loading: false,
                                bind_error:false,
                        }
                }
                
            }
           case CSM_USER_INPUT_REDUCER_CHANGE_CUSTOM_DATA_SUCCESS:
            return {
                ...state,
                Csm_User_Input_Data: {
                    ...state.Csm_User_Input_Data,
                        custom: {
                        ...state.Csm_User_Input_Data.custom,
                        custom_loading: false,
                        custom_options:action.payload
                    }    
                }
                
            }
           case CSM_USER_INPUT_REDUCER_CHANGE_CUSTOM_DATA_ERROR:
            return {
                ...state,
                Csm_User_Input_Data: {
                    ...state.Csm_User_Input_Data,
                        custom: {
                        ...state.Csm_User_Input_Data.custom,
                            custom_loading: false,
                             custom_error:action.payload
                    }    
                }
                
            }
         case CSM_USER_INPUT_REDUCER_CHANGE_CSM_NUMBER_DATA_START:
            return {
                ...state,
                Csm_User_Input_Data: {
                    ...state.Csm_User_Input_Data,
                        csm_number: {
                        ...state.Csm_User_Input_Data.csm_number,
                        csm_number_loading: true,
                    },
                            model_number: {
                                model_number_options:[],
                                model_number_checked: {
                                    value: "",
                                    label:"",
                                },      
                                model_number_loading: false,
                                model_number_error:null,
                            },
                            bind: {
                            bind_options:[],
                            bind_checked: {
                                value: "",
                                label:""
                                },
                                bind_loading: false,
                                bind_error:false,
                        }
                }
                
            }
           case CSM_USER_INPUT_REDUCER_CHANGE_CSM_NUMBER_DATA_SUCCESS:
            return {
                ...state,
                Csm_User_Input_Data: {
                    ...state.Csm_User_Input_Data,
                        csm_number: {
                        ...state.Csm_User_Input_Data.csm_number,
                        csm_number_loading: false,
                        csm_number_options:action.payload
                    }    
                }
                
            }
           case CSM_USER_INPUT_REDUCER_CHANGE_CSM_NUMBER_DATA_ERROR:
            return {
                ...state,
                Csm_User_Input_Data: {
                    ...state.Csm_User_Input_Data,
                        csm_number: {
                        ...state.Csm_User_Input_Data.csm_number,
                            csm_number_loading: false,
                             csm_number_error:action.payload
                    }    
                }
                
            }
        case CSM_USER_INPUT_REDUCER_CHANGE_MODEL_NUMBER_DATA_START:
            return {
                ...state,
                Csm_User_Input_Data: {
                    ...state.Csm_User_Input_Data,
                        model_number: {
                        ...state.Csm_User_Input_Data.model_number,
                        model_number_loading: true,
                    }, bind: {
                            bind_options:[],
                            bind_checked: {
                                value: "",
                                label:""
                                },
                                bind_loading: false,
                                bind_error:false,
                        } 
                }
                
            }
           case CSM_USER_INPUT_REDUCER_CHANGE_MODEL_NUMBER_DATA_SUCCESS:
            return {
                ...state,
                Csm_User_Input_Data: {
                    ...state.Csm_User_Input_Data,
                        model_number: {
                        ...state.Csm_User_Input_Data.model_number,
                        model_number_loading: false,
                        model_number_options:action.payload
                    }    
                }
                
            }
           case CSM_USER_INPUT_REDUCER_CHANGE_MODEL_NUMBER_DATA_ERROR:
            return {
                ...state,
                Csm_User_Input_Data: {
                    ...state.Csm_User_Input_Data,
                        model_number: {
                        ...state.Csm_User_Input_Data.model_number,
                             model_number_loading: false,
                             model_number_error:action.payload
                    }    
                }
                
            }
         case CSM_USER_INPUT_REDUCER_CHANGE_BIND_DATA_START:
            return {
                ...state,
                Csm_User_Input_Data: {
                    ...state.Csm_User_Input_Data,
                        bind: {
                        ...state.Csm_User_Input_Data.bind,
                        bind_loading: true,
                    }    
                }
                
            }
           case CSM_USER_INPUT_REDUCER_CHANGE_BIND_DATA_SUCCESS:
            return {
                ...state,
                Csm_User_Input_Data: {
                    ...state.Csm_User_Input_Data,
                        bind: {
                        ...state.Csm_User_Input_Data.bind,
                        bind_loading: false,
                        bind_options:action.payload
                    }    
                }
                
            }
           case CSM_USER_INPUT_REDUCER_CHANGE_BIND_DATA_ERROR:
            return {
                ...state,
                Csm_User_Input_Data: {
                    ...state.Csm_User_Input_Data,
                        bind: {
                        ...state.Csm_User_Input_Data.bind,
                             bind_loading: false,
                             bind_error:action.payload
                    }    
                }
                
            }
        
        case CSM_USER_INPUT_REDUCER_CHANGE_BIND_DATA_CHANGE:
            return {
                ...state,
                Csm_User_Input_Data: {
                    ...state.Csm_User_Input_Data,
                        bind: {
                        ...state.Csm_User_Input_Data.bind,
                             bind_options:action.payload
                    }    
                }
            }
        
        default:
            return state;
        
    }
};
export default Csm_User_Input_State;
