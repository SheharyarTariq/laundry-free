import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Spinner() {
  return (
    <Box sx={{ display: 'flex', color: 'black' }}>
      <CircularProgress color='inherit' size={20}/>
    </Box>
  );
}