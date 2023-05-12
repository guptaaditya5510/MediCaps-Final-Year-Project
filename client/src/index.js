import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// const users = [
//   { id: "user1", name: "Alice" },
//   { id: "user2", name: "Bob" },
//   { id: "user3", name: "Charlie" },
// ];

const user={ id: "user1", name: "Alice" }


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <BrowserRouter>
  <App/>
 </BrowserRouter>
);