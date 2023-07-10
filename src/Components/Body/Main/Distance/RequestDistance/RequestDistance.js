import React from "react";
import { styled } from "styled-components";
import Navigation from "../../../Nav/Navigation";
import RequestInfo from "./RequestInfo";


const RequestDistanceMainDivBox = styled.div`
    font-size:0.8em;
`

const RequestDistance = () => {
    return (
        <RequestDistanceMainDivBox>
            <Navigation></Navigation>
            <RequestInfo></RequestInfo>
        </RequestDistanceMainDivBox>
    )
}

export default RequestDistance;