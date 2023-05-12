import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function Report(){
    const {id, token} = useParams();

    const [details,setDetails]=useState([]);

    const getResult=()=>{
        axios.get(`http://localhost:3001/getScoreDetails/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(res=>{
            console.log(res);
            setDetails(res.data.data[0].sentimentsScore);
        }).catch(err=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        getResult();
    },[]);
    return(
        <>
        
        </>
    )
}