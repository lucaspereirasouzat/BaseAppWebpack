import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import { BaseComponent } from "components";
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



  const [open, setOpen] = useState(false);

  const classes = useStyles();
  let { user } = useSelector(({ auth }) => auth);
  let dispatch = useDispatch()

  useEffect(_ => {
    const messaging = require('firebase').messaging();
    console.log('serviceWorker', messaging)
    messaging.onMessage(payload => {
      console.log('[firebase-messaging-sw.js] Received background message ', payload);
    })

    dispatch(require('reduxState/ducks/auth').RegisterTokenNotification())
  }, [])


  if (user.Securelevel === 'adm') {

    return (
      <BaseComponent >
        <button onClick={_ => history.push('./users')} color={'default'} >
          Listar usuarios
      </button>
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


