import React, { useState } from 'react';
import { styled } from 'styled-components';

const TextWithHoverMainDivBox = styled.div`
  width: 100%;
  height: 100%;
.text-container {
  display: inline-block;
 
    width: 100%;
  height: 100%;
}

.text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 100%;
  display:flex;
  align-items:center;
}

.hover-box {
  position: absolute;
  top: 0;
  left: -400px;
  z-index: 1;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #cccccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width:500px;
  text-align:start;
}
`

const TextWithHover = ({ text, maxVisibleLength }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <TextWithHoverMainDivBox
      >
          <div  className="text-container"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                    {isHovered ? (
                    <div className="hover-box">{text}</div>
                ) : (
                    <div className="text">{text.slice(0, maxVisibleLength)}...</div>
              )}
              </div>
    </TextWithHoverMainDivBox>
  );
};

export default TextWithHover;