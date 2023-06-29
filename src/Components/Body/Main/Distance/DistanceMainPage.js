import React from "react";
import { styled } from "styled-components";
import Navigation from "../../Nav/Navigation";
import DistanceTable from "./DistanceTable/DistanceTable";

const DistanceMainPageMainDivBox = styled.div`
    border:1px solid black;
    font-size:0.8em;
`

const DistanceMainPage = () => {
    return (
        <DistanceMainPageMainDivBox>
            <Navigation></Navigation>
            <DistanceTable></DistanceTable>
        </DistanceMainPageMainDivBox>
    )
}

export default DistanceMainPage;