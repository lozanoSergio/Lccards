import React from "react";
import styled from "styled-components";
import {Image, Button} from 'semantic-ui-react'

const Container = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const BackgroundImg = styled.div`
  background-image: url("https://3.bp.blogspot.com/-piZWCW2uUbg/W2fPXxkWZgI/AAAAAAAAOu0/eydmMjTIqcwLMHEEr2H7imqoRTxMw4o9QCLcBGAs/s1600/among_trees_night_dribbble.png");
  height: 400px;
  width: 800px;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #2a3cad;
  border-radius: 4px;
  box-shadow: 0px 0px 5px #2a3cad;
  position: relative;
`;

const Box = styled.div`
  position: inherit;
  margin-top: 10%;
  margin-right: auto;
  margin-left: auto;
  width: 300px;
  height: 400px;
  background: #2E294E;
  overflow: hidden;
  border: 2px solid #D499B9;
  color: white;
  padding: 20px;

  .content {
    border: 1px solid #D499B9;
    height: 100%;
    text-align: center;
    box-shadow: 0 5px 10px rgba(9, 0, 0, 0.5);
  }
  span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    box-sizing: border-box;
  }

  span:nth-child(1) {
    transform: rotate(0deg);
  }

  span:nth-child(2) {
    transform: rotate(90deg);
    height: 290px;
    width: 400px;
    top: 52px;
    left: -50px;
    bottom: 0;
    right: 0;
  }

  span:nth-child(3) {
    transform: rotate(180deg);
  }

  span:nth-child(4) {
    transform: rotate(270deg);
    height: 290px;
    width: 400px;
    top: 52px;
    left: -55px;
    bottom: 0;
    right: 0;
  }

  span:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    background: #9055A2;
    animation: animate 4s linear infinite;
  }

  @keyframes animate {
    0% {
    transform:scaleX(0);
    transform-origin: left;
    }
    50%
    {
      transform:scaleX(1);
    transform-origin: left;
    }
    50.1%
    {
      transform:scaleX(1);
    transform-origin: right;
      
    }
    
    100%
    {
      transform:scaleX(0);
    transform-origin: right;
      
    }
`;

const LootHolder = ({visible}) => {
  return (

        <Box>
          <span />
          <span />
          <span />
          <span />
          <div className="content">
          {visible && 
            <Image
            src="/assets/card_back_grey.png"
            draggable={false}
          />
          }
          {!visible &&
          <Image
                src="/assets/card_back.png"
                draggable={false}
              />}
          </div>
        </Box>
        
  );
};

export default LootHolder;
