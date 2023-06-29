import React from 'react';
import styled from 'styled-components';
import { css } from '@emotion/react';
import PulseLoader from 'react-spinners/PulseLoader';

const LoaderMainPageMainDivBox = styled.div`
    ${props => (props.loading   === "true" ? 'position: fixed' : 'display:none')};
    width: 100vw;
    height: 100vh;
    background: ${props => (props.loading === "true" ? 'rgba(255, 255, 255, 0.5)' : 'none')};
    top: 0;
    left: 0;
    z-index:99999;
    .sweet-loading {
        display: flex;
        width: 100vw;
        height: 100vh;
        justify-content: center;
        align-items: center;
    }
`;

const override = css`
    display: block;
    margin: 0 auto;
    border-color: #0a0ef3;
`;

const LoaderMainPage = ({ loading }) => {
    return (
        <LoaderMainPageMainDivBox loading={loading.toString()}>
            <div className="sweet-loading">
                <PulseLoader color={'#0a0ef3'} loading={loading} css={override} size={30} />
            </div>
        </LoaderMainPageMainDivBox>
    );
};

export default LoaderMainPage;
