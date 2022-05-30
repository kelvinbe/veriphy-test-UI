import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
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
import SignUp from './components/Form';
import {FiSettings} from 'react-icons/fi'
import {TooltipComponent} from '@syncfusion/ej2-react-popups'
import {Footer, Sidebar} from './components'
import {Stacked, Pyramid, Area, Bar, Pie, Line, Home} from './pages'
import Header from './components/Dashboard/header';

function App() {

  return (
    <div className="App">
    <SignUp />
  </div>

  );
}

export default App;
