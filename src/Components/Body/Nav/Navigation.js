import React from "react";
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_INFO_DATA_Changes, LOGOUT_INFO_DATA_Changes } from "../../../Models/LoginInfoReducer/LoginInfoReducer"
import { BsFillPersonBadgeFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f1f1f1;
`;

const Logo = styled(Link)`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
`;

const Menu = styled.ul`
  display: flex;
  list-style: none;
`;

const MenuItem = styled.li`
  margin-left: 20px;
  
  a {
    color: #333;
    text-decoration: none;
    transition: color 0.3s ease-in-out;
    font-size:1.1em;

    &.active {
      color: #ff3d00;
      font-weight: bold;
    }

    &:hover {
      color: #ff5722;
    }
  }

  .Profile_Container{
    position:relative;
  
    .Profile_Menu_Lists{
      display:none;
      position:absolute;
      border:1px solid lightgray;
      width:100px;
      right:0px;
      bottom:-50px;
      height:80px;
      background-color:#fff;
      :hover{
        display:block;
      }
      ul{
        margin:0px;
        padding:0px;
        li{
          padding:5px;
          text-align:center;
          border-bottom:1px solid lightgray;
          &:hover{
            cursor: pointer;
            color: #ff5722;
          }
        }
      }
    }
        &:hover{
        .Profile_Menu_Lists{
          display:block;
        }  
      }
  }

`;
const Navigation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const Login_Info = useSelector((state) => state.LoginInfoDataReducer.Infomation);
 
  
  const handleChangeAdminAccess = (data) => {
    const Change_Data = {
      ...Login_Info,
      Login_Admin_Access:!Login_Info.Login_Admin_Access
    }
    dispatch(LOGIN_INFO_DATA_Changes(Change_Data));
  }


  const HandleLogOut = () => {
    dispatch(LOGOUT_INFO_DATA_Changes());
    history.push("/Login");
  }

  
    return (
        <Container>
        <Logo to="/">CSM</Logo>
      <Menu>
        <MenuItem>
          <NavLink exact to="/" activeClassName="active">CSM 데이터</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/Register_Csm" activeClassName="active">작업완료 CSM</NavLink>
        </MenuItem>
          
          { Login_Info.Login_Admin_Access?<>

            <MenuItem>
          <NavLink to="/Csm_Invoice_Pay_Finished" activeClassName="active">Invoice 처리 완료 CSM</NavLink>
          </MenuItem>
          
        <MenuItem>
          <NavLink to="/Csm_Basic_Excel_Upload" activeClassName="active">CSM 데이터 Excel업로드</NavLink>
          </MenuItem>
        <MenuItem >
          <NavLink to="/Distacne_Data" activeClassName="active">이동거리별 시간</NavLink>
          </MenuItem></>:<></>}

          <MenuItem style={{marginLeft:"100px"}}>
            <div className="Profile_Container">
                <div style={{ fontSize: "1.5em" }} className="Profile_Icons_Container">
                  <BsFillPersonBadgeFill></BsFillPersonBadgeFill>        
              </div>
              <div className="Profile_Menu_Lists">
                <ul>
                  <li onClick={()=>HandleLogOut()}>로그아웃</li>
                </ul>
              </div>
            </div>
        </MenuItem>
               
        </Menu>
        
    </Container>
    )
}

export default Navigation;