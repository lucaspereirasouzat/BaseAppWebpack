import React, { useState, useReducer, Fragment, useEffect } from "react";
import { Typography, Card, Button, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import { BaseComponent } from "../components";
import DashUser from './User/DashUser';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
      flexDirection: 'row',
      display: 'flex',

    },
  },
}));

const Dashboard = ({ history }) => {

  const [open, setOpen] = React.useState(false);

  const classes = useStyles();
  let { user } = useSelector(({ auth }) => auth);
  let dispatch = useDispatch()

  useEffect(_ => {
    dispatch(require('../reduxState/ducks/auth').RegisterTokenNotification())
  }, [])

  console.log(user.Securelevel);

  if (user.Securelevel === 'adm') {

    return (
      <BaseComponent >
        {/* <Button style={{ backgroundColor: 'red' }} onClick={_ => history.push('./mentor/signup')} color={'default'} >
          Cadastrar mentor
      </Button>
        <Button onClick={_ => history.push('./mentor/index')} color={'default'} >
          Listar Mentores
      </Button>
        <Button onClick={_ => history.push('./users/index')} color={'default'} >
          Listar usuarios
      </Button> */}

      </BaseComponent >
    )
  }


  if (user.Securelevel === 'user') {
    return (
      <Fragment>

        <DashUser history={history} />
      </Fragment>
    )
  }
}

export default Dashboard


