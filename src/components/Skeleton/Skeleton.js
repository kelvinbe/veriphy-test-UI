import React from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';


const Skeletonn = () => {

  return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
    <Box sx={{ width: 300 }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
    </div>
  );
}



export default Skeletonn