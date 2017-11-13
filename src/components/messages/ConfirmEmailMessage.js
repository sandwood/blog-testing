import React from "react";
import { Message } from "semantic-ui-react";

const ConfirmEmailMessage = () => (
  <Message info>
    <Message.Header>
      이메일 인증을 확인하세요
    </Message.Header>
  </Message>
);

export default ConfirmEmailMessage;
