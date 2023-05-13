import React, { useState, useEffect } from 'react';

import axios from "axios";
import io from 'socket.io-client';

import { useParams, useNavigate, NavLink } from 'react-router-dom';

import { BiSend } from "react-icons/bi";

const socket = io('http://localhost:3001');


function StartChat() {
    const { username, token } = useParams();
    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [sentimentsScore, setSentmentsScore] = useState([]);

    const handleNewMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        setSentmentsScore((prevSentiment) => [...prevSentiment, {score: message.sentimentScore, sender: message.reciever}]);
    };

    useEffect(() => {
        socket.on('message', handleNewMessage);

        return () => {
            socket.off('message', handleNewMessage);
        };
    }, []);

    const sendMessage = () => {
        const time = new Date();
        const t = time.getHours() + ':' + time.getMinutes();
        socket.emit('message', { reciever: username, message: messageInput, time: t, sentimentScore: score });
        setScore(score);
        setScore(0);
        setMessageInput('');
    };

    const [score, setScore] = useState(0);
    const onChangeEvent = (e) => {
        setMessageInput(e.target.value);

        axios.post(`http://localhost:3002/api/nlp/s-analyzer`, {
            review: e.target.value
        }).then(res => {
            //console.log(res);
            setScore(res.data.analysis);
        }).catch(err => {
            console.log(err);
        })
    }

    const generateScore = () => {
        axios.post(`http://localhost:3001/generateScore`, {
            sentimentsScore: sentimentsScore
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res);
            navigate(`/Report/${res.data.data._id}/${token}/${username}`);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            {/* {messages.map((message, index) => (
        <div key={index}>
          <p>{message.reciever}</p>
          <p>{message.message}</p>
          <p>{message.time}</p>
        </div>
      ))}
      <input
        value={messageInput}
        onChange={onChangeEvent}
      />
      <button onClick={sendMessage}>Send</button> */}

            <div className="p-10">
                <div className='flex flex-row justify-end'>
                    <button className='bg-pink-800 h-[40px] w-[150px] rounded-[20px] text-white' onClick={generateScore}>End Chat</button>
                </div>
                {/* sample message */}
                {
                    messages.map((message, index) => (
                        <div key={index}>
                            <p className='text-pink-800'>{message.reciever}</p>
                            <div className="px-4 py-1 bg-purple-50 border-2 border-purple-700 rounded-md shadow-md text-left justify-self-end mb-5 w-1/2">
                                <p className="">
                                    {message.message}
                                    {
                                        message.sentimentScore === 0 ? '😐'
                                            :
                                            message.sentimentScore > 0 ? '😀' : '😡'
                                    }
                                </p>
                                <p className='text-xs text-right'>{message.time}</p>
                            </div>
                        </div>
                    ))
                }

                {
                    messageInput.length ?
                        <>
                            {
                                score === 0 ? '😐'
                                    :
                                    score > 0 ? '😀' : '😡'
                            }
                        </>
                        :
                        ''
                }

                <div className="fixed flex gap-4  bottom-6 border-pink-800 border-2 w-3/4 px-6 py-1 h-10 rounded-3xl bg-fuchsia-100 shadow-md">
                    <input
                        className="bg-fuchsia-100 appearance-none focus:outline-none focus:ring-0 border-0 w-full"
                        placeholder="type here....."
                        value={messageInput}
                        onChange={onChangeEvent}
                    />
                    <span>
                        <BiSend className="text-fuchsia-700 text-2xl cursor-pointer"
                            onClick={sendMessage}
                        />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default StartChat;
