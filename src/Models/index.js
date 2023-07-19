import { combineReducers } from 'redux';
import LoaderCheckingRedux from './LoaderCheckReducer/LoaderCheckReducer';
import CSmFilteringReducer from "./Csm_Filtering_Reducer/CSmFilteringReducer"
import CsmSelectReducer from "./Csm_Select_Reducer/CsmSelectReducer"
import CsmBasicDataReducer from "./ReduxThunk/Csm_Basic_Data_Reducer/CsmBasicDataReducer"
import LoginInfoDataReducer from "./LoginInfoReducer/LoginInfoReducer"
import CsmUserInputReducer from "./ReduxThunk/Csm_User_Input_Reducer/CSmUserInputReducer"
import CsmRegiDataReducer from './ReduxThunk/Csm_Regi_Data_Reducer/CsmRegiDataReducer'
import CsmInvoiceSelectReducer from "./Csm_Select_Reducer/CsmInvoiceSelectReducer"
import UserSelectReducer from "./ReduxThunk/User_Select_Reducer/UserSelectReducer"
import Csm_PageNation_Reducer from './Csm_PageNation_Count/CsmPageNationCount';
import Csm_Grade_Data_Reducer from "./ReduxThunk/Csm_Grade_Data_Reducer/Csn_Grade_Data_Reducer"
const rootReducer = combineReducers({  LoaderCheckingRedux,CSmFilteringReducer,CsmSelectReducer,CsmBasicDataReducer,LoginInfoDataReducer,CsmUserInputReducer,CsmRegiDataReducer,CsmInvoiceSelectReducer,UserSelectReducer,Csm_PageNation_Reducer,Csm_Grade_Data_Reducer });

export default rootReducer;
