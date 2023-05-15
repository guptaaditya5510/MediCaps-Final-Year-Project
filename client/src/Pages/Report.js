import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import BarGraph from '../Components/BarGraph';
import PieChart from '../Components/PieChart';
import MyBarGraph from '../Components/MyBarGraph';
import MyPieChart from '../Components/MyPieChart';
import UserBarGraph from '../Components/UserBarGraph';
import UserPieChart from '../Components/UserPieChart';

export default function Report() {
    const { id, token, username } = useParams();

    const [details, setDetails] = useState([]);

    const [myData, setMyData] = useState([]);
    const [userData, setUserData] = useState([]);

    const getResult = () => {
        axios.get(`http://localhost:3001/getScoreDetails/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            console.log(res);
            setDetails(res.data.data[0].sentimentsScore);

            let my = res.data.data[0].sentimentsScore.filter((item) => item.sender === username);
            setMyData(my);
            let user = res.data.data[0].sentimentsScore.filter((item) => item.sender !== username);
            setUserData(user);
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        getResult();
    }, []);
    return (
        <div className='w-full'>
            <h1 className='text-center text-[48px]'>Chat Sentiments</h1>
            <div className='flex justify-evenly'>
                <BarGraph data={details} />
                <PieChart data={details} />
            </div>
            <h1 className='text-center text-[48px]'>Our Sentiments</h1>
            <div className='flex justify-evenly'>
                <MyBarGraph data={myData} />
                <MyPieChart data={myData} />
            </div>
            <h1 className='text-center text-[48px]'>User Sentiments</h1>
            <div className='flex justify-evenly'>
                <UserBarGraph data={userData} />
                <UserPieChart data={userData} />
            </div>
        </div>
    )
}