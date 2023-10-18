import React from 'react';
import { styled } from 'styled-components';
import Navigation from '../../Nav/Navigation';
import DistanceTable from './DistanceTable/DistanceTable';
import AllDistanceTable from './DistanceTable/AllDistanceTable';
import { FaFileExcel } from 'react-icons/fa';
import { request } from '../../../../APIs';

const DistanceMainPageMainDivBox = styled.div`
    font-size: 0.8em;
    .Excel_Icons {
        font-size: 2em;
        margin-right: 30px;
        margin-top: 10px;
        margin-bottom: 10px;
        :hover {
            cursor: pointer;
        }
    }
`;

const DistanceMainPage = () => {
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

    return (
        <DistanceMainPageMainDivBox>
            <Navigation></Navigation>
            {/* <DistanceTable></DistanceTable> */}
            <div>
                <div className="Excel_Icons" style={{ color: 'green', textAlign: 'end' }} onClick={() => Handle_Distance_Excel_Download()}>
                    <FaFileExcel></FaFileExcel>
                </div>
            </div>
            <AllDistanceTable></AllDistanceTable>
            <div style={{ marginTop: '20px' }}></div>
        </DistanceMainPageMainDivBox>
    );
};

export default DistanceMainPage;
