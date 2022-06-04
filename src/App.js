import './App.css';
import React, { useState } from 'react';
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
import Skeletonn from './components/Skeleton/Skeleton';

function App() {

  setTimeout(() => {
    setIsLoading(true)
  }, 5000)

  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="App">
      {isLoading ? 
    <SignUp />:
     <Skeletonn />
      }
  </div>

  );
}

export default App;
