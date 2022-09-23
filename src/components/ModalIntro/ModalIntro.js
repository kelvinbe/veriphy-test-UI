import React, { useDebugValue, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import BuildIcon from '@mui/icons-material/Build';

import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import hello from '../../data/hi.gif'
import { useCallback } from 'react';
import { setValue } from '@syncfusion/ej2/base';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";


const messages = ['Welcome to Veriphy', 'A simple Admin Dashboard', 'Built using React and NodeJs'];
const functions = ['View and Delete users in table', 'Add new Users', 'View stats in graphs'];


function SimpleDialog(props) {
  const { onClose, selectedValue, open, setOpen, setClosedDialog, setIsTrue } = props;
  const closeddd = useSelector((state) => state.closedDialog)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  

  const [data, setData] = useState([''])
  const [value, setValue] =useState(false)
  const clo = localStorage.getItem('closedDialogggg')
  console.log('clo', clo)

  const handleClose = () => {
    localStorage.removeItem('closedDialogggg')

    setOpen(false)
    setClosedDialog(false)

    onClose(selectedValue);

  };

  

  const handleListItemClick = (value) => {

    if(value === 'View and Delete users in table'){

      navigate('/user')
      onClose(value)

    }else if(value === 'Add new Users'){

      navigate('/add')
      onClose(value)


    }else{
      onClose(value)

    }
  };
  const changeMessage = useCallback(() => {
    const index = Math.floor(Math.random() * messages.length)
    setData(messages[index])
  })

  useEffect(() => {
    const intervalID = setInterval(changeMessage, 3000)
    return () => clearInterval(intervalID)
  },[changeMessage])


  return (
    <Dialog onClose={handleClose} open={open}>
      <div style={{textAlign: 'right'}}>
      <Button  onClick={handleClose}>x</Button>
      </div>
      <DialogTitle style={{textAlign: 'center'}}>{data}</DialogTitle>
      <img src={hello} width={200} height={200} />
      
      <Button onClick={() => setValue(!value)}>
        {value ? 'Close':'Next'}
      </Button>

      {value &&
      <List sx={{ pt: 0 }}>
      <h1 style={{textAlign: 'center', fontWeight: 'bold'}}>Current Functionalities</h1>

        {functions.map((email) => (
          <ListItem button onClick={() => handleListItemClick(email)} key={email}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <BuildIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}

      </List>}

    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo({open, setOpen, setClosedDialog}) {
  // const [open, setOpen] = React.useState(false);
  const [isTrue, setIsTrue] = useState(true)


  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
    

      <SimpleDialog
        open={open}
        onClose={handleClose}
        setOpen={setOpen}
        setClosedDialog={setClosedDialog}
      />
    </div>
  );
}
