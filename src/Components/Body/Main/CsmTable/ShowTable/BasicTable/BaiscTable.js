import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import {
    Csm_Baisc_Data_Reduce_Thunk,
    Csm_Basic_Data_Change_Checked,
} from '../../../../../../Models/ReduxThunk/Csm_Basic_Data_Reducer/CsmBasicDataReducer';
import Publish from '../../Publish/Publish';
import Apply from '../../Apply/Apply';
import Entering from '../../Entering/Entering';
import Ce from '../../CE/Ce';
import Custom from '../../Custom/Custom';
import Pay from '../../Pay/Pay';
import { Csm_Select_Add_Data, Csm_Select_Delete_Data } from '../../../../../../Models/Csm_Select_Reducer/CsmSelectReducer';
import { Loader_Check_For_False, Loader_Check_For_True } from '../../../../../../Models/LoaderCheckReducer/LoaderCheckReducer';
import PageNation from '../../../PageNation/PageNation';
const TestMainPage = styled.div`
    background-color: #efefef;

    .Table_Header_Container {
        position: sticky;
        top: 0px;
        background: #efefef;
    }

    .Table_Header {
        position: sticky;
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: flex-start;
        padding: 0px;
        border-top: 1px solid gray;
        border-bottom: 1px solid gray;
        margin: 0px;
        align-items: center;
        box-shadow: 1px 1px 1px 1px lightgray;
        li {
            width: 10%;
            font-weight: bolder;
            padding: 5px;
            padding-bottom: 10px;
            padding-top: 10px;
            font-size: 1.1em;
        }
        :first-child {
            text-align: start;
            padding-left: 10px;
        }
        :nth-child(8) {
            border-left: 1px solid gray;
        }
        :nth-child(13) {
            border-right: 1px solid gray;
        }
    }

    .Table_Body {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: flex-start;
        padding: 0px;
        border: 1px solid lightgray;
        box-shadow: 1px 1px 1px 1px lightgray;
        margin: 0px;
        margin-top: 5px;

        li {
            width: 10%;
            height: 50px;
            overflow: hidden;
            line-height: 40px;
            text-overflow: ellipsis;
            white-space: nowrap;
            background-color: #fff;
            padding: 5px;
            font-weight: 500;
        }
        :first-child {
            text-align: center;
        }
        :nth-child(8) {
            border-left: 1px solid gray;
        }
        :nth-child(13) {
            border-right: 1px solid gray;
        }
    }

    .Checking_Background {
        li {
            background-color: #f3f4fb !important;
        }
    }
`;

const BasicTable = () => {
    const dispatch = useDispatch();
    const Csm_Data = useSelector(state => state.CsmBasicDataReducer.Csm_Basic_Data_State.Csm_Data);
    const Csm_Filter_state = useSelector(state => state.CSmFilteringReducer.Csm_Filter_State);
    const CsmSelectState = useSelector(state => state.CsmSelectReducer.Csm_Select_Data);
    const Csm_Data_LoadingCheck = useSelector(state => state.CsmBasicDataReducer.Csm_Basic_Data_State.loading);
    const totalPages = useSelector(state => state.CsmBasicDataReducer.Csm_Basic_Data_State.All_Count);
    const PageNumbers = useSelector(state => state.Csm_PageNation_Reducer.PageNumbers);

    const Border_Color_Checking = data => {
        if (data.csm_publish_id) {
            if (data.csm_apply_id) {
                if (data.csm_entering_id) {
                    if (data.csm_ce_id) {
                        if (data.csm_custom_id) {
                            if (data.csm_pay_id) {
                                if (data.csm_finall_id) {
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
                    return 'yellow';
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

    const HandleCheckData = (e, data) => {
        if (e.target.checked) {
            /// 체크되어 있지 않을때 , 데이터 추가

            //redux_CsmSelect에 추가
            dispatch(Csm_Select_Add_Data(CsmSelectState.concat(data)));

            //redux_Thunk_Csm_Basic_Data 기존 데이터 체크추가

            dispatch(
                Csm_Basic_Data_Change_Checked(
                    Csm_Data.map(list => (list.csm_basic_data_csm_key === data.csm_basic_data_csm_key ? { ...list, checked: true } : list))
                )
            );
        } else {
            /// 체크되어 있을때 , 데이터 제거

            //redux에 제거
            dispatch(
                Csm_Select_Delete_Data(
                    CsmSelectState.filter(list => (list.csm_basic_data_csm_key !== data.csm_basic_data_csm_key ? list : ''))
                )
            );

            //기존 데이터 체크추가

            dispatch(
                Csm_Basic_Data_Change_Checked(
                    Csm_Data.map(list => (list.csm_basic_data_csm_key === data.csm_basic_data_csm_key ? { ...list, checked: false } : list))
                )
            );
        }
    };

    const Table_Axios = async () => {
        try {
            dispatch(Csm_Baisc_Data_Reduce_Thunk(PageNumbers, Csm_Filter_state, CsmSelectState));
        } catch (error) {
            console.log(error);
        }
    };

    const Loading_Change = () => {
        if (Csm_Data_LoadingCheck) {
            dispatch(Loader_Check_For_True());
        } else {
            dispatch(Loader_Check_For_False());
        }
    };

    useEffect(() => {
        /// 페이지 변경 시 마다
        Table_Axios();
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [PageNumbers]);

    useEffect(() => {
        /// Loading 환경 확인
        Loading_Change();
    }, [Csm_Data_LoadingCheck]);

    return (
        <TestMainPage>
            <div className="Table_Header_Container">
                <ul className="Table_Header">
                    <li style={{ width: '50px' }}>No.</li>
                    <li style={{ width: '80px' }}>선택</li>
                    <li style={{ width: '80px' }}>상태</li>
                    <li style={{ width: '80px' }}>등급</li>
                    <li>CSM</li>
                    <li>MODEL</li>
                    <li>제번</li>
                    <li>최초 납품처</li>
                    <li style={{ width: '100px' }}>
                        발행
                        <br />
                    </li>
                    <li style={{ width: '100px', lineHeight: '25px' }}>
                        Part <br />
                        발주요청
                    </li>
                    <li style={{ width: '100px', lineHeight: '25px' }}>
                        Part <br />
                        입고
                    </li>
                    <li style={{ width: '100px', lineHeight: '25px' }}>
                        Part
                        <br /> 수령
                    </li>
                    <li style={{ width: '100px' }}>작업완료</li>
                    <li style={{ width: '100px', lineHeight: '25px' }}>
                        Invoice
                        <br /> 발행
                    </li>
                    <li style={{ width: '100px' }}>작업시간</li>
                    <li style={{ width: '100px' }}>작업인원</li>
                    <li>비고</li>
                </ul>
            </div>
            <div>
                {Csm_Data?.map((list, j) => {
                    return (
                        <ul
                            className={`Table_Body ${list.checked === 'false' || list.checked === false ? '' : 'Checking_Background'}`}
                            key={list.csm_basic_data_csm_key}
                            style={list.checked === 'false' || list.checked === false ? {} : { border: '1px solid #368' }}
                        >
                            <li style={{ width: '50px' }}>{j + 1}.</li>
                            <li style={{ display: 'flex', width: '80px' }}>
                                <div
                                    style={{
                                        background: `${Border_Color_Checking(list)}`,
                                        width: '5px',
                                        height: '100%',
                                        marginRight: '10px',
                                        borderRadius: '10px',
                                    }}
                                ></div>
                                <input
                                    type="checkbox"
                                    onClick={e => HandleCheckData(e, list)}
                                    disabled={Border_Color_Checking(list) === 'blue' ? false : true}
                                    style={Border_Color_Checking(list) === 'blue' ? {} : { opacity: 0.1 }}
                                    checked={list.checked === 'false' || list.checked === false ? false : true}
                                ></input>
                            </li>
                            <li style={{ width: '80px' }}>{list.csm_basic_data_state}</li>
                            <li style={{ width: '80px' }}>{list.csm_basic_data_grade}</li>
                            <li>{list.csm_basic_data_csm_number}</li>
                            <li>{list.csm_basic_data_model_number}</li>
                            <li>{list.csm_basic_data_binds}</li>
                            <li>{list.csm_basic_data_custom}</li>
                            <li style={{ width: '100px' }}>
                                {/* 발행 */}
                                <Publish data={list}></Publish>
                            </li>
                            <li style={{ width: '100px' }}>
                                {/* 신청 */}
                                <Apply data={list}></Apply>
                            </li>
                            <li style={{ width: '100px' }}>
                                {/* 입고 */}
                                <Entering data={list}></Entering>
                            </li>
                            <li style={{ width: '100px' }}>
                                {/* CE */}
                                <Ce data={list}></Ce>
                            </li>
                            <li style={{ width: '100px' }}>
                                {/* 고객 */}
                                <Custom data={list}></Custom>
                            </li>
                            <li style={{ width: '100px' }}>
                                {/* PAY */}
                                <Pay data={list}></Pay>
                            </li>
                            <li style={{ width: '100px', paddingLeft: '10px' }}>{list.csm_basic_data_working_hours} 시간</li>
                            <li style={{ width: '100px' }}>{list.csm_basic_data_working_count} 명</li>
                            <li>{list.csm_basic_data_etc}</li>
                        </ul>
                    );
                })}
            </div>
            <div style={{ marginTop: '50px' }}></div>
            <PageNation totalPagesss={totalPages} currentPage={PageNumbers}></PageNation>
        </TestMainPage>
    );
};

export default BasicTable;
