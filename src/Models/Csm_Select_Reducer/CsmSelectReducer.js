export const CSM_SELECT_ADD_DATA = 'CSM_SELECT_ADD_DATA';
export const CSM_SELECT_DELETE_DATA = 'CSM_SELECT_DELETE_DATA';
const CSM_SELECT_RESET_DATA = 'CSM_SELECT_RESET_DATA';

const initState = {
    Csm_Select_Data:[]
};

export const Csm_Select_Add_Data = data => ({
    type: CSM_SELECT_ADD_DATA,
    payload: data,
});
export const Csm_Select_Delete_Data = (data) => ({
    type: CSM_SELECT_DELETE_DATA,
    payload: data,
});
export const Csm_Select_Reset_Data = () =>({
    type:CSM_SELECT_RESET_DATA
})


const Csm_Select_State = (state = initState, action) => {
    switch (action.type) {
        case CSM_SELECT_ADD_DATA:
            return {
                ...state,
                Csm_Select_Data: action.payload 
            };
        case CSM_SELECT_DELETE_DATA:
            return {
                ...state,
                Csm_Select_Data: action.payload 
            };
        case CSM_SELECT_RESET_DATA:
            return initState
     
        default:
            return state;
    }
};
export default Csm_Select_State;
