import React, { useEffect, useRef, useState } from 'react';
import "./messenger.css";
import Conversation from '../../components/conversations/Conversation';
import Message from '../../components/message/Message';
import axios from 'axios';
import { io } from "socket.io-client";
import send from '../../images/send.png';
import img1 from "../../images/user-circle.png";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const user = localStorage.getItem('userId');

  const scrollRef = useRef();

  const [profilePics, setProfilePics] = useState({});

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prevMessages) => {
        return prevMessages.some((msg) => msg._id === arrivalMessage._id)
          ? prevMessages
          : [...prevMessages, arrivalMessage];
      });
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user);
    socket.current.on("getUsers", (users) => {
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user]);

  useEffect(() => {
    const fetchProfilePics = async () => {
      try {
        const users = conversations.flatMap(conversation => conversation.members);
        const uniqueUsers = [...new Set(users)];
        const profiles = await Promise.all(
          uniqueUsers.map(userId => axios.get(`http://localhost:5000/getUsers/${userId}`))
        );
        const picMap = profiles.reduce((map, { data }) => {
          if (data?._id) {
            map[data._id] = data.profilePic || img1;
          }
          return map;
        }, {});
        setProfilePics(picMap);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfilePics();
  }, [conversations]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (currentChat) {
          const res = await axios.get("/messages/" + currentChat._id);
          setMessages(res.data);
          scrollToBottom();
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) {
      return;
    }
    const message = {
      sender: user,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find((member) => member !== user);
    socket.current.emit("sendMessage", {
      senderId: user,
      receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post("/messages", message);
      setMessages((prevMessages) => [...prevMessages, res.data]);
      setNewMessage("");
      scrollToBottom();
    } catch (err) {
      console.log(err);
    }
  };

  const scrollToBottom = () => {
    scrollRef.current && scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className='messenger'>
        <div className='chatMenu'>
          <div className='chatMenuWrapper'>
            <h2>Conversations</h2>
            {conversations.map((c) => (
              <div key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className='chatBox'>
          <div className='chatBoxWrapper'>
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef} key={m._id}>
                      <Message
                        message={m}
                        own={m.sender === user}
                        profilePic={profilePics[m.sender]}
                      />
                    </div>
                  ))}
                </div>
                <div className='chatBoxBottom'>
                  <div className="chatInputWrapper">
                    <textarea
                      className="chatMessageInput"
                      placeholder="Send a message"
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></textarea>
                    <button
                      className='chatSubmitButton'
                      onClick={handleSubmit}
                      disabled={newMessage.trim() === ""}
                    >
                      <img src={send} alt="Send" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <span className="noConversationText">Open a conversation to start a chat.</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
