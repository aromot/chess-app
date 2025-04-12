import React from "react";
import ButtonAddDirectory from "../add/ButtonAddDirectory";

const MessageEmpty = () => {
  return (
    <>
      <div>You don't have repertoire yet...</div>
      <ButtonAddDirectory />
    </>
  );
};

export default MessageEmpty;
