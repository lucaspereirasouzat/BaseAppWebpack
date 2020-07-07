import React, { Fragment, useState, useEffect, lazy, Suspense, memo } from 'react';
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

// Header appBar barra superior
const MenuAppBar = memo(_ => {
  // Pegar dados do usuario e token 
  let { user, token } = useSelector(({ auth }) => auth);

  let dispatch = useDispatch();
  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [image, setImage] = useState('');
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(_ => {
    if (user)
      Image(user.Pathfile.String)
  }, [])

  // Carregar a imagem com token
  const Image = async (id) => {
    let image = await require("../services/Api.js").default.getImage({ token: token.token, id })
    setImage(image)
  }


  // Para fazer o roteamento 
  let { push } = useHistory();
  return (
    <div className={classes.root}>
      <Drawer state={drawer} user={user} setState={value => setDrawer(value)} />
      <AppBar position="static">
        <Toolbar>

          {/* mensagem de boas vindas no header */}
          {user && (<Fragment>
            <IconButton onClick={_ => setDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" className={classes.title}>
              Seja bem vindo {user.Username}
            </Typography>
          </Fragment>
          )}
          {/* Menu geral da direita com rotas gerais  */}
          {user ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar src={image} />
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
                <MenuItem onClick={_ => push('/profile')}>Profile</MenuItem>
                <MenuItem onClick={_ => push('/notifications')}>Notifications</MenuItem>
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
                  <MenuItem onClick={_ => push('/')}>HomeScreen</MenuItem>
                  <MenuItem onClick={_ => push('/login')}>Login</MenuItem>
                  <MenuItem onClick={_ => push('/signup')}>Cadastro</MenuItem>
                </Menu>
              </div>
            )}
        </Toolbar>
      </AppBar>
    </div >
  );
}, () => false)

export default MenuAppBar;