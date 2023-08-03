export const CSM_FILTERING_CHANGE_DATA_GET = 'CSM_FILTERING_CHANGE_DATA_GET';
export const CSM_FILTERING_RESET_DATA_GET = 'CSM_FILTERING_RESET_DATA_GET';

export const initState = {
    Csm_Filter_State: {
        csm_basic_data_state: "Open",
        csm_basic_data_state_search_checked: false,

        csm_basic_data_grade: "All",
        csm_basic_data_grade_search_checked:false,

        csm_basic_data_csm_number: "",
        csm_basic_data_csm_number_array:[],
        csm_basic_data_csm_number_search_checked:false,

        csm_basic_data_model_number: "",
        csm_basic_data_model_number_array: [],
        csm_basic_data_model_number_search_checked:false,

        csm_basic_data_binds: "",
        csm_basic_data_binds_array:[],
        csm_basic_data_binds_search_checked:false,

        csm_basic_data_custom: "",
        csm_basic_data_custom_array:[],
        csm_basic_data_custom_search_checked:false,

        csm_basic_data_part_number: "",
        csm_basic_data_part_number_search_checked:false,

        csm_user_input_data_writer_id: null,
        csm_user_input_data_writer_id_search_checked: false,
        
        csm_user_input_start_date: new Date("2023-01-01"),
        csm_user_input_end_date: new Date(),
        
        csm_calendar_publish: false,
        csm_calendar_apply: false,
        csm_calendar_entering:false,
        csm_calendar_ce:false,
        csm_calendar_custom: false,
        csm_calendar_pay:false,
        csm_calendar_finall: false,
        cms_calendar_all:true,

        csm_hidden_checking:false,

    }
};

export const Csm_Filtering_Change_Data = data => ({
    type: CSM_FILTERING_CHANGE_DATA_GET,
    payload: data,
});
export const Csm_Filtering_Reset_Data = () => ({
    type: CSM_FILTERING_RESET_DATA_GET,
    payload: initState,
});


const Csm_Filtering_State = (state = initState, action) => {
    switch (action.type) {
        case CSM_FILTERING_CHANGE_DATA_GET:
            return {
                ...state,
                Csm_Filter_State: action.payload 
            };
        case CSM_FILTERING_RESET_DATA_GET:
            return initState
     
        default:
            return state;
    }
};
export default Csm_Filtering_State;
