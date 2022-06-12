import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';
import AddUser from './components/Dashboard/AddUser';
import Admin from './components/admin/Admin';
import {FiSettings} from 'react-icons/fi'
import {TooltipComponent} from '@syncfusion/ej2-react-popups'
import { Home } from './pages';





const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
   <BrowserRouter>
    <Routes>
    <Route  path="/" element={<App />} />
    <Route  path="/user" element={<Dashboard />} />
    <Route  path="/add" element={<AddUser />} />
    <Route path='/home' element={<Home />} />
    </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
