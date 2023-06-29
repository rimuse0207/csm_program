import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { request } from '../../../../../APIs';
import moment from 'moment';
import { BsFillInfoSquareFill } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { Loader_Check_For_False, Loader_Check_For_True } from '../../../../../Models/LoaderCheckReducer/LoaderCheckReducer';

const DistanceTableMainDivBox = styled.div`
     table {
        border-collapse: separate;
        border-spacing: 0;
        width: 100%;
    }
    th,
    td {
        padding: 6px 15px;
    }
    th {
        background: #42444e;
        color: #fff;
        text-align: left;
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
    tr:nth-child(even) td {
        background: #eaeaed;
    }
    tr:last-child td:first-child {
        border-bottom-left-radius: 6px;
    }
    tr:last-child td:last-child {
        border-bottom-right-radius: 6px;
    }

    .Distance_Nav_Container{
        ul{
            display:flex;
            .active{
                 .Nav_Border_Container{
                    margin-top:5px;
                    border:1px solid #368;
                }
                opacity:1;
                color:#368;
            }
            li{
                width:100px;
                margin-right:30px;
                text-align:center;
                opacity:0.5;
                :hover{
                    cursor: pointer;
                }
                .Nav_Border_Container{
                    margin-top:5px;
                    border:1px solid black;
                }

            }
        }
    }

`

const DistanceTable = () => {
    const dispatch = useDispatch();
    const [DistanceData, setDistanceData] = useState([]);
    const [Distance_Nav, setDistance_Nav] = useState([
        {
            nav_name: "판교",
            nav_check:true
        },
        {
            nav_name: "아산",
            nav_check:false
        },
         {
            nav_name: "사용자 등록 요청 LIST",
            nav_check:false
        }
    ])


    const HandleNavChange = (list) => {
        setDistance_Nav(Distance_Nav.map(item => list.nav_name === item.nav_name ? { ...item, nav_check: true } : { ...item, nav_check: false }));
        GetDistancData(list)
        
    }

    const GetDistancData = async (data) => {
        dispatch(Loader_Check_For_True());
        try {
            const Getting_Distance_Datas_Axios = await request.get(
                `/CE_Calendar_app_server/Distance_Data_Getting`, {
                    params: {
                        location:data.nav_name
                    }
                }
            );

            if (Getting_Distance_Datas_Axios.data.dataSuccess) {
                setDistanceData(Getting_Distance_Datas_Axios.data.Distance_Select_Rows);
                dispatch(Loader_Check_For_False());
            } else {
                alert('ERROR발생');
                dispatch(Loader_Check_For_False());
            }
        } catch (error) {
            console.log(error);
            alert('ERROR발생');
            dispatch(Loader_Check_For_False());
        }
    };


    useEffect(() => {
        GetDistancData(Distance_Nav[0]);
    }, []);

    return (
        <DistanceTableMainDivBox>
            <div className="Distance_Nav_Container">
                <ul>
                    {Distance_Nav.map((list) => {
                        return <li className={`${list.nav_check ? "active":""}`} onClick={()=>HandleNavChange(list)}>
                            <div>{list.nav_name}</div>
                            <div className="Nav_Border_Container"></div>
                        </li>
                    })}
                </ul>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>고객사 지역</th>
                        <th>고객사 명</th>
                        <th>이동 거리</th>
                        <th>이동 시간</th>
                        <th>등록자</th>
                        <th>등록 날짜</th>
                        <th>수정</th>
                    </tr>
                </thead>
                <tbody>
                    {DistanceData.map((list, i) => {
                        return (
                            <tr>
                                <td style={{ fontWeight: 'bold' }}>{i + 1}</td>
                                <td>{list.csm_distance_lists_area}</td>
                                <td>{list.csm_distance_lists_custommer}</td>
                                <td>{list.csm_distance_lists_distance}</td>
                                <td>{list.csm_distance_lists_distance_time}</td>
                                <td>{list.name}</td>
                                <td>{moment(list.csm_distance_lists_write_date).format('YYYY-MM-DD')}</td>
                                <td className="Info_Icons" >
                                    <BsFillInfoSquareFill></BsFillInfoSquareFill>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </DistanceTableMainDivBox>
    )
}

export default DistanceTable;