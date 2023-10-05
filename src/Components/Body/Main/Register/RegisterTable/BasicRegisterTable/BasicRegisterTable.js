import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import Finall from '../../../CsmTable/Finall/Finall';
import Pay from '../../../CsmTable/Pay/Pay';
import Custom from '../../../CsmTable/Custom/Custom';
import Ce from '../../../CsmTable/CE/Ce';
import Entering from '../../../CsmTable/Entering/Entering';
import Apply from '../../../CsmTable/Apply/Apply';
import Publish from '../../../CsmTable/Publish/Publish';
import { Csm_Register_Data_Reduce_Thunk } from '../../../../../../Models/ReduxThunk/Csm_Regi_Data_Reducer/CsmRegiDataReducer';

const NewRegisterTableMainDivBox = styled.div`
    border: 1px solid black;
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
            width: 8%;
            font-weight: bolder;
            padding: 5px;
            padding-bottom: 10px;
            padding-top: 10px;
            font-size: 1.1em;
        }
    }

    .Table_Body {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: flex-start;
        align-items: center;
        padding: 0px;
        border: 2px solid lightgray;
        box-shadow: 1px 1px 1px 1px lightgray;
        margin: 0px;
        margin-top: 5px;
        background-color: #fff;

        .Sub_Data_Container {
            height: 100%;
            width: 100%;
            .Sub_Data_List {
                display: flex;
                justify-content: space-between;
                align-items: center;
                li {
                    width: 10%;
                }
            }
        }
        li {
            overflow: hidden;

            text-overflow: ellipsis;
            white-space: nowrap;
            background-color: #fff;
            padding: 5px;
            font-weight: 500;
        }
    }
    .BackgroundOPening {
        background-color: #efefef;
        li {
            background-color: #efefef;
        }
    }
`;

const BasicRegisterTable = () => {
    const dispatch = useDispatch();
    const Csm_Filter_State = useSelector(state => state.CSmFilteringReducer.Csm_Filter_State);
    const Csm_Register_State = useSelector(state => state.CsmRegiDataReducer.Csm_Register_Data_State);
    const Csm_Invoice_Select_State = useSelector(state => state.CsmInvoiceSelectReducer.Csm_Invoice_Select_Data);

    useEffect(() => {
        dispatch(Csm_Register_Data_Reduce_Thunk(1, Csm_Filter_State, Csm_Invoice_Select_State));
    }, []);

    return (
        <NewRegisterTableMainDivBox>
            <div className="Table_Header_Container">
                <ul className="Table_Header">
                    <li>No.</li>
                    <li>작업일자</li>
                    <li>CSM 장소</li>
                    <li>등급</li>
                    <li>CSM</li>
                    <li>MODEL</li>
                    <li>제번</li>
                    <li>발행</li>
                    <li>
                        Part <br />
                        발주요청
                    </li>
                    <li>
                        Part <br />
                        입고
                    </li>
                    <li>
                        Part
                        <br /> 수령
                    </li>
                    <li>작업완료</li>
                    <li>
                        Invoice
                        <br /> 발행
                    </li>
                    <li>비고</li>
                </ul>
            </div>
            <div>
                {Csm_Register_State?.Regi_Csm_Data?.map((list, j) => {
                    return (
                        <ul className={`Table_Body ${j % 2 === 0 ? 'BackgroundOPening' : ''}`}>
                            <li>{j + 1}.</li>
                            <li style={{ width: '10%', textAlign: 'center' }}>
                                <div>{list.Main_Data.csm_user_input_data_start_working_date}</div>
                                <div>~</div>
                                <div>{list.Main_Data.csm_user_input_data_end_working_date}</div>
                            </li>
                            <li style={{ width: '10%' }}>
                                <div>{list.Main_Data.csm_user_input_list_custom_name}</div>
                            </li>
                            <li className="Sub_Data_Container">
                                {list.Sub_Data.map(item => {
                                    return (
                                        <div className="Sub_Data_List">
                                            <li>{item.csm_basic_data_grade}</li>
                                            <li>{item.csm_basic_data_csm_number}</li>
                                            <li>{item.csm_basic_data_model_number}</li>
                                            <li>{item.csm_basic_data_binds}</li>
                                            <li>
                                                <Publish data={item}></Publish>
                                            </li>
                                            <li>
                                                <Apply data={item}></Apply>
                                            </li>
                                            <li>
                                                <Entering data={item}></Entering>
                                            </li>
                                            <li>
                                                <Ce data={item}></Ce>
                                            </li>
                                        </div>
                                    );
                                })}
                            </li>
                            <li style={{ width: '8%' }}>
                                <div>
                                    <Custom data={list.Main_Data}></Custom>
                                </div>
                            </li>
                            <li style={{ width: '8%' }}>
                                <div>
                                    <Pay data={list.Main_Data}></Pay>
                                </div>
                            </li>
                            <li style={{ width: '8%' }}>
                                <div>
                                    <Finall data={list.Main_Data}></Finall>
                                </div>
                            </li>
                            <li style={{ width: '10%' }}>
                                {list.Sub_Data.map(item => {
                                    return <div>{item.csm_basic_data_etc}</div>;
                                })}
                            </li>
                        </ul>
                    );
                })}
            </div>
        </NewRegisterTableMainDivBox>
    );
};

export default BasicRegisterTable;
