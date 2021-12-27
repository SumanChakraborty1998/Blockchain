import React from "react";

export const ChatList = ({ chats }) => {
  console.log(chats);
  return (
    <>
      {chats.map(({ name, msg }, index) => {
        return (
          <div key={index}>
            <h3>
              {name}: <span>{msg}</span>
            </h3>
          </div>
        );
      })}
    </>
  );
};
