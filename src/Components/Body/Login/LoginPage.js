import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { request } from '../../../APIs';
import { toast } from '../ToastMessage/ToastManager';
import { LOGIN_INFO_DATA_Changes } from '../../../Models/LoginInfoReducer/LoginInfoReducer';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f9f9f9;
`;

const Form = styled.div`
    background-color: white;
    padding: 40px;
    border-radius: 5px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    width: 400px;
    max-width: 90%;
    @media only screen and (max-width: 600px) {
        padding: 20px;
    }
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 30px;
    color: #333;
    font-size: 36px;
    font-weight: 900;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
`;

const Button = styled.button`
    width: 100%;
    padding: 12px;
    background-color: #ff3d00;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 20px;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: #e60000;
        transform: translateY(-2px);
        box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
    }
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: #ccc;
    margin-bottom: 20px;
`;

const SocialLoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`;

const SocialButton = styled.button`
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: #f1f1f1;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
    }
`;

const LoginPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { Token_Id } = useParams();
    const Login_Info = useSelector(state => state.LoginInfoDataReducer.Infomation);
    const [Login_Info_Input_Data, setLogin_Info_Input_Data] = useState({
        id: Login_Info.Login_id ? Login_Info.Login_id : '',
        pw: '',
    });

    const HandleSubmitLogin = async e => {
        e.preventDefault();
        try {
            const Sending_Login_Info_Axios = await request.post('/Login_app_servers/Sending_Login_Info', {
                Login_Info_Input_Data,
            });

            if (Sending_Login_Info_Axios.data.Login_Fail) {
                setLogin_Info_Input_Data({
                    ...Login_Info_Input_Data,
                    pw: '',
                });
                toast.show({
                    title: `로그인 실패`,
                    content: `ID 또는 Password를 확인 해주세요.`,
                    duration: 6000,
                    successCheck: false,
                });
                return;
            } else if (Sending_Login_Info_Axios.data.dataSuccess) {
                dispatch(LOGIN_INFO_DATA_Changes(Sending_Login_Info_Axios.data.Info_Data));
                history.push('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const Now_Token_Checking = async () => {
        try {
            const Now_Token_Checking_Axios = await request.post('/Login_app_servers/Now_Token_Checking', {
                Login_Info,
            });

            if (Now_Token_Checking_Axios.data.dataSuccess) {
                history.push('/');
            } else {
                toast.show({
                    title: `토큰 유효기간 만료`,
                    content: `토큰의 유효기간이 만료 되었습니다. 다시 로그인 부탁 드립니다.`,
                    duration: 6000,
                    successCheck: false,
                });

                return;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const Tele_Token_Checking = async () => {
        try {
            const Tele_Token_Checking_Axios = request.post('/Login_app_servers/Tele_Token_Checking', {
                Token_Id,
            });

            if (Tele_Token_Checking_Axios.data.dataSuccess) {
                dispatch(LOGIN_INFO_DATA_Changes(Tele_Token_Checking_Axios.data.Info_Data));
                history.push('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (Token_Id) {
            //재택을 통해서 로그인 할떄,
            Tele_Token_Checking();
        } else {
            if (Login_Info.Login_token) {
                ///기존의 토근 등록 되어 있을 때
                Now_Token_Checking();
            }
        }
    }, []);

    return (
        <Container>
            <Form>
                <Title>CSM Program</Title>
                <Title>Login</Title>
                <form onSubmit={e => HandleSubmitLogin(e)}>
                    <Input
                        type="text"
                        placeholder="email"
                        value={Login_Info_Input_Data.id}
                        onChange={e => setLogin_Info_Input_Data({ ...Login_Info_Input_Data, id: e.target.value })}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={Login_Info_Input_Data.pw}
                        onChange={e => setLogin_Info_Input_Data({ ...Login_Info_Input_Data, pw: e.target.value })}
                    />
                    <Button>Login</Button>
                </form>
                <Divider />
            </Form>
        </Container>
    );
};

export default LoginPage;
