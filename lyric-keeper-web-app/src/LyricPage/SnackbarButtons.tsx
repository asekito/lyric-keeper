import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { Home, Edit, Cancel } from '@material-ui/icons';
import { Link } from '../GlobalComponents';

export const SnackbarButtons: React.FC = ({ edit, setEdit }) => (
  <Grid container>
    <Grid item xs={12}>
      <Link to="/">
        <Button
          size="large"
          variant="contained"
          style={{
            display: !!edit ? 'flex' : 'flex',
          }}
        >
          <Home /> Home
        </Button>
      </Link>
    </Grid>
    <Grid item xs={12}>
      <Button
        size="large"
        variant="contained"
        style={{
          marginTop: '15px',
          display: !!edit ? 'flex' : 'flex',
        }}
        onClick={() => setEdit(true)}
      >
        <Edit /> EDIT
      </Button>
    </Grid>
    <Grid item xs={12}>
      <Button
        size="large"
        variant="contained"
        style={{
          marginTop: '15px',
          display: !!edit ? 'flex' : 'none',
        }}
        onClick={() => setEdit(false)}
      >
        <Cancel /> CANCEL
      </Button>
    </Grid>
  </Grid>
);
