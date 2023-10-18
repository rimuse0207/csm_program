import React, { useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import Navigation from '../../../Nav/Navigation';
import InputHotel from './InputHotel/InputHotel';
import InputStart from './InputStart/InputStart';
import InputCustom from './InputCustom/InputCustom';
import InputCsmNumber from './InputCsmNumber/InputCsmNumber';
import InputModelNumber from './InputModelNumber/InputModelNumber';
import SelectTable from './Select_Table/SelectTable';
import InputBinds from './InputBinds/InputBinds';
import RoundTrip from './RoundTrip/RoundTrip';
import InputDate from './InputDate/InputDate';
import { request } from '../../../../../APIs';
import { FaFileExcel } from 'react-icons/fa';

const SelectCsmTableMainDivBox = styled.div`
    font-size: 0.8em;
    background-color: #efefef;
    .Float_Container {
        display: flex;
        justify-content: space-around;
        .Float_Left {
            width: 45%;
            font-size: 0.9em;
        }
        .Float_Right {
            width: 50%;
            border: 1px dashed black;
            background-color: #fff;
            padding: 10px;
        }
    }
    .Excel_Icons {
        font-size: 2em;
        margin-right: 80px;
        margin-top: 10px;

        :hover {
            cursor: pointer;
        }
    }
`;

const SelectCsmTable = () => {
    const ScrollUpRef = useRef();

    const Handle_Distance_Excel_Download = async () => {
        try {
            const Handle_Distance_Excel_Download_Axios = await request.get('/CE_Calendar_app_server/Handle_Distance_Excel_Download');
            console.log(Handle_Distance_Excel_Download_Axios);
            if (Handle_Distance_Excel_Download_Axios.data.dataSuccess) {
                window.open(`${process.env.REACT_APP_DB_HOST}/CSM/${Handle_Distance_Excel_Download_Axios.data.ExcelDataDownloadUrl}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (ScrollUpRef.current) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    }, []);

    return (
        <SelectCsmTableMainDivBox ref={ScrollUpRef}>
            <Navigation></Navigation>
            <div style={{ marginBottom: '10px' }}>
                <div className="Excel_Icons" style={{ color: 'green', textAlign: 'end' }} onClick={() => Handle_Distance_Excel_Download()}>
                    <FaFileExcel></FaFileExcel>
                </div>
                <div style={{ textAlign: 'end' }}>
                    <div>顧客会社別の車両運行距離時間表.xlsx</div>
                </div>
            </div>
            <div className="Float_Container">
                <div className="Float_Left">
                    <h4>CSM 작업 정보</h4>
                    <div>
                        <InputDate></InputDate>
                    </div>
                    <div>
                        <InputHotel></InputHotel>
                    </div>
                    <div>
                        <InputStart></InputStart>
                    </div>
                    <div>
                        <InputCustom></InputCustom>
                    </div>
                    <div>
                        <RoundTrip></RoundTrip>
                    </div>
                    <div>
                        <InputCsmNumber></InputCsmNumber>
                    </div>
                    <div>
                        <InputModelNumber></InputModelNumber>
                    </div>
                </div>
                <div className="Float_Right">
                    <h4>제번 목록</h4>
                    <div style={{ border: '1px dashed lightgray', marginTop: '10px' }}>
                        <InputBinds></InputBinds>
                    </div>
                </div>
            </div>
            <SelectTable></SelectTable>
            <div style={{ paddingBottom: '150px' }}></div>
        </SelectCsmTableMainDivBox>
    );
};

export default SelectCsmTable;
