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
import { getUsers } from '../Auth';
import { useDispatch, useSelector } from 'react-redux';


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
  const results = useSelector((state) => state.users )
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {

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
  console.log('results', results)

  return (
    <Grid container style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      
      
    <TableContainer component={Paper} style={{width: 700}} >
    <Grid xs={12} lg={12} md={12} item>
        <SearchApp xs={12} setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      </Grid>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Users </StyledTableCell>

            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Phone</StyledTableCell>
            <StyledTableCell align="right">Date Created</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {results.filter(user => {
            if(searchTerm === ""){
              return user
            }else if(
              user.name.charAt(0) === searchTerm.charAt(0) && user.name.charAt(1) === searchTerm.charAt(1)
            ){
              return user
            }
          }).map((user) => (
            <StyledTableRow key={user._id}>
              <StyledTableCell component="th" scope="row">
                {user.name}
              </StyledTableCell>
              <StyledTableCell align="right">{user.email}</StyledTableCell>
              <StyledTableCell align="right">{user.phone}</StyledTableCell>
              <StyledTableCell align="right">{user.createdAt}</StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
  );
}
