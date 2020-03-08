import React, { useEffect, useState } from "react";
import styled from "styled-components";

var url = `wss://localhost:44375/api/chat`;
console.log("url is: " + url);

var webSocket = new WebSocket(url);

export const App = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("effect");
    webSocket.onopen = e => console.log("socket opened");
    webSocket.onclose = e => console.log("socket closed", e);
    webSocket.onerror = e => console.log("socket error", e);
    webSocket.onmessage = message => {
      setMessages(...messages, message);
      console.log(message);
    };

    return () => {
      webSocket.onmessage = null;
    };
  }, []);

  return (
    <Wrapper>
      <Box>
        <InnerBox>
          <p>chat content here I guess</p>
        </InnerBox>
        <ReplyBox></ReplyBox>
      </Box>
    </Wrapper>
  );
};

// https://neumorphism.io/ for shadow generation

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  border-radius: 50px;
  background: #54d8f3;
  box-shadow: 20px 20px 60px #47b8cf, -20px -20px 60px #61f8ff;
  width: 70%;
  height: 400px;
  margin-top: 100px;
`;

const InnerBox = styled.div`
  margin: 20px;
  height: 250px;
  border-radius: 50px;
  text-align: center;
  background-color: #dfe6ec;
  box-shadow: 8px 8px 16px #47b8cf, -8px -8px 16px #54d8f3;
`;

const ReplyBox = styled.div`
  margin: 20px;
  height: 100px;
  border-radius: 20px;
  text-align: center;
  background-color: #dfe6ec;
  box-shadow: 8px 8px 16px #47b8cf, -8px -8px 16px #54d8f3;
`;
