import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { request } from "../../../../../APIs";
import Modal from "react-modal";
import UpdateDistanceModal from "./UpdateDistanceModal/UpdateDistanceModal"

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

const AllDistanceTableMainDivBox = styled.div`
table {
        border-collapse: separate;
        border-spacing: 0;
        width: 100%;
        font-size:1.2em;
        text-align:center;
    }
    th,
    td {
        padding: 6px 15px;
    }
    th {
        background: #42444e;
        color: #fff;
        text-align: center;
    }
    tr:first-child th:first-child {
        border-top-left-radius: 6px;
    }
    tr:first-child th:last-child {
        border-top-right-radius: 6px;
    }
    td {
        border-right: 1px solid #c6c9cc;
        border-bottom: 1px solid #c6c9cc;
    }
    td:first-child {
        border-left: 1px solid #c6c9cc;
    }
    
    tr:last-child td:first-child {
        border-bottom-left-radius: 6px;
    }
    tr:last-child td:last-child {
        border-bottom-right-radius: 6px;
    }
    .Update_Icons{
        :hover{
            cursor: pointer;
        }
    }
`

const AllDistanceTable = () => {
    const [All_Distance_Data, setAll_Distance_Data] = useState([]);
    const [Update_Modal_Open, setUpdate_Modal_Open] = useState(false);
    const [Select_Distance_Data, setSelect_Distance_Data] = useState(null);


    const ModalClose_Func = () => {
        document.body.style.overflow = 'unset';
        setUpdate_Modal_Open(false);
        setSelect_Distance_Data(null);
    }


    const Handle_Update_Modal_Open = (data) => {
        document.body.style.overflow = 'hidden';
        setUpdate_Modal_Open(true);
        setSelect_Distance_Data(data);
    }



    const GetDistancData = async (data) => {

        try {
            const Getting_Distance_Datas_Axios = await request.get(
                `/CE_Calendar_app_server/All_Distance_Data_Getting`
            );
            if (Getting_Distance_Datas_Axios.data.dataSuccess) {
                setAll_Distance_Data(Getting_Distance_Datas_Axios.data.tetetetetet);    
            }
            

            console.log(Getting_Distance_Datas_Axios);
           
        } catch (error) {
            console.log(error);
            
        }
    };


    useEffect(() => {
        GetDistancData();
    }, []);


    return (
        <AllDistanceTableMainDivBox>
            <table>
                <thead>
                    <tr>
                        <th>Area</th>
                        <th>Custommer</th>
                        <th>Pangyo</th>
                        <th>이동Time</th>
                        <th>Asan</th>
                        <th>이동Time</th>
                        <th>수정</th>
                    </tr>
                </thead>
                <tbody>
                    {All_Distance_Data.map((list) => {
                        return <tr>
                            <td>{list.PL_area ? list.PL_area : list.AL_area}</td>
                            <td>{list.PL_custommer ? list.PL_custommer : list.AL_custommer}</td>
                            <td>{list.PL_distance ? list.PL_distance : ""}</td>
                            <td>{ list.PL_time? list.PL_time : ""}</td>
                            <td>{list.AL_distance ? list.AL_distance : ""}</td>
                            <td>{list.AL_time ? list.AL_time : ""}</td>
                            <td className="Update_Icons" onClick={()=>Handle_Update_Modal_Open(list)}>수정</td>
                        </tr>
                    }) }
                </tbody>

            </table>
              <Modal isOpen={Update_Modal_Open} style={customStyles} onRequestClose={()=>ModalClose_Func()} >
                    <UpdateDistanceModal Select_Distance_Data={Select_Distance_Data} ModalClose_Func={()=>ModalClose_Func()} GetDistancData={()=>GetDistancData()}></UpdateDistanceModal>
            </Modal>
        </AllDistanceTableMainDivBox>
    )
}


export default AllDistanceTable;