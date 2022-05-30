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

function Homey() {
const activeMenu = true

const user = localStorage.getItem('profile')


  return (
    <div>

      <div className='flex relative dark:bg-main-dark-bg'>
        <div className='fixed right-4 bottom-4' style={{zindex: '1000'}}>
          <TooltipComponent content='Settings' position='Top'>
            <button type="button" className='text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white' style={{background: 'blue', borderRadius: '50%'}}>
              <FiSettings />
            </button>

          </TooltipComponent>

        </div>
    {/* {activeMenu ? (
      <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
        <Sidebar />
        </div>
    ):
    (
      <div className='w-0 dark:bg-secondary-dark-bg'>
        <Sidebar />
        </div>
    )
    
    } */}

    <div>
      <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full' >
       <Header /> 
      </div>

    
     

      <div>

      </div>

      </div>

      </div>


    </div>

  );
}

export default App;
