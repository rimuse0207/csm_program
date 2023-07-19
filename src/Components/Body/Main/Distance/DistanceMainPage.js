import React from "react";
import { styled } from "styled-components";
import Navigation from "../../Nav/Navigation";
import DistanceTable from "./DistanceTable/DistanceTable";
import AllDistanceTable from "./DistanceTable/AllDistanceTable";

const DistanceMainPageMainDivBox = styled.div`
    font-size:0.8em;
`

const DistanceMainPage = () => {
    return (
        <DistanceMainPageMainDivBox>
            <Navigation></Navigation>
            {/* <DistanceTable></DistanceTable> */}
            <AllDistanceTable></AllDistanceTable>
            <div style={{marginTop:"20px"}}></div>
        </DistanceMainPageMainDivBox>
    )
}

export default DistanceMainPage;