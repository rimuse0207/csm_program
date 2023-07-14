import React,{forwardRef, useEffect, useState} from "react";
import { styled } from "styled-components";
import { BsFillPencilFill,BsHandIndexThumbFill } from "react-icons/bs";
import { GoSearch } from "react-icons/go"
import { GrPowerReset,GrSearchAdvanced } from "react-icons/gr";
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from "react-redux";
import { Csm_Filtering_Change_Data, initState } from "../../../../Models/Csm_Filtering_Reducer/CSmFilteringReducer";
import { Csm_Filtering_Reset_Data } from "../../../../Models/Csm_Filtering_Reducer/CSmFilteringReducer";
import FilterSearchModal from "./FilterSearchModal/FilterSearchModal";
import Modal from "react-modal";
import { Csm_Baisc_Data_Reduce_Thunk } from "../../../../Models/ReduxThunk/Csm_Basic_Data_Reducer/CsmBasicDataReducer";
import { Csm_Register_Data_Reduce_Thunk } from "../../../../Models/ReduxThunk/Csm_Regi_Data_Reducer/CsmRegiDataReducer";
import Select from "react-select";
import { User_Select_Data_Reduce_Thunk } from "../../../../Models/ReduxThunk/User_Select_Reducer/UserSelectReducer";
import { MdOutlineTouchApp } from "react-icons/md";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '85%',
        height: '85%',
        zIndex: 100,
    },
};
Modal.setAppElement('#FilterSearchModal');


const FilterSelectMainDivBox = styled.div`
    margin-top:30px;
`

export const FilterSearchMainPageDivBox = styled.div`
    padding: 10px;
    margin-right: 30px;
    padding-right: 40px;
    margin-top: 20px;
    background-color: #fff;
    border-radius: 10px;

    .FilteringContainer {
        margin-top: 10px;
        
        display: flex;
        flex-flow: wrap;
        justify-content: space-between;
        font-size: 1.1em;
        .SearchInputContainer {
            display: flex;
            width: 45%;
            height: 40px;
            margin-left: 20px;
            margin-bottom: 10px;
            margin-top:20px;
            .SearchInputContainerTitle {
                margin-right: 10px;
                line-height: 40px;
                width: 100px;
                  h4{
                    margin:0px;
                }
            }
            .SearchInputContainerSubTitle {
                width: 100%;
                height: 100%;
              
                .SearchInputContainerSubTitleFlexDivBox {
                    display: flex;
                    width:100%;
                    height: 100%;
                    .SearchIcons{
                        :hover{
                            cursor: pointer;
                        }
                    }
                    .IconsDivBox {
                        width: 10%;
                        height: 100%;
                        text-align: center;
                        border: 1px solid lightgray;
                        display:flex;
                        justify-content:center;
                        align-items:center;
                    }

                    .InputRadioDivBox{
                        display:flex;
                        align-items:center;
                        justify-content:space-around;
                        border-bottom:1px solid lightgray;
                        width:100%;
                    }

                    .InputDivBox {
                        width: 80%;
                        height: 100%;
                       position:relative;
                        h4{
                            margin:10px;

                        }
                        input,
                        select {
                            position:absolute;
                            left:0px;
                            width:100%;
                            height: 100%;
                            border: 1px solid lightgray;
                            padding-left: 10px;
                            font-size: 1em;

                            :focus {
                                outline: none;
                                border: none;
                                border: 0.5px solid #368;
                            }
                        }
                        select{
                            height:100%;
                        }
                        .react-datepicker-wrapper{
                            height:100%;
                            .react-datepicker__input-container {
                                height:100%;
                                button{
                                    width:100%;
                                    height:100%;
                                    background-color:#fff;
                                    border:1px solid lightgray;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .btns {
        text-align: end;

        font-size: 1em;
        .btn {
            display: inline-block;
            margin-right: 2px;
            padding: 10px 20px;
            background: none;
            border: 1px solid #c0c0c0;
            border-radius: 2px;
            color: #666;
            font-size: 1em;
            outline: none;
            transition: all 100ms ease-out;
            &:hover,
            &:focus {
                transform: translateY(-3px);
                cursor: pointer;
            }
            &-confirm {
                border: 1px solid #2962ff;
                background: #2962ff;
                color: #fff;
            }
        }
    }
`;

///date-picker 버튼 컴포넌트
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="example-custom-input" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));

    ///date-picker 토요일 일요일 색깔 표시
    const getDayName = (date) => {
        return date
            .toLocaleDateString('ko-KR', {
                weekday: 'long',
            })
            .substr(0, 1);
    };

    const createDate = (date) => {
        return new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
    };
const FilterSelect = ({UseRegisterSearch}) => {
    const dispatch = useDispatch();
    const Login_Info = useSelector((state) => state.LoginInfoDataReducer.Infomation);
    const Csm_Filter_States = useSelector(state => state.CSmFilteringReducer.Csm_Filter_State);
    const CsmSelectState = useSelector(state => state.CsmSelectReducer.Csm_Select_Data);
    const Csm_Invoice_Select_State = useSelector((state) => state.CsmInvoiceSelectReducer.Csm_Invoice_Select_Data);
    const User_Select_Options_State = useSelector(state => state.UserSelectReducer.User_Data.User_Select_Options);
    const [FilterSearchModalIsOpen, setFilterSearchModalIsOpen] = useState(false);
    const [SelectMenuTitle, setSelectMenuTitle] = useState(null);

    const HandleFilterDataReset = () => {
        dispatch(Csm_Baisc_Data_Reduce_Thunk(1, initState.Csm_Filter_State, CsmSelectState));
        dispatch(Csm_Register_Data_Reduce_Thunk(1, initState.Csm_Filter_State,Csm_Invoice_Select_State));
        dispatch(Csm_Filtering_Reset_Data());
    }

    const handleChange = (e, Select) => {

        const Change_Filter_State = { ...Csm_Filter_States, csm_calendar_publish: false, csm_calendar_apply: false, csm_calendar_entering: false, csm_calendar_ce: false, csm_calendar_custom: false, csm_calendar_pay: false, csm_calendar_finall: false,cms_calendar_all:false,csm_hidden_checking:false }
        

        if (Select === "csm_basic_data_state") {
            dispatch(Csm_Filtering_Change_Data({ ...Csm_Filter_States, csm_basic_data_state: e.target.value }))
        } else if (Select === "csm_basic_data_grade") {
            dispatch(Csm_Filtering_Change_Data({ ...Csm_Filter_States, csm_basic_data_grade: e.target.value }))
        }else if (Select === "csm_basic_data_csm_number") {
            dispatch(Csm_Filtering_Change_Data({ ...Csm_Filter_States, csm_basic_data_csm_number: e.target.value }))
        }else if (Select === "csm_basic_data_model_number") {
            dispatch(Csm_Filtering_Change_Data({ ...Csm_Filter_States, csm_basic_data_model_number: e.target.value }))
        }else if (Select === "csm_basic_data_binds") {
            dispatch(Csm_Filtering_Change_Data({ ...Csm_Filter_States, csm_basic_data_binds: e.target.value }))
        }else if (Select === "csm_basic_data_custom") {
            dispatch(Csm_Filtering_Change_Data({ ...Csm_Filter_States, csm_basic_data_custom: e.target.value }))
        }else if (Select === "csm_basic_data_part_number") {
            dispatch(Csm_Filtering_Change_Data({ ...Csm_Filter_States, csm_basic_data_part_number: e.target.value }))
        }else if (Select === "csm_user_input_data_writer_id") {
            dispatch(Csm_Filtering_Change_Data({ ...Csm_Filter_States, csm_user_input_data_writer_id: e }))
        } else if (Select === "csm_user_input_start_date") {
            dispatch(Csm_Filtering_Change_Data({ ...Csm_Filter_States, csm_user_input_start_date: e }))
        }else if (Select === "csm_user_input_end_date") {
            dispatch(Csm_Filtering_Change_Data({ ...Csm_Filter_States, csm_user_input_end_date: e }))
        } else if (Select === 'csm_calendar_publish') {

            
            if (e.target.checked) {
                // 선택
                dispatch(Csm_Filtering_Change_Data({...Change_Filter_State,csm_calendar_publish:true}));
            } else {
                // 해제
                dispatch(Csm_Filtering_Change_Data(Change_Filter_State));
            }
            
        } else if (Select === 'csm_calendar_apply') {
            if (e.target.checked) {
                // 선택
                dispatch(Csm_Filtering_Change_Data({...Change_Filter_State,csm_calendar_publish:true,csm_calendar_apply:true}));
            } else {
                // 해제
                dispatch(Csm_Filtering_Change_Data({...Change_Filter_State,csm_calendar_publish:Csm_Filter_States.csm_calendar_publish}));
            }
            
            
        } else if (Select === 'csm_calendar_entering') {
            if (e.target.checked) {
                // 선택
                dispatch(Csm_Filtering_Change_Data({...Change_Filter_State,csm_calendar_publish:true,csm_calendar_apply:true,csm_calendar_entering:true}));
            } else {
                // 해제
                dispatch(Csm_Filtering_Change_Data({...Change_Filter_State,csm_calendar_publish:Csm_Filter_States.csm_calendar_publish,csm_calendar_apply:Csm_Filter_States.csm_calendar_apply}));
            }
            
        } else if (Select === 'csm_calendar_ce') {
            if (e.target.checked) {
                // 선택
                dispatch(Csm_Filtering_Change_Data({...Change_Filter_State,csm_calendar_publish:true,csm_calendar_apply:true,csm_calendar_entering:true,csm_calendar_ce:true}));
            } else {
                // 해제
                 dispatch(Csm_Filtering_Change_Data({...Change_Filter_State,csm_calendar_publish:Csm_Filter_States.csm_calendar_publish,csm_calendar_apply:Csm_Filter_States.csm_calendar_apply,csm_calendar_entering:Csm_Filter_States.csm_calendar_entering}));
            }
            
        } else if (Select === 'csm_calendar_custom') {
            if (e.target.checked) {
                // 선택
                dispatch(Csm_Filtering_Change_Data({...Change_Filter_State,csm_calendar_publish:true,csm_calendar_apply:true,csm_calendar_entering:true,csm_calendar_ce:true,csm_calendar_custom:true}));
            } else {
                // 해제
                dispatch(Csm_Filtering_Change_Data({...Change_Filter_State,csm_calendar_publish:Csm_Filter_States.csm_calendar_publish,csm_calendar_apply:Csm_Filter_States.csm_calendar_apply,csm_calendar_entering:Csm_Filter_States.csm_calendar_entering,csm_calendar_ce:Csm_Filter_States.csm_calendar_ce}));
            }
            
        } else if (Select === 'csm_calendar_pay') {
              if (e.target.checked) {
                // 선택
                dispatch(Csm_Filtering_Change_Data({...Change_Filter_State,csm_calendar_publish:true,csm_calendar_apply:true,csm_calendar_entering:true,csm_calendar_ce:true,csm_calendar_custom:true,csm_calendar_pay:true}));
            } else {
                // 해제
                dispatch(Csm_Filtering_Change_Data({...Change_Filter_State,csm_calendar_publish:Csm_Filter_States.csm_calendar_publish,csm_calendar_apply:Csm_Filter_States.csm_calendar_apply,csm_calendar_entering:Csm_Filter_States.csm_calendar_entering,csm_calendar_custom:Csm_Filter_States.csm_calendar_custom,csm_calendar_ce:Csm_Filter_States.csm_calendar_ce}));
            }
            
        } else if (Select === 'csm_calendar_finall') {
                  if (e.target.checked) {
                // 선택
                dispatch(Csm_Filtering_Change_Data({...Change_Filter_State,csm_calendar_publish:true,csm_calendar_apply:true,csm_calendar_entering:true,csm_calendar_ce:true,csm_calendar_custom:true,csm_calendar_pay:true,csm_calendar_finall:true}));
            } else {
                // 해제
                dispatch(Csm_Filtering_Change_Data({...Change_Filter_State,csm_calendar_publish:Csm_Filter_States.csm_calendar_publish,csm_calendar_apply:Csm_Filter_States.csm_calendar_apply,csm_calendar_entering:Csm_Filter_States.csm_calendar_entering,csm_calendar_custom:Csm_Filter_States.csm_calendar_custom,csm_calendar_pay:Csm_Filter_States.csm_calendar_pay,csm_calendar_ce:Csm_Filter_States.csm_calendar_ce}));
            }
            
        } else if (Select === 'cms_calendar_all') {
              if (e.target.checked) {
                // 선택
                dispatch(Csm_Filtering_Change_Data({...Change_Filter_State,cms_calendar_all:true}));
            } else {
                // 해제
                dispatch(Csm_Filtering_Change_Data(Change_Filter_State));
            }
        }else if (Select === 'csm_hidden_checking') {
              if (e.target.checked) {
                // 선택
                dispatch(Csm_Filtering_Change_Data({...Csm_Filter_States,csm_hidden_checking:true}));
            } else {
                // 해제
                dispatch(Csm_Filtering_Change_Data({...Csm_Filter_States,csm_hidden_checking:false}));
            }
        }
        
        
    }

    const HandleClickModalSearchFilter = (Select) => {
           dispatch(Csm_Filtering_Change_Data({...Csm_Filter_States, 
              csm_basic_data_state_search_checked: false,
              csm_basic_data_grade_search_checked: false,
              csm_basic_data_csm_number_search_checked: false,
              csm_basic_data_model_number_search_checked: false,
              csm_basic_data_binds_search_checked: false,
              csm_basic_data_custom_search_checked: false,
              csm_basic_data_part_number_search_checked:false,
            })) 
        setFilterSearchModalIsOpen(true);
        setSelectMenuTitle(Select)
        document.body.style.overflow = 'hidden';
    }

    const Close_Filter_Modal = () => {
        setFilterSearchModalIsOpen(false)
              
        document.body.style.overflow = 'unset';

    }

    const HandleSubmitFilterDataApply = () => {
       
        dispatch(Csm_Baisc_Data_Reduce_Thunk(1, Csm_Filter_States, CsmSelectState))
        dispatch(Csm_Register_Data_Reduce_Thunk(1, Csm_Filter_States,Csm_Invoice_Select_State));
    }

    useEffect(() => {
        dispatch(User_Select_Data_Reduce_Thunk());
    },[])

    return (
        <FilterSelectMainDivBox>
            
                 <FilterSearchMainPageDivBox>
                <div>
                    <div>
                        
                        <div className="FilteringContainer">
                            {Login_Info.Login_Admin_Access ? <>
                            <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>숨김항목.</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <BsHandIndexThumbFill></BsHandIndexThumbFill>
                                            </label>
                                        </div>
                                        <div className="InputRadioDivBox">
                                            <div>
                                                <input type="checkbox"
                                                    name="hidden_Checking"
                                                    value="not_show"
                                                    id="hidden_Checking_Show"
                                                    checked={Csm_Filter_States.csm_hidden_checking }
                                                    onChange={(e) => handleChange(e, "csm_hidden_checking")}></input>
                                                    <label  htmlFor="hidden_Checking_Show">
                                                        숨김처리 항목 보기
                                                    </label>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                            <div className="SearchInputContainer">
                                
                            </div></> : <></>}
                            
                            <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>상태.</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <BsHandIndexThumbFill></BsHandIndexThumbFill>
                                            </label>
                                        </div>
                                        <div className="InputRadioDivBox">
                                             <div>
                                                <input type="radio"
                                                    name="state"
                                                    value="All"
                                                    id="state_All"
                                                    checked={Csm_Filter_States.csm_basic_data_state === "All"}
                                                    onChange={(e) => handleChange(e, "csm_basic_data_state")}></input>
                                                    <label htmlFor="state_All">
                                                        All
                                                    </label>
                                            </div>
                                            <div>
                                                <input type="radio"
                                                    name="state"
                                                    value="Open"
                                                    id="state_Open"
                                                    checked={Csm_Filter_States.csm_basic_data_state === "Open"}
                                                    onChange={(e) => handleChange(e, "csm_basic_data_state")}></input>
                                                    <label  htmlFor="state_Open">
                                                        Open
                                                    </label>
                                            </div>
                                             <div>
                                                <input type="radio"
                                                    name="state"
                                                    value="Close"
                                                    id="state_Close"
                                                    checked={Csm_Filter_States.csm_basic_data_state === "Close"}
                                                    onChange={(e) => handleChange(e, "csm_basic_data_state")}></input>
                                                    <label  htmlFor="state_Close">
                                                    Close
                                                    </label>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                            <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>등급.</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <BsFillPencilFill></BsFillPencilFill>
                                            </label>
                                        </div>
                                        <div className="InputRadioDivBox">
                                              <div>
                                                <input type="radio"
                                                    name="grade"
                                                    value="All"
                                                    id="grade_All"
                                                    checked={Csm_Filter_States.csm_basic_data_grade === "All"}
                                                    onChange={(e) => handleChange(e, "csm_basic_data_grade")}></input>
                                                    <label htmlFor="grade_All">
                                                        All
                                                    </label>
                                            </div>
                                             <div>
                                                <input type="radio"
                                                    name="grade"
                                                    value="CDC"
                                                    id="grade_CDC"
                                                    checked={Csm_Filter_States.csm_basic_data_grade === "CDC"}
                                                    onChange={(e) => handleChange(e, "csm_basic_data_grade")}></input>
                                                    <label htmlFor="grade_CDC">
                                                        CDC
                                                    </label>
                                            </div>
                                            <div>
                                                <input type="radio"
                                                    name="grade"
                                                    value="MDC"
                                                    id="grade_MDC"
                                                    checked={Csm_Filter_States.csm_basic_data_grade === "MDC"}
                                                    onChange={(e) => handleChange(e, "csm_basic_data_grade")}></input>
                                                    <label  htmlFor="grade_MDC">
                                                        MDC
                                                    </label>
                                            </div>
                                             <div>
                                                <input type="radio"
                                                    name="grade"
                                                    value="SDC"
                                                    id="grade_SDC"
                                                    checked={Csm_Filter_States.csm_basic_data_grade === "SDC"}
                                                    onChange={(e) => handleChange(e, "csm_basic_data_grade")}></input>
                                                    <label  htmlFor="grade_SDC">
                                                    SDC
                                                    </label>
                                            </div>
                                        </div>
                                          
                                    </div>
                                </div>
                            </div>
                            <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>CSM번호.</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <BsFillPencilFill></BsFillPencilFill>
                                            </label>
                                        </div>
                                        <div className="InputDivBox">
                                            
                                                <input
                                                    type="text"
                                                    placeholder="Ex) CDC20001"
                                                value={Csm_Filter_States.csm_basic_data_csm_number}
                                                onChange={(e)=>handleChange(e,"csm_basic_data_csm_number")}
                                                ></input>
                                            
                                        </div>
                                          <div className="IconsDivBox SearchIcons" onClick={()=>HandleClickModalSearchFilter("csm_basic_data_csm_number")}>
                                            <label>
                                                <GrSearchAdvanced></GrSearchAdvanced>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>장비Model.</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <BsFillPencilFill></BsFillPencilFill>
                                            </label>
                                        </div>
                                        <div className="InputDivBox">
                                            
                                                <input
                                                    
                                                    type="text"
                                                    placeholder="Ex) DFD**..."
                                                value={Csm_Filter_States.csm_basic_data_model_number}
                                                onChange={(e)=>handleChange(e,"csm_basic_data_model_number")}
                                                ></input>
                                            
                                        </div>
                                          <div className="IconsDivBox SearchIcons" onClick={()=>HandleClickModalSearchFilter("csm_basic_data_model_number")}>
                                            <label>
                                                <GrSearchAdvanced></GrSearchAdvanced>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>제번.</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <BsFillPencilFill></BsFillPencilFill>
                                            </label>
                                        </div>
                                        <div className="InputDivBox">
                                            
                                                <input
                                                    
                                                    type="text"
                                                    placeholder="Ex) NLA**.."
                                                value={Csm_Filter_States.csm_basic_data_binds}
                                                onChange={(e)=>handleChange(e,"csm_basic_data_binds")}
                                                ></input>
                                            
                                        </div>
                                          <div className="IconsDivBox SearchIcons" onClick={()=>HandleClickModalSearchFilter("csm_basic_data_binds")}>
                                            <label>
                                                <GrSearchAdvanced></GrSearchAdvanced>
                                            </label>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>최초 납품처.</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <BsFillPencilFill></BsFillPencilFill>
                                            </label>
                                        </div>
                                        <div className="InputDivBox">
                                            
                                                <input
                                            
                                                    type="text"
                                                    placeholder="Ex) AMKOR.."
                                                value={Csm_Filter_States.csm_basic_data_custom}
                                                onChange={(e)=>handleChange(e,"csm_basic_data_custom")}
                                                ></input>
                                            
                                        </div>
                                          <div className="IconsDivBox SearchIcons" onClick={()=>HandleClickModalSearchFilter("csm_basic_data_custom")}>
                                            <label>
                                                <GrSearchAdvanced></GrSearchAdvanced>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                         
                            
                            {UseRegisterSearch ? <>
                                <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>CSM 장소</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <BsFillPencilFill></BsFillPencilFill>
                                            </label>
                                        </div>
                                        <div className="InputDivBox">
                                            
                                                <input
                                                  
                                                    type="text"
                                                    placeholder="Ex) 하이닉스"
                                                value={Csm_Filter_States.csm_basic_data_part_number}
                                                onChange={(e)=>handleChange(e,"csm_basic_data_part_number")}
                                                ></input>
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                                <div className="SearchInputContainer">
                                    <div className="SearchInputContainerTitle">
                                        <h4>작업자 이름.</h4>
                                    </div>
                                    <div className="SearchInputContainerSubTitle">
                                        <div className="SearchInputContainerSubTitleFlexDivBox">
                                            <div className="IconsDivBox">
                                                <label>
                                                    <BsFillPencilFill></BsFillPencilFill>
                                                </label>
                                            </div>
                                            <div className="InputDivBox">
                                                        {/* <input
                                                            type="text"
                                                            placeholder="EX) 홍길동..."
                                                            value={Csm_Filter_States.csm_user_input_data_writer_id}
                                                            onChange={(e) => handleChange(e, "csm_user_input_data_writer_id")}
                                                            
                                                        ></input> */}
                                                <Select
                                                    options={User_Select_Options_State}
                                                    onChange={(e) => handleChange(e, "csm_user_input_data_writer_id")}
                                                    isClearable={true}
                                                    placeholder="이름 또는 Email을 검색.."
                                                >

                                                </Select>
                                                    
                                            </div>
                                    
                                        </div>
                                    </div>
                            </div>
                                <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>시작날짜.</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <BsFillPencilFill></BsFillPencilFill>
                                            </label>
                                        </div>
                                        <div className="InputDivBox">
                                                <DatePicker
                                                    locale={ko}
                                                    dateFormat={"yyyy-MM-dd"}
                                                    selected={Csm_Filter_States.csm_user_input_start_date}
                                                    maxDate={Csm_Filter_States.csm_user_input_end_date}
                                                    onChange={(e)=>handleChange(e,"csm_user_input_start_date")}
                                                ></DatePicker>
                                        </div>
                                         
                                    </div>
                                </div>
                                </div>
                                <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>종료날짜.</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <BsFillPencilFill></BsFillPencilFill>
                                            </label>
                                        </div>
                                        <div className="InputDivBox">
                                                <DatePicker
                                                    locale={ko}
                                                    dateFormat={"yyyy-MM-dd"}
                                                    selected={Csm_Filter_States.csm_user_input_end_date}
                                                    maxDate={new Date()}
                                                    onChange={(e)=>handleChange(e,"csm_user_input_end_date")}
                                                ></DatePicker>
                                        </div>
                                          
                                    </div>
                                </div>
                            </div>

                            </>:<></>}
                           <div className="SearchInputContainer" style={{width:"90%",marginBottom:"30px"}}>
                                <div className="SearchInputContainerTitle">
                                    <h4>CSM 캘린더.</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <MdOutlineTouchApp></MdOutlineTouchApp>
                                            </label>
                                        </div>
                                        <div className="InputRadioDivBox">
                                            <div>
                                                   <input
                                                type="checkbox"
                                                checked={Csm_Filter_States.cms_calendar_all}
                                                    id='cms_calendar_all'
                                                    onChange={e=>handleChange(e,"cms_calendar_all")}
                                                readOnly
                                                ></input>
                                                <label htmlFor="cms_calendar_all">전체</label>
                                             </div>
                                            <div>
                                                   <input
                                                type="checkbox"
                                                checked={Csm_Filter_States.csm_calendar_publish}
                                                    id='csm_calendar_publish'
                                                    onChange={e=>handleChange(e,"csm_calendar_publish")}
                                                    readOnly
                                                    disabled={UseRegisterSearch?true:false}
                                                ></input>
                                                <label htmlFor="csm_calendar_publish">발행</label>
                                            </div>
                                            <div>
                                                   <input
                                                type="checkbox"
                                                checked={Csm_Filter_States.csm_calendar_apply}
                                                    id='csm_calendar_apply'
                                                    onChange={e => handleChange(e, "csm_calendar_apply")}
                                                    disabled={UseRegisterSearch?true:false}
                                                readOnly
                                                ></input>
                                                <label htmlFor="csm_calendar_apply">Part 발주 요청</label>
                                             </div>
                                             <div>
                                                   <input
                                                type="checkbox"
                                                checked={Csm_Filter_States.csm_calendar_entering}
                                                    id='csm_calendar_entering'
                                                    onChange={e => handleChange(e, "csm_calendar_entering")}
                                                    disabled={UseRegisterSearch?true:false}
                                                readOnly
                                                ></input>
                                                <label htmlFor="csm_calendar_entering">Part 입고</label>
                                             </div>
                                             <div>
                                                   <input
                                                type="checkbox"
                                                checked={Csm_Filter_States.csm_calendar_ce}
                                                    id='csm_calendar_ce'
                                                    onChange={e => handleChange(e, "csm_calendar_ce")}
                                                    disabled={UseRegisterSearch?true:false}
                                                readOnly
                                                ></input>
                                                <label htmlFor="csm_calendar_ce">Part 수령</label>
                                            </div>
                                            
                                              <div>
                                                   <input
                                                type="checkbox"
                                                checked={Csm_Filter_States.csm_calendar_custom}
                                                    id='csm_calendar_custom'
                                                    onChange={e => handleChange(e, "csm_calendar_custom")}
                                                    disabled={UseRegisterSearch?true:false}
                                                readOnly
                                                ></input>
                                                <label htmlFor="csm_calendar_custom">작업완료</label>
                                             </div>
                                               <div>
                                                   <input
                                                type="checkbox"
                                                checked={Csm_Filter_States.csm_calendar_pay}
                                                    id='csm_calendar_pay'
                                                    onChange={e=>handleChange(e,"csm_calendar_pay")}
                                                readOnly
                                                ></input>
                                                <label htmlFor="csm_calendar_pay">인보이스 발행</label>
                                            </div>
                                              <div>
                                                   <input
                                                type="checkbox"
                                                checked={Csm_Filter_States.csm_calendar_finall}
                                                    id='csm_calendar_finall'
                                                    onChange={e=>handleChange(e,"csm_calendar_finall")}
                                                readOnly
                                                ></input>
                                                <label htmlFor="csm_calendar_finall">완료</label>
                                            </div>
                                              
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                </div>

                <div className="btns">
                    <button className="btn btn-cancel" onClick={()=>HandleFilterDataReset()} >
                        <span style={{ marginRight: '10px' }}>
                            <GrPowerReset></GrPowerReset>
                        </span>

                        <span>리셋</span>
                    </button>
                    <button className="btn btn-confirm" onClick={()=>HandleSubmitFilterDataApply()} >
                        <span style={{ marginRight: '10px' }}>
                            <GoSearch></GoSearch>
                        </span>

                        <span>검색</span>
                    </button>
                </div>
                
            </FilterSearchMainPageDivBox>
            <Modal isOpen={FilterSearchModalIsOpen} style={customStyles} onRequestClose={()=>Close_Filter_Modal()} >
                <FilterSearchModal SelectMenuTitle={SelectMenuTitle} Close_Filter_Modal={()=>Close_Filter_Modal()}></FilterSearchModal>
                </Modal>
                
        </FilterSelectMainDivBox>
    )
}

export default FilterSelect;