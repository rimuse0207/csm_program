import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

const HoverRevealTextMainDivBox = styled.div`
    .HoverOPen {
        position: fixed;
        background-color: lightgray;
        padding: 5px;
        font-weight: bolder;
        width: 300px;
        white-space: break-spaces;
        height: auto;

        overflow-wrap: break-word;
    }
`;

const HoverRevealText = ({ text }) => {
    const DivRef = useRef();
    const [isHovered, setIsHovered] = useState(false);
    const [Top, setTop] = useState(0);
    const [Left, setLeft] = useState(0);
    const [shouldWrap, setShouldWrap] = useState(false);

    const Handle_Hover_Entering = () => {
        if (DivRef.current) {
            const rect = DivRef.current.getBoundingClientRect();

            setTop(rect.top);
            setLeft(rect.left - 300);

            setIsHovered(true);
        }
    };

    useEffect(() => {
        const checkWrap = () => {
            if (DivRef.current) {
                const rect = DivRef.current.getBoundingClientRect();
                const windowWidth = window.innerWidth;

                if (rect.right > windowWidth) {
                    setShouldWrap(true);
                } else {
                    setShouldWrap(false);
                }
            }
        };

        window.addEventListener('scroll', checkWrap);
        window.addEventListener('resize', checkWrap);
        return () => {
            window.removeEventListener('scroll', checkWrap);
            window.removeEventListener('resize', checkWrap);
        };
    }, []);

    return (
        <HoverRevealTextMainDivBox>
            <div onMouseEnter={() => Handle_Hover_Entering()} onMouseLeave={() => setIsHovered(false)} ref={DivRef}>
                {text ? <div>{text.substring(0, 20) + '...'}</div> : <></>}
                {isHovered ? (
                    <div className={`HoverOPen ${shouldWrap ? 'wrap' : ''}`} style={{ top: Top, left: Left }}>
                        {text}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </HoverRevealTextMainDivBox>
    );
};

export default HoverRevealText;
