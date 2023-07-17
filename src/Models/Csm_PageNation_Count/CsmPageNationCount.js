export const CSM_PAGE_NATION_COUNT_GET = 'CSM_PAGE_NATION_COUNT_GET';
export const CSM_PAGE_NATION_COUNT_RESET = 'CSM_PAGE_NATION_COUNT_RESET';

const initState = {
    PageNumbers: 1,
};

export const CSM_PageNation_Change = data => ({
    type: CSM_PAGE_NATION_COUNT_GET,
    payload: data,
});

export const CSM_PageNation_Reset = () => ({
    type: CSM_PAGE_NATION_COUNT_RESET,
    payload: 1,
});

const Csm_PageNation_Reducer = (state = initState, action) => {
    switch (action.type) {
        case CSM_PAGE_NATION_COUNT_GET:
            return {
                ...state,
                PageNumbers: action.payload,
            };
        case CSM_PAGE_NATION_COUNT_RESET:
            return {
                ...state,
                  PageNumbers: 1,
            };
        default:
            return state;
    }
};
export default Csm_PageNation_Reducer;
