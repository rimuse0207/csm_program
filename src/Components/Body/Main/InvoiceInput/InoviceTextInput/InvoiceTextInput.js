import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { FaCashRegister } from 'react-icons/fa';
import { GrPowerReset } from 'react-icons/gr';
import { useHistory } from 'react-router-dom';
import { request } from '../../../../../APIs/index';
import { Csm_Invoice_Select_Reset_Data } from '../../../../../Models/Csm_Select_Reducer/CsmInvoiceSelectReducer';
import { toast } from '../../../ToastMessage/ToastManager';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import moment from 'moment';
import { Csm_Grade_Data_Reduce_Thunk } from '../../../../../Models/ReduxThunk/Csm_Grade_Data_Reducer/Csn_Grade_Data_Reducer';

const InvoiceTextInputMainDivBox = styled.div`
    padding: 10px;
    margin-top: 30px;
    font-size: 1em;
    input {
        border: 1px solid lightgray;
        height: 40px;
        width: 500px;
        border-radius: 10px;
        outline: none;
        padding-left: 10px;
    }
    .btns {
        margin-top: 30px;
        text-align: end;
        width: 80%;
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

const InvoiceTextInput = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const Csm_Filter_state = useSelector(state => state.CSmFilteringReducer.Csm_Filter_State);
    const Csm_Invoice_Select_State = useSelector(state => state.CsmInvoiceSelectReducer.Csm_Invoice_Select_Data);
    const Login_Info = useSelector(state => state.LoginInfoDataReducer.Infomation);
    const [InvoiceNumber, setInvoiceNumber] = useState(new Date());
    const HandleSubmitInvoiceApply = async () => {
        try {
            const Handle_Submit_Invoice_Apply_Axios = await request.post('/CE_Calendar_app_server/Handle_Submit_Invoice_Apply', {
                Csm_Invoice_Select_State,
                Login_Info,
                InvoiceNumber,
            });
            if (Handle_Submit_Invoice_Apply_Axios.data.DupleChecking) {
                toast.show({
                    title: `Invoice 등록 실패`,
                    content: `Invoice 번호가 중복되었습니다. 다시 한번 확인 바랍니다.`,
                    duration: 6000,
                    successCheck: false,
                });
                return;
            } else if (Handle_Submit_Invoice_Apply_Axios.data.dataSuccess) {
                const width = 800; // 새 창의 너비
                const height = 600; // 새 창의 높이

                const left = (window.innerWidth - width) / 2; // 화면 중앙으로 위치 조정
                const top = (window.innerHeight - height) / 2; // 화면 중앙으로 위치 조정
                const options = `width=${width},height=${height},left=${left},top=${top}`;

                window.open(
                    `/Invoice_Printer/${moment(InvoiceNumber).format('YYYY-MM-DD')}/${
                        Handle_Submit_Invoice_Apply_Axios.data.InvoiceNumber_keys
                    }/${Handle_Submit_Invoice_Apply_Axios.data.Travel_Fee_Unit}/${Handle_Submit_Invoice_Apply_Axios.data.Hotel_Count}/${
                        Handle_Submit_Invoice_Apply_Axios.data.Hotel_Cost
                    }/${Handle_Submit_Invoice_Apply_Axios.data.service_time}/${Handle_Submit_Invoice_Apply_Axios.data.Total_Cost}`,
                    '_blank',
                    options
                );
                toast.show({
                    title: `Invoice 등록 성공`,
                    content: `${Csm_Invoice_Select_State.length}건에 대해 Invoice등록 처리 하였습니다.`,
                    duration: 6000,
                    successCheck: true,
                });
                dispatch(Csm_Grade_Data_Reduce_Thunk(Csm_Filter_state));
                dispatch(Csm_Invoice_Select_Reset_Data());

                history.push('/Csm_Invoice_Pay_Finished');
            } else {
                console.log(Handle_Submit_Invoice_Apply_Axios);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const HandleInvoiceDataReset = () => {
        history.push('/Register_Csm');
    };

    return (
        <InvoiceTextInputMainDivBox>
            <div style={{ marginBottom: '10px' }}>현재 선택된 CSM은 총 {Csm_Invoice_Select_State.length}건 입니다.</div>

            <div style={{ marginBottom: '10px' }}>
                현재 선택된 CSM 총 합계 금액은{' '}
                <span style={{ color: 'red' }}>
                    ￥
                    {Csm_Invoice_Select_State.reduce((acc, obj) => {
                        var subData = obj.Sub_Data;
                        var subTotal = subData.reduce(function (subAcc, subObj) {
                            return subAcc + subObj.csm_user_input_data_total_cost;
                        }, 0);
                        return acc + subTotal;
                    }, 0).toLocaleString()}{' '}
                </span>
                입니다.
            </div>
            <div style={{ marginBottom: '30px' }}>등록 하실 Inovice를 입력 해 주세요.</div>

            <h3>Invoice 발행날짜를 선택 해 주세요.</h3>
            <DatePicker
                locale={ko}
                dateFormat={'yyyy-MM-dd'}
                selected={InvoiceNumber}
                maxDate={new Date()}
                onChange={e => setInvoiceNumber(e)}
            ></DatePicker>
            <div className="btns">
                <button className="btn btn-cancel" onClick={() => HandleInvoiceDataReset()}>
                    <span style={{ marginRight: '10px' }}>
                        <GrPowerReset></GrPowerReset>
                    </span>

                    <span>취소</span>
                </button>
                <button className="btn btn-confirm" onClick={() => HandleSubmitInvoiceApply()}>
                    <span style={{ marginRight: '10px' }}>
                        <FaCashRegister></FaCashRegister>
                    </span>
                    <span>등록</span>
                </button>
            </div>
        </InvoiceTextInputMainDivBox>
    );
};

export default InvoiceTextInput;
