import React, { forwardRef, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { BsFillPencilFill, BsHandIndexThumbFill } from 'react-icons/bs';
import { GoSearch } from 'react-icons/go';
import { GrPowerReset, GrSearchAdvanced } from 'react-icons/gr';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { Csm_Filtering_Change_Data, initState } from '../../../../Models/Csm_Filtering_Reducer/CSmFilteringReducer';
import { Csm_Filtering_Reset_Data } from '../../../../Models/Csm_Filtering_Reducer/CSmFilteringReducer';
import FilterSearchModal from './FilterSearchModal/FilterSearchModal';
import Modal from 'react-modal';
import { Csm_Baisc_Data_Reduce_Thunk } from '../../../../Models/ReduxThunk/Csm_Basic_Data_Reducer/CsmBasicDataReducer';
import { Csm_Register_Data_Reduce_Thunk } from '../../../../Models/ReduxThunk/Csm_Regi_Data_Reducer/CsmRegiDataReducer';
import Select from 'react-select';
import { User_Select_Data_Reduce_Thunk } from '../../../../Models/ReduxThunk/User_Select_Reducer/UserSelectReducer';
import { MdOutlineTouchApp, MdPlaylistAdd } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { toast } from '../../ToastMessage/ToastManager';
import { Csm_Grade_Data_Reduce_Thunk } from '../../../../Models/ReduxThunk/Csm_Grade_Data_Reducer/Csn_Grade_Data_Reducer';

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
    margin-top: 30px;
`;

const Input_Color_Check_Container = styled.div`
    input[type='checkbox'] {
        background-color: ${props => props.color};
        accent-color: ${props => props.color};
    }
    input {
        &:checked {
            background-color: ${props => props.color};
            accent-color: ${props => props.color};
        }
    }
    .checked_lable {
        color: ${props => (props.color === 'white' ? 'black' : props.color)};
        font-weight: bolder;
    }
`;

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
            margin-top: 20px;
            .SearchInputContainerTitle {
                margin-right: 10px;
                line-height: 40px;
                width: 100px;
                h4 {
                    margin: 0px;
                }
            }
            .SearchInputContainerSubTitle {
                width: 100%;
                height: 100%;

                .SearchInputContainerSubTitleFlexDivBox {
                    display: flex;
                    width: 100%;
                    height: 100%;
                    .SearchIcons {
                        :hover {
                            cursor: pointer;
                        }
                    }
                    .IconsDivBox {
                        width: 10%;
                        height: 100%;
                        text-align: center;
                        border: 1px solid lightgray;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .InputRadioDivBox {
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        border-bottom: 1px solid lightgray;
                        width: 100%;
                    }

                    .InputDivBox {
                        width: 80%;
                        height: 100%;
                        position: relative;
                        h4 {
                            margin: 10px;
                        }
                        input,
                        select {
                            position: absolute;
                            left: 0px;
                            width: 100%;
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
                        select {
                            height: 100%;
                        }
                        .react-datepicker-wrapper {
                            height: 100%;
                            .react-datepicker__input-container {
                                height: 100%;
                                button {
                                    width: 100%;
                                    height: 100%;
                                    background-color: #fff;
                                    border: 1px solid lightgray;
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
    .FilteringContainer {
        .Select_OR_List_Container {
            display: block;
            height: 100%;
            margin-top: 0px;
            .Select_OR_List_Container_Title {
                width: 300px;
            }
            .Select_OR_List_Container_Sub_Title {
                border-bottom: 1px solid gray;
                width: 80%;
                margin: 0 auto;
                .Filter_Or_Array_Container {
                    border: 1px dashed gray;
                    padding: 5px;
                    display: inline-flex;
                    flex-flow: wrap;
                    align-items: center;
                    margin: 10px;
                    border-radius: 5px;
                    .Filter_Or_Array_Container_Icons {
                        margin-left: 10px;
                        color: red;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        :hover {
                            cursor: pointer;
                        }
                    }
                }
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
const getDayName = date => {
    return date
        .toLocaleDateString('ko-KR', {
            weekday: 'long',
        })
        .substr(0, 1);
};

const createDate = date => {
    return new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
};
const FilterSelect = ({ UseRegisterSearch }) => {
    const dispatch = useDispatch();
    const Login_Info = useSelector(state => state.LoginInfoDataReducer.Infomation);
    const Csm_Filter_States = useSelector(state => state.CSmFilteringReducer.Csm_Filter_State);
    const CsmSelectState = useSelector(state => state.CsmSelectReducer.Csm_Select_Data);
    const Csm_Invoice_Select_State = useSelector(state => state.CsmInvoiceSelectReducer.Csm_Invoice_Select_Data);
    const User_Select_Options_State = useSelector(state => state.UserSelectReducer.User_Data.User_Select_Options);
    const [FilterSearchModalIsOpen, setFilterSearchModalIsOpen] = useState(false);
    const [SelectMenuTitle, setSelectMenuTitle] = useState(null);
    const [Prepare_Filter_State, setPrepare_Filter_State] = useState({
        csm_basic_data_csm_number: [],
        csm_basic_data_csm_number_search_checked: false,

        csm_basic_data_model_number: [],
        csm_basic_data_model_number_search_checked: false,

        csm_basic_data_binds: [],
        csm_basic_data_binds_search_checked: false,

        csm_basic_data_custom: [],
        csm_basic_data_custom_search_checked: false,

        csm_basic_data_part_number: '',
        csm_basic_data_part_number_search_checked: false,

        csm_user_input_data_writer_id: null,
        csm_user_input_data_writer_id_search_checked: false,

        csm_user_input_start_date: new Date('2023-01-01'),
        csm_user_input_end_date: new Date(),
    });

    const HandleColorCheck = data => {
        if (data.csm_calendar_publish) {
            if (data.csm_calendar_apply) {
                if (data.csm_calendar_entering) {
                    if (data.csm_calendar_ce) {
                        if (data.csm_calendar_custom) {
                            if (data.csm_calendar_pay) {
                                if (data.csm_calendar_finall) {
                                    //완료
                                    return 'white';
                                } else {
                                    //미완료
                                    return 'purple';
                                }
                            } else {
                                //Invoice발행
                                return 'indigo';
                            }
                        } else {
                            //작업완료
                            return 'blue';
                        }
                    } else {
                        //Part 수령
                        return 'green';
                    }
                } else {
                    //Part 입고
                    return 'gold';
                }
            } else {
                //Part 발주요청
                return 'orange';
            }
        } else {
            // 발행 없음
            return 'red';
        }
    };

    const HandleFilterDataReset = () => {
        dispatch(Csm_Baisc_Data_Reduce_Thunk(1, initState.Csm_Filter_State, CsmSelectState));
        dispatch(Csm_Register_Data_Reduce_Thunk(1, initState.Csm_Filter_State, Csm_Invoice_Select_State));
        dispatch(Csm_Filtering_Reset_Data());
    };

    const Handle_Or_Condition_Add = Select => {
        if (Select === 'csm_basic_data_csm_number') {
            const data = Csm_Filter_States.csm_basic_data_csm_number;
            if (!data) {
                toast.show({
                    title: '필터내용을 작성 후 등록바랍니다.',
                    content: ``,
                    duration: 6000,
                    successCheck: false,
                });
                return;
            }
            dispatch(
                Csm_Filtering_Change_Data({
                    ...Csm_Filter_States,
                    csm_basic_data_csm_number: '',
                    csm_basic_data_csm_number_array: Csm_Filter_States.csm_basic_data_csm_number_array.concat(data),
                })
            );
        } else if (Select === 'csm_basic_data_model_number') {
            const data = Csm_Filter_States.csm_basic_data_model_number;
            if (!data) {
                toast.show({
                    title: '필터내용을 작성 후 등록바랍니다.',
                    content: ``,
                    duration: 6000,
                    successCheck: false,
                });
                return;
            }
            dispatch(
                Csm_Filtering_Change_Data({
                    ...Csm_Filter_States,
                    csm_basic_data_model_number: '',
                    csm_basic_data_model_number_array: Csm_Filter_States.csm_basic_data_model_number_array.concat(data),
                })
            );
        } else if (Select === 'csm_basic_data_binds') {
            const data = Csm_Filter_States.csm_basic_data_binds;
            if (!data) {
                toast.show({
                    title: '필터내용을 작성 후 등록바랍니다.',
                    content: ``,
                    duration: 6000,
                    successCheck: false,
                });
                return;
            }
            dispatch(
                Csm_Filtering_Change_Data({
                    ...Csm_Filter_States,
                    csm_basic_data_binds: '',
                    csm_basic_data_binds_array: Csm_Filter_States.csm_basic_data_binds_array.concat(data),
                })
            );
        } else if (Select === 'csm_basic_data_custom') {
            const data = Csm_Filter_States.csm_basic_data_custom;
            if (!data) {
                toast.show({
                    title: '필터내용을 작성 후 등록바랍니다.',
                    content: ``,
                    duration: 6000,
                    successCheck: false,
                });
                return;
            }
            dispatch(
                Csm_Filtering_Change_Data({
                    ...Csm_Filter_States,
                    csm_basic_data_custom: '',
                    csm_basic_data_custom_array: Csm_Filter_States.csm_basic_data_custom_array.concat(data),
                })
            );
        }
    };
    const Handle_Or_Condition_Delete = (Delete_Data, Select) => {
        if (Select === 'csm_basic_data_csm_number') {
            dispatch(
                Csm_Filtering_Change_Data({
                    ...Csm_Filter_States,
                    csm_basic_data_csm_number_array: Csm_Filter_States.csm_basic_data_csm_number_array.filter(item =>
                        item === Delete_Data ? '' : item
                    ),
                })
            );
        } else if (Select === 'csm_basic_data_model_number') {
            dispatch(
                Csm_Filtering_Change_Data({
                    ...Csm_Filter_States,
                    csm_basic_data_model_number_array: Csm_Filter_States.csm_basic_data_model_number_array.filter(item =>
                        item === Delete_Data ? '' : item
                    ),
                })
            );
        } else if (Select === 'csm_basic_data_binds') {
            dispatch(
                Csm_Filtering_Change_Data({
                    ...Csm_Filter_States,
                    csm_basic_data_binds_array: Csm_Filter_States.csm_basic_data_binds_array.filter(item =>
                        item === Delete_Data ? '' : item
                    ),
                })
            );
        } else if (Select === 'csm_basic_data_custom') {
            dispatch(
                Csm_Filtering_Change_Data({
                    ...Csm_Filter_States,
                    csm_basic_data_custom_array: Csm_Filter_States.csm_basic_data_custom_array.filter(item =>
                        item === Delete_Data ? '' : item
                    ),
                })
            );
        }
    };

    const handleChange = (e, Select) => {
        const Change_Filter_State = {
            ...Csm_Filter_States,
            csm_calendar_publish: false,
            csm_calendar_apply: false,
            csm_calendar_entering: false,
            csm_calendar_ce: false,
            csm_calendar_custom: false,
            csm_calendar_pay: false,
            csm_calendar_finall: false,
            cms_calendar_all: false,
            csm_hidden_checking: false,
        };

        if (Select === 'csm_basic_data_state') {
            dispatch(Csm_Filtering_Change_Data({ ...Csm_Filter_States, csm_basic_data_state: e.target.value }));
        } else if (Select === 'csm_basic_data_grade') {
            dispatch(Csm_Filtering_Change_Data({ ...Csm_Filter_States, csm_basic_data_grade: e.target.value }));
        } else if (Select === 'csm_basic_data_team') {
            dispatch(Csm_Filtering_Change_Data({ ...Csm_Filter_States, csm_basic_data_team: e.target.value }));
        } else if (Select === 'csm_basic_data_csm_number') {
            dispatch(Csm_Filtering_Change_Data({ ...Csm_Filter_States, csm_basic_data_csm_number: e.target.value }));
        } else if (Select === 'csm_basic_data_model_number') {
            dispatch(Csm_Filtering_Change_Data({ ...Csm_Filter_States, csm_basic_data_model_number: e.target.value }));
        } else if (Select === 'csm_basic_data_binds') {
            dispatch(Csm_Filtering_Change_Data({ ...Csm_Filter_States, csm_basic_data_binds: e.target.value }));
        } else if (Select === 'csm_basic_data_custom') {
            dispatch(Csm_Filtering_Change_Data({ ...Csm_Filter_States, csm_basic_data_custom: e.target.value }));
        } else if (Select === 'csm_basic_data_part_number') {
            dispatch(Csm_Filtering_Change_Data({ ...Csm_Filter_States, csm_basic_data_part_number: e.target.value }));
        } else if (Select === 'csm_user_input_data_writer_id') {
            dispatch(Csm_Filtering_Change_Data({ ...Csm_Filter_States, csm_user_input_data_writer_id: e }));
        } else if (Select === 'csm_user_input_start_date') {
            dispatch(Csm_Filtering_Change_Data({ ...Csm_Filter_States, csm_user_input_start_date: e }));
        } else if (Select === 'csm_user_input_end_date') {
            dispatch(Csm_Filtering_Change_Data({ ...Csm_Filter_States, csm_user_input_end_date: e }));
        } else if (Select === 'csm_parts') {
            dispatch(Csm_Filtering_Change_Data({ ...Csm_Filter_States, csm_parts: e.target.value }));
        } else if (Select === 'csm_calendar_publish') {
            if (e.target.checked) {
                // 선택
                dispatch(Csm_Filtering_Change_Data({ ...Change_Filter_State, csm_calendar_publish: true }));
            } else {
                // 해제
                dispatch(Csm_Filtering_Change_Data(Change_Filter_State));
            }
        } else if (Select === 'csm_calendar_apply') {
            if (e.target.checked) {
                // 선택
                dispatch(Csm_Filtering_Change_Data({ ...Change_Filter_State, csm_calendar_publish: true, csm_calendar_apply: true }));
            } else {
                // 해제
                dispatch(
                    Csm_Filtering_Change_Data({ ...Change_Filter_State, csm_calendar_publish: Csm_Filter_States.csm_calendar_publish })
                );
            }
        } else if (Select === 'csm_calendar_entering') {
            if (e.target.checked) {
                // 선택
                dispatch(
                    Csm_Filtering_Change_Data({
                        ...Change_Filter_State,
                        csm_calendar_publish: true,
                        csm_calendar_apply: true,
                        csm_calendar_entering: true,
                    })
                );
            } else {
                // 해제
                dispatch(
                    Csm_Filtering_Change_Data({
                        ...Change_Filter_State,
                        csm_calendar_publish: Csm_Filter_States.csm_calendar_publish,
                        csm_calendar_apply: Csm_Filter_States.csm_calendar_apply,
                    })
                );
            }
        } else if (Select === 'csm_calendar_ce') {
            if (e.target.checked) {
                // 선택
                dispatch(
                    Csm_Filtering_Change_Data({
                        ...Change_Filter_State,
                        csm_calendar_publish: true,
                        csm_calendar_apply: true,
                        csm_calendar_entering: true,
                        csm_calendar_ce: true,
                    })
                );
            } else {
                // 해제
                dispatch(
                    Csm_Filtering_Change_Data({
                        ...Change_Filter_State,
                        csm_calendar_publish: Csm_Filter_States.csm_calendar_publish,
                        csm_calendar_apply: Csm_Filter_States.csm_calendar_apply,
                        csm_calendar_entering: Csm_Filter_States.csm_calendar_entering,
                    })
                );
            }
        } else if (Select === 'csm_calendar_custom') {
            if (e.target.checked) {
                // 선택
                dispatch(
                    Csm_Filtering_Change_Data({
                        ...Change_Filter_State,
                        csm_calendar_publish: true,
                        csm_calendar_apply: true,
                        csm_calendar_entering: true,
                        csm_calendar_ce: true,
                        csm_calendar_custom: true,
                    })
                );
            } else {
                // 해제
                dispatch(
                    Csm_Filtering_Change_Data({
                        ...Change_Filter_State,
                        csm_calendar_publish: Csm_Filter_States.csm_calendar_publish,
                        csm_calendar_apply: Csm_Filter_States.csm_calendar_apply,
                        csm_calendar_entering: Csm_Filter_States.csm_calendar_entering,
                        csm_calendar_ce: Csm_Filter_States.csm_calendar_ce,
                    })
                );
            }
        } else if (Select === 'csm_calendar_pay') {
            if (e.target.checked) {
                // 선택
                dispatch(
                    Csm_Filtering_Change_Data({
                        ...Change_Filter_State,
                        csm_calendar_publish: true,
                        csm_calendar_apply: true,
                        csm_calendar_entering: true,
                        csm_calendar_ce: true,
                        csm_calendar_custom: true,
                        csm_calendar_pay: true,
                    })
                );
            } else {
                // 해제
                dispatch(
                    Csm_Filtering_Change_Data({
                        ...Change_Filter_State,
                        csm_calendar_publish: Csm_Filter_States.csm_calendar_publish,
                        csm_calendar_apply: Csm_Filter_States.csm_calendar_apply,
                        csm_calendar_entering: Csm_Filter_States.csm_calendar_entering,
                        csm_calendar_custom: Csm_Filter_States.csm_calendar_custom,
                        csm_calendar_ce: Csm_Filter_States.csm_calendar_ce,
                    })
                );
            }
        } else if (Select === 'csm_calendar_finall') {
            if (e.target.checked) {
                // 선택
                dispatch(
                    Csm_Filtering_Change_Data({
                        ...Change_Filter_State,
                        csm_calendar_publish: true,
                        csm_calendar_apply: true,
                        csm_calendar_entering: true,
                        csm_calendar_ce: true,
                        csm_calendar_custom: true,
                        csm_calendar_pay: true,
                        csm_calendar_finall: true,
                    })
                );
            } else {
                // 해제
                dispatch(
                    Csm_Filtering_Change_Data({
                        ...Change_Filter_State,
                        csm_calendar_publish: Csm_Filter_States.csm_calendar_publish,
                        csm_calendar_apply: Csm_Filter_States.csm_calendar_apply,
                        csm_calendar_entering: Csm_Filter_States.csm_calendar_entering,
                        csm_calendar_custom: Csm_Filter_States.csm_calendar_custom,
                        csm_calendar_pay: Csm_Filter_States.csm_calendar_pay,
                        csm_calendar_ce: Csm_Filter_States.csm_calendar_ce,
                    })
                );
            }
        } else if (Select === 'cms_calendar_all') {
            if (e.target.checked) {
                // 선택
                dispatch(Csm_Filtering_Change_Data({ ...Change_Filter_State, cms_calendar_all: true }));
            } else {
                // 해제
                dispatch(Csm_Filtering_Change_Data(Change_Filter_State));
            }
        } else if (Select === 'csm_hidden_checking') {
            if (e.target.checked) {
                // 선택
                dispatch(Csm_Filtering_Change_Data({ ...Csm_Filter_States, csm_hidden_checking: true }));
            } else {
                // 해제
                dispatch(Csm_Filtering_Change_Data({ ...Csm_Filter_States, csm_hidden_checking: false }));
            }
        }
    };

    const HandleClickModalSearchFilter = Select => {
        dispatch(
            Csm_Filtering_Change_Data({
                ...Csm_Filter_States,
                csm_basic_data_state_search_checked: false,
                csm_basic_data_grade_search_checked: false,
                csm_basic_data_csm_number_search_checked: false,
                csm_basic_data_model_number_search_checked: false,
                csm_basic_data_binds_search_checked: false,
                csm_basic_data_custom_search_checked: false,
                csm_basic_data_part_number_search_checked: false,
            })
        );
        setFilterSearchModalIsOpen(true);
        setSelectMenuTitle(Select);
        document.body.style.overflow = 'hidden';
    };

    const Close_Filter_Modal = () => {
        setFilterSearchModalIsOpen(false);

        document.body.style.overflow = 'unset';
    };

    const HandleSubmitFilterDataApply = () => {
        dispatch(Csm_Baisc_Data_Reduce_Thunk(1, Csm_Filter_States, CsmSelectState));
        dispatch(Csm_Register_Data_Reduce_Thunk(1, Csm_Filter_States, Csm_Invoice_Select_State));
        dispatch(Csm_Grade_Data_Reduce_Thunk(Csm_Filter_States));
    };

    useEffect(() => {
        dispatch(User_Select_Data_Reduce_Thunk());
    }, []);

    return (
        <FilterSelectMainDivBox>
            <FilterSearchMainPageDivBox>
                <div>
                    <div>
                        <div className="FilteringContainer">
                            <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>상태.</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="InputRadioDivBox">
                                            <div>
                                                <input
                                                    type="radio"
                                                    name="part"
                                                    value="All"
                                                    id="state_All"
                                                    checked={Csm_Filter_States.csm_basic_data_state === 'All'}
                                                    onChange={e => handleChange(e, 'csm_basic_data_state')}
                                                ></input>
                                                <label htmlFor="state_All">All</label>
                                            </div>
                                            <div>
                                                <input
                                                    type="radio"
                                                    name="part"
                                                    value="Open"
                                                    id="state_Open"
                                                    checked={Csm_Filter_States.csm_basic_data_state === 'Open'}
                                                    onChange={e => handleChange(e, 'csm_basic_data_state')}
                                                ></input>
                                                <label htmlFor="state_Open">Open</label>
                                            </div>
                                            <div>
                                                <input
                                                    type="radio"
                                                    name="part"
                                                    value="Close"
                                                    id="state_Close"
                                                    checked={Csm_Filter_States.csm_basic_data_state === 'Close'}
                                                    onChange={e => handleChange(e, 'csm_basic_data_state')}
                                                ></input>
                                                <label htmlFor="state_Close">Close</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="SearchInputContainerTitle">
                                    <h4>Part</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="InputRadioDivBox">
                                            <div>
                                                <input
                                                    type="radio"
                                                    name="state"
                                                    value="All"
                                                    id="part_All"
                                                    checked={Csm_Filter_States.csm_parts === 'All'}
                                                    onChange={e => handleChange(e, 'csm_parts')}
                                                ></input>
                                                <label htmlFor="part_All">All</label>
                                            </div>
                                            <div>
                                                <input
                                                    type="radio"
                                                    name="state"
                                                    value="없음"
                                                    id="part_not"
                                                    checked={Csm_Filter_States.csm_parts === '없음'}
                                                    onChange={e => handleChange(e, 'csm_parts')}
                                                ></input>
                                                <label htmlFor="part_not">없음</label>
                                            </div>
                                            <div>
                                                <input
                                                    type="radio"
                                                    name="state"
                                                    value="있음"
                                                    id="part_yes"
                                                    checked={Csm_Filter_States.csm_parts === '있음'}
                                                    onChange={e => handleChange(e, 'csm_parts')}
                                                ></input>
                                                <label htmlFor="part_yes">있음</label>
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
                                                <input
                                                    type="radio"
                                                    name="grade"
                                                    value="All"
                                                    id="grade_All"
                                                    checked={Csm_Filter_States.csm_basic_data_grade === 'All'}
                                                    onChange={e => handleChange(e, 'csm_basic_data_grade')}
                                                ></input>
                                                <label htmlFor="grade_All">All</label>
                                            </div>
                                            <div>
                                                <input
                                                    type="radio"
                                                    name="grade"
                                                    value="CDC"
                                                    id="grade_CDC"
                                                    checked={Csm_Filter_States.csm_basic_data_grade === 'CDC'}
                                                    onChange={e => handleChange(e, 'csm_basic_data_grade')}
                                                ></input>
                                                <label htmlFor="grade_CDC">CDC</label>
                                            </div>
                                            <div>
                                                <input
                                                    type="radio"
                                                    name="grade"
                                                    value="MDC"
                                                    id="grade_MDC"
                                                    checked={Csm_Filter_States.csm_basic_data_grade === 'MDC'}
                                                    onChange={e => handleChange(e, 'csm_basic_data_grade')}
                                                ></input>
                                                <label htmlFor="grade_MDC">MDC</label>
                                            </div>
                                            <div>
                                                <input
                                                    type="radio"
                                                    name="grade"
                                                    value="SDC"
                                                    id="grade_SDC"
                                                    checked={Csm_Filter_States.csm_basic_data_grade === 'SDC'}
                                                    onChange={e => handleChange(e, 'csm_basic_data_grade')}
                                                ></input>
                                                <label htmlFor="grade_SDC">SDC</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>팀.</h4>
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
                                                <input
                                                    type="radio"
                                                    name="team"
                                                    value="All"
                                                    id="team_All"
                                                    checked={Csm_Filter_States.csm_basic_data_team === 'All'}
                                                    onChange={e => handleChange(e, 'csm_basic_data_team')}
                                                ></input>
                                                <label htmlFor="grade_All">All</label>
                                            </div>
                                            <div>
                                                <input
                                                    type="radio"
                                                    name="team"
                                                    value="DICER"
                                                    id="team_DICER"
                                                    checked={Csm_Filter_States.csm_basic_data_team === 'DICER'}
                                                    onChange={e => handleChange(e, 'csm_basic_data_team')}
                                                ></input>
                                                <label htmlFor="team_DICER">DICER</label>
                                            </div>
                                            <div>
                                                <input
                                                    type="radio"
                                                    name="team"
                                                    value="GRINDER"
                                                    id="team_GRINDER"
                                                    checked={Csm_Filter_States.csm_basic_data_team === 'GRINDER'}
                                                    onChange={e => handleChange(e, 'csm_basic_data_team')}
                                                ></input>
                                                <label htmlFor="team_GRINDER">GRINDER</label>
                                            </div>
                                            <div>
                                                <input
                                                    type="radio"
                                                    name="team"
                                                    value="LASER"
                                                    id="team_LASER"
                                                    checked={Csm_Filter_States.csm_basic_data_team === 'LASER'}
                                                    onChange={e => handleChange(e, 'csm_basic_data_team')}
                                                ></input>
                                                <label htmlFor="team_LASER">LASER</label>
                                            </div>
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
                                            <Select
                                                options={User_Select_Options_State}
                                                onChange={e => handleChange(e, 'csm_user_input_data_writer_id')}
                                                isClearable={true}
                                                placeholder="이름 또는 Email을 검색.."
                                            ></Select>
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
                                                onChange={e => handleChange(e, 'csm_basic_data_csm_number')}
                                            ></input>
                                        </div>
                                        <div
                                            className="IconsDivBox SearchIcons"
                                            onClick={() => HandleClickModalSearchFilter('csm_basic_data_csm_number')}
                                        >
                                            <label>
                                                <GrSearchAdvanced></GrSearchAdvanced>
                                            </label>
                                        </div>
                                        <div
                                            style={{ fontSize: '1.5em' }}
                                            className="IconsDivBox SearchIcons"
                                            onClick={() => {
                                                Handle_Or_Condition_Add('csm_basic_data_csm_number');
                                            }}
                                        >
                                            <label>
                                                <MdPlaylistAdd></MdPlaylistAdd>
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
                                                onChange={e => handleChange(e, 'csm_basic_data_model_number')}
                                            ></input>
                                        </div>
                                        <div
                                            className="IconsDivBox SearchIcons"
                                            onClick={() => HandleClickModalSearchFilter('csm_basic_data_model_number')}
                                        >
                                            <label>
                                                <GrSearchAdvanced></GrSearchAdvanced>
                                            </label>
                                        </div>
                                        <div
                                            style={{ fontSize: '1.5em' }}
                                            className="IconsDivBox SearchIcons"
                                            onClick={() => {
                                                Handle_Or_Condition_Add('csm_basic_data_model_number');
                                            }}
                                        >
                                            <label>
                                                <MdPlaylistAdd></MdPlaylistAdd>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="SearchInputContainer Select_OR_List_Container">
                                <div className="SearchInputContainerTitle Select_OR_List_Container_Title">
                                    <h4>CSM번호(LIST)</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle Select_OR_List_Container_Sub_Title">
                                    {Csm_Filter_States.csm_basic_data_csm_number_array.map(item => {
                                        return (
                                            <div className="Filter_Or_Array_Container">
                                                <div key={item} className="Filter_Or_Array_Container_Content">
                                                    {item}
                                                </div>
                                                <div
                                                    className="Filter_Or_Array_Container_Icons"
                                                    onClick={() => Handle_Or_Condition_Delete(item, 'csm_basic_data_csm_number')}
                                                >
                                                    <IoClose></IoClose>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="SearchInputContainer Select_OR_List_Container">
                                <div className="SearchInputContainerTitle Select_OR_List_Container_Title">
                                    <h4>장비Model(LIST)</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle Select_OR_List_Container_Sub_Title">
                                    {Csm_Filter_States.csm_basic_data_model_number_array.map(item => {
                                        return (
                                            <div className="Filter_Or_Array_Container">
                                                <div key={item} className="Filter_Or_Array_Container_Content">
                                                    {item}
                                                </div>
                                                <div
                                                    className="Filter_Or_Array_Container_Icons"
                                                    onClick={() => Handle_Or_Condition_Delete(item, 'csm_basic_data_model_number')}
                                                >
                                                    <IoClose></IoClose>
                                                </div>
                                            </div>
                                        );
                                    })}
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
                                                onChange={e => handleChange(e, 'csm_basic_data_binds')}
                                            ></input>
                                        </div>
                                        <div
                                            className="IconsDivBox SearchIcons"
                                            onClick={() => HandleClickModalSearchFilter('csm_basic_data_binds')}
                                        >
                                            <label>
                                                <GrSearchAdvanced></GrSearchAdvanced>
                                            </label>
                                        </div>
                                        <div
                                            style={{ fontSize: '1.5em' }}
                                            className="IconsDivBox SearchIcons"
                                            onClick={() => {
                                                Handle_Or_Condition_Add('csm_basic_data_binds');
                                            }}
                                        >
                                            <label>
                                                <MdPlaylistAdd></MdPlaylistAdd>
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
                                                onChange={e => handleChange(e, 'csm_basic_data_custom')}
                                            ></input>
                                        </div>
                                        <div
                                            className="IconsDivBox SearchIcons"
                                            onClick={() => HandleClickModalSearchFilter('csm_basic_data_custom')}
                                        >
                                            <label>
                                                <GrSearchAdvanced></GrSearchAdvanced>
                                            </label>
                                        </div>
                                        <div
                                            style={{ fontSize: '1.5em' }}
                                            className="IconsDivBox SearchIcons"
                                            onClick={() => {
                                                Handle_Or_Condition_Add('csm_basic_data_custom');
                                            }}
                                        >
                                            <label>
                                                <MdPlaylistAdd></MdPlaylistAdd>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="SearchInputContainer Select_OR_List_Container">
                                <div className="SearchInputContainerTitle Select_OR_List_Container_Title">
                                    <h4>제번(LIST)</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle Select_OR_List_Container_Sub_Title">
                                    {Csm_Filter_States.csm_basic_data_binds_array.map(item => {
                                        return (
                                            <div className="Filter_Or_Array_Container">
                                                <div key={item} className="Filter_Or_Array_Container_Content">
                                                    {item}
                                                </div>
                                                <div
                                                    className="Filter_Or_Array_Container_Icons"
                                                    onClick={() => Handle_Or_Condition_Delete(item, 'csm_basic_data_binds')}
                                                >
                                                    <IoClose></IoClose>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="SearchInputContainer Select_OR_List_Container">
                                <div className="SearchInputContainerTitle Select_OR_List_Container_Title">
                                    <h4>최초 납품처(LIST)</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle Select_OR_List_Container_Sub_Title">
                                    {Csm_Filter_States.csm_basic_data_custom_array.map(item => {
                                        return (
                                            <div className="Filter_Or_Array_Container">
                                                <div key={item} className="Filter_Or_Array_Container_Content">
                                                    {item}
                                                </div>
                                                <div
                                                    className="Filter_Or_Array_Container_Icons"
                                                    onClick={() => Handle_Or_Condition_Delete(item, 'csm_basic_data_custom')}
                                                >
                                                    <IoClose></IoClose>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {UseRegisterSearch ? (
                                <>
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
                                                        onChange={e => handleChange(e, 'csm_basic_data_part_number')}
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="SearchInputContainer"></div>
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
                                                        dateFormat={'yyyy-MM-dd'}
                                                        selected={Csm_Filter_States.csm_user_input_start_date}
                                                        maxDate={Csm_Filter_States.csm_user_input_end_date}
                                                        onChange={e => handleChange(e, 'csm_user_input_start_date')}
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
                                                        dateFormat={'yyyy-MM-dd'}
                                                        selected={Csm_Filter_States.csm_user_input_end_date}
                                                        maxDate={new Date()}
                                                        onChange={e => handleChange(e, 'csm_user_input_end_date')}
                                                    ></DatePicker>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
                            <div className="SearchInputContainer" style={{ width: '90%', marginBottom: '30px' }}>
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
                                            <Input_Color_Check_Container color={`${HandleColorCheck(Csm_Filter_States)}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={Csm_Filter_States.cms_calendar_all}
                                                    id="cms_calendar_all"
                                                    onChange={e => handleChange(e, 'cms_calendar_all')}
                                                    readOnly
                                                ></input>
                                                <label htmlFor="cms_calendar_all">전체</label>
                                            </Input_Color_Check_Container>
                                            <Input_Color_Check_Container color={`${HandleColorCheck(Csm_Filter_States)}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={Csm_Filter_States.csm_calendar_publish}
                                                    id="csm_calendar_publish"
                                                    onChange={e => handleChange(e, 'csm_calendar_publish')}
                                                    readOnly
                                                    disabled={UseRegisterSearch ? true : false}
                                                ></input>
                                                <label
                                                    className={`${Csm_Filter_States.csm_calendar_publish ? 'checked_lable' : ''}`}
                                                    htmlFor="csm_calendar_publish"
                                                >
                                                    발행
                                                </label>
                                            </Input_Color_Check_Container>
                                            <Input_Color_Check_Container color={`${HandleColorCheck(Csm_Filter_States)}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={Csm_Filter_States.csm_calendar_apply}
                                                    id="csm_calendar_apply"
                                                    onChange={e => handleChange(e, 'csm_calendar_apply')}
                                                    disabled={UseRegisterSearch ? true : false}
                                                    readOnly
                                                ></input>
                                                <label
                                                    className={`${Csm_Filter_States.csm_calendar_apply ? 'checked_lable' : ''}`}
                                                    htmlFor="csm_calendar_apply"
                                                >
                                                    Part 발주 요청
                                                </label>
                                            </Input_Color_Check_Container>
                                            <Input_Color_Check_Container color={`${HandleColorCheck(Csm_Filter_States)}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={Csm_Filter_States.csm_calendar_entering}
                                                    id="csm_calendar_entering"
                                                    onChange={e => handleChange(e, 'csm_calendar_entering')}
                                                    disabled={UseRegisterSearch ? true : false}
                                                    readOnly
                                                ></input>
                                                <label
                                                    className={`${Csm_Filter_States.csm_calendar_entering ? 'checked_lable' : ''}`}
                                                    htmlFor="csm_calendar_entering"
                                                >
                                                    Part 입고
                                                </label>
                                            </Input_Color_Check_Container>
                                            <Input_Color_Check_Container color={`${HandleColorCheck(Csm_Filter_States)}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={Csm_Filter_States.csm_calendar_ce}
                                                    id="csm_calendar_ce"
                                                    onChange={e => handleChange(e, 'csm_calendar_ce')}
                                                    disabled={UseRegisterSearch ? true : false}
                                                    readOnly
                                                ></input>
                                                <label
                                                    className={`${Csm_Filter_States.csm_calendar_ce ? 'checked_lable' : ''}`}
                                                    htmlFor="csm_calendar_ce"
                                                >
                                                    Part 수령
                                                </label>
                                            </Input_Color_Check_Container>

                                            <Input_Color_Check_Container color={`${HandleColorCheck(Csm_Filter_States)}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={Csm_Filter_States.csm_calendar_custom}
                                                    id="csm_calendar_custom"
                                                    onChange={e => handleChange(e, 'csm_calendar_custom')}
                                                    disabled={UseRegisterSearch ? true : false}
                                                    readOnly
                                                ></input>
                                                <label
                                                    className={`${Csm_Filter_States.csm_calendar_custom ? 'checked_lable' : ''}`}
                                                    htmlFor="csm_calendar_custom"
                                                >
                                                    작업완료
                                                </label>
                                            </Input_Color_Check_Container>
                                            <Input_Color_Check_Container color={`${HandleColorCheck(Csm_Filter_States)}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={Csm_Filter_States.csm_calendar_pay}
                                                    id="csm_calendar_pay"
                                                    onChange={e => handleChange(e, 'csm_calendar_pay')}
                                                    readOnly
                                                ></input>
                                                <label
                                                    className={`${Csm_Filter_States.csm_calendar_pay ? 'checked_lable' : ''}`}
                                                    htmlFor="csm_calendar_pay"
                                                >
                                                    인보이스 발행
                                                </label>
                                            </Input_Color_Check_Container>
                                            <Input_Color_Check_Container color={`${HandleColorCheck(Csm_Filter_States)}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={Csm_Filter_States.csm_calendar_finall}
                                                    id="csm_calendar_finall"
                                                    onChange={e => handleChange(e, 'csm_calendar_finall')}
                                                    readOnly
                                                ></input>
                                                <label
                                                    className={`${Csm_Filter_States.csm_calendar_finall ? 'checked_lable' : ''}`}
                                                    htmlFor="csm_calendar_finall"
                                                >
                                                    완료
                                                </label>
                                            </Input_Color_Check_Container>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="btns">
                    <button className="btn btn-cancel" onClick={() => HandleFilterDataReset()}>
                        <span style={{ marginRight: '10px' }}>
                            <GrPowerReset></GrPowerReset>
                        </span>

                        <span>리셋</span>
                    </button>
                    <button className="btn btn-confirm" onClick={() => HandleSubmitFilterDataApply()}>
                        <span style={{ marginRight: '10px' }}>
                            <GoSearch></GoSearch>
                        </span>

                        <span>검색</span>
                    </button>
                </div>
            </FilterSearchMainPageDivBox>
            <Modal isOpen={FilterSearchModalIsOpen} style={customStyles} onRequestClose={() => Close_Filter_Modal()}>
                <FilterSearchModal SelectMenuTitle={SelectMenuTitle} Close_Filter_Modal={() => Close_Filter_Modal()}></FilterSearchModal>
            </Modal>
        </FilterSelectMainDivBox>
    );
};

export default FilterSelect;
