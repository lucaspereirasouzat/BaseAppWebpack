import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, MenuItem, Menu, Avatar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from "./Drawer";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from '../reduxState/ducks/auth'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar() {
  let history = useHistory();

  let { user, token } = useSelector(({ auth }) => auth);
  let dispatch = useDispatch();
  const classes = useStyles();
  const [drawer, setDrawer] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [image, setImage] = React.useState('');
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {

    setAnchorEl(null);
  };

  React.useEffect(_ => {
    // console.log(user.FileId.Int64);

    Image(user.Pathfile.String)
  }, [])
  // Image()

  const Image = async (id) => {
    let image = await require("../services/Api.js").default.getImage({ token: token.token, id })
    setImage(image)
  }


  return (
    <div className={classes.root}>
      <Drawer state={drawer} user={user} setState={value => setDrawer(value)} />
      {/* <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
      <AppBar position="static">
        <Toolbar>
          {user && (<Fragment>
            <IconButton onClick={_ => setDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" className={classes.title}>
              Seja bem vindo {user.Username}
            </Typography>
          </Fragment>)}
          <div></div>
          {user ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >

                {/* <Image id={user.File_id} /> */}
                <Avatar src={image} />
                {/* <AccountCircle /> */}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={_ => history.push('/profile')}>Profile</MenuItem>
                <MenuItem onClick={_ => history.push('/notifications')}>Notifications</MenuItem>
                <MenuItem onClick={_ => dispatch(Logout()) && handleClose()}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  {/* <Avatar src={'http://localhost:3333/images/' + user.image_id + "?" + new Date().getTime()} /> */}
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={_ => history.push('/')}>HomeScreen</MenuItem>
                  <MenuItem onClick={_ => history.push('/login')}>Login</MenuItem>
                  <MenuItem onClick={_ => history.push('/signup')}>Cadastro</MenuItem>
                </Menu>
              </div>
            )}
        </Toolbar>
      </AppBar>
    </div >
  );
}