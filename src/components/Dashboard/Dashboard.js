import React, {useEffect, useState} from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SearchApp from './Search';
import { getUsers, deleteUser } from '../Auth';
import { useDispatch, useSelector } from 'react-redux';
import Header from './header';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
// import Tour from 'reactour'
import BasicAlerts from '../Alert/Alert';
import { Alert } from '@mui/material';
import Pie from '../../pages/Charts/Pie'
import CircularStatic from "../../progress";
import CachedIcon from '@mui/icons-material/Cached';




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function Dashboard() {

  const dispatch = useDispatch()
  const results = useSelector((state) => state.users)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const [isTourOpen, setIsTourOpen] = useState(true)
  const user = localStorage.getItem('profile')
  console.log('user', user['name'])
  const [showDialog, setShowDialog] = useState(false)
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('')
  const [alert, setAlert] = useState(false)
  const [toggle, setToggle] = useState(false)
  const userUsed = JSON.parse(user)
  const name = "name"
  const steps = [
    {
      selector: '.first-step',
      content: 'Welcome to the dashboard',
    },
    {
      selector: '.second-step',
      content: 'You can search for a particular user on the search bar',
    },
    {
      selector: '.third-step',
      content: 'You can order by date or by name',
    }, 
    {
      selector: '.fourth-step',
      content: 'You can delete a user by clicking on the delete button in the table',
    },
    // ...
  ]
  const handleClickOpen = () => {
   setOpen(true)
   setShowDialog(true)

  };

  const closeTour = () => {
    setIsTourOpen(false)
  }


  // const RenderTour = () => {
  //   return (
  //     <Tour
  //       steps={steps}
  //       isOpen={isTourOpen}
  //       onRequestClose={closeTour} />
  //   )
  // }



  const deleteUsers = async (id) => {
    const del = await deleteUser(id)
    setText(del.data.message)
    setAlert(true)
    setTimeout(() => {
      console.log('hello')
    setAlert(false)
    

    }, 3000)
    const users = await getUsers()
    dispatch({type: 'GET_USERS', data: users})


  }

  const handleToggle = () => {

    setToggle(!toggle)

  }

 


// const DialogSlide = ({id}) => {
//   results.filter(user => user._id === user._id)
// };
  

// return (
//   <div>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">
//           {"Delete User?"}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//            Do you want to delete the following user
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => handleClose(user)}>Delete</Button>
//           <Button onClick={handleClose} autoFocus>
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//   </div>
// );
// }

  useEffect(() => {
    if(!user){
      navigate('/')
    }

    const FetchData = async () => {
      try {
        const users = await getUsers()
        dispatch({type: 'GET_USERS', data: users})
      } catch (err) {
        console.error(err);
      }
    }

    FetchData()


  }, [dispatch])

  if(!results) return null
  return ( !results ? <CircularStatic /> :
    <Grid container style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
    <Header />
    <Grid style={{display: 'flex'}}>
      <Button style={{backgroundColor: 'blue'}} onClick={handleToggle}>
          <CachedIcon style={{backgroundColor: 'blue'}} />
        </Button>
      </Grid>
   { !toggle ?  <TableContainer component={Paper} style={{width: 700,marginTop: 82, marginLeft: 20}}   sx={{height: 500}}>
    <h2>Welcome {userUsed[name]}</h2>
    {alert && <BasicAlerts text={text} />}
    <Grid xs={12} lg={12} md={12} item>
        <SearchApp xs={12} setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      </Grid>
      <Table sx={{ minWidth: 500}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Users </StyledTableCell>

            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Phone</StyledTableCell>
            <StyledTableCell align="right">Date Created</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {results.length > 0 ? results.filter(user => {
            if(searchTerm === ""){
              return user
            }else if(
              user.name.charAt(0) === searchTerm.charAt(0) && user.name.charAt(1) === searchTerm.charAt(1)
            ){
              return user
            }
          }).map((user) => (
            <StyledTableRow key={user._id} onClick={handleClickOpen}>
              <StyledTableCell component="th" scope="row">
                {user.name}
              </StyledTableCell>
              <StyledTableCell align="right">{user.email}</StyledTableCell>
              <StyledTableCell align="right">{user.phone}</StyledTableCell>
              <StyledTableCell align="right">{user.createdAt} </StyledTableCell> 
              <StyledTableCell align="right">
                <Button variant="text" onClick={() => deleteUsers(user._id)}>Del</Button>
                </StyledTableCell> 
            </StyledTableRow>
          )): <div style={{display: 'flex', justifyContent: 'center'}}>No users! Head to Add User to populate table</div>}
        </TableBody>
      </Table>
    </TableContainer> : <Pie />}
    </Grid>)
  
}
