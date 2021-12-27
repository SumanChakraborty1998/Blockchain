import React from "react";
import io from "socket.io-client";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Home.module.css";
import { ChatList } from "./ChatList";

const socket = io.connect("http://localhost:4000");

export const Home = () => {
  const [message, setMessage] = React.useState({
    name: "",
    msg: "",
  });
  const [chats, setChats] = React.useState([]);

  const socketRef = React.useRef();

  const handleChange = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, msg } = message;
    socketRef.current.emit("message", { name, msg });
    setMessage({ name: name, msg: "" });
  };

  const { name, msg } = message;

  // React.useEffect(() => {
  //   socketRef.current = io.connect("http://localhost:4000");
  //   socketRef.current.on("message", ({ name, message }) => {
  //     setChats([...chats, { name, message }]);
  //   });
  //   return () => socketRef.current.disconnect();
  // }, [chats]);
  React.useEffect(() => {
    socket.on("message", ({ name, msg }) => {
      setChats([...chats, { name, msg }]);
    });
  });

  return (
    <div className="main_div">
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Demo Chat</h2>
          <div>
            <TextField
              label="Name"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              label="Message"
              name="msg"
              value={msg}
              onChange={handleChange}
            />
          </div>
          <Button variant="contained">Send</Button>
        </form>
      </div>
      <div>
        <h4>Chat Box</h4>
        <ChatList chats={chats} />
      </div>
    </div>
  );
};
