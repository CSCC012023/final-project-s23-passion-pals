import React, { useEffect, useRef, useState } from 'react';
import "./messenger.css";
import Conversation from '../../components/conversations/Conversation';
import Message from '../../components/message/Message';
import axios from 'axios';
import { io } from "socket.io-client";
import send from '../../images/send.png';
import img1 from "../../images/user-circle.png";
import robo from "../../images/robot.gif";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [chatMembers, setChatMembers] = useState([]);
  const socket = useRef();
  const user = localStorage.getItem('userId');

  const scrollRef = useRef();

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
      setMessages((prev) => [...prev, arrivalMessage]);
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

  const handleSelectConversation = async (conversation) => {
    setCurrentChat(conversation);

    try {
      const res = await axios.get(`/messages/${conversation._id}`);
      setMessages(res.data);

      const memberPromises = conversation.members.map(async (memberId) => {
        const res = await axios.get(`http://localhost:5000/getUsers/${memberId}`);
        return res.data;
      });

      const memberUsers = await Promise.all(memberPromises);
      setChatMembers(memberUsers);
    } catch (err) {
      console.log(err);
    }
  };

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
  }, [messages, currentChat]);

  return (
    <>
      <div className='messenger'>
        <div className='chatMenu'>
          <div className='chatMenuWrapper'>
            <h2>Conversations</h2>
            {conversations.map((c) => (
              <div key={c._id} onClick={() => handleSelectConversation(c)}>
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
                  {messages.map((m) => {
                    const member = chatMembers.find((member) => member._id === m.sender);
                    const profilePic = member?.profilePic || img1;
                    const firstName = member?.fname || 'Unknown';
                    const lastName = member?.lname || '';

                    return (
                      <div key={m._id}>
                        <Message
                          message={m}
                          own={m.sender === user}
                          profilePic={profilePic}
                          firstName={firstName}
                          lastName={lastName}
                          conversation={currentChat}
                        />
                      </div>
                    );
                  })}
                  <div ref={scrollRef} />
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
              <span className="noConversationText">
              <img className="robotImage" src={robo} alt="Robot" />
              Open a conversation to start messaging.
            </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
