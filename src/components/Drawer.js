import React, { memo, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useHistory } from "react-router-dom";
// import routes from '../routes';

const useStyles = makeStyles({
    list: {
        width: 250,
        backgroundColor: '#303f9f'
    },
    fullList: {
        width: 'auto',
    },
});


// componente de drawer para o header
const DrawerComponent = memo(({ state, setState, user }) => {
    const classes = useStyles();
    const history = useHistory()


    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState(open);
    };

    const routes = require('../routes').default

    return (
        <Fragment>
            <Drawer open={state} onClose={toggleDrawer('left', false)}>
                <div
                    className={classes.list}
                    role="presentation"
                    onClick={toggleDrawer("left", false)}
                    onKeyDown={toggleDrawer("left", false)}
                >

                    <List style={{ backgroundColor: '#303f9f' }}>
                        {
                            routes.map(({ icon: Icon, path, text, id, secure, roles }) => {
                                if (Icon && text) {
                                    // if (!!!user && roles.some(v => v == user.secureLevel) && secure) {
                                    if (user && roles.some(v => v == user.Securelevel) && secure)
                                        return (
                                            <ListItem color={'blue'} onClick={_ => history.push(path)} button key={id}>
                                                <ListItemIcon><Icon /></ListItemIcon>
                                                <ListItemText primary={text} />
                                            </ListItem>)
                                }
                                // }
                            }
                            )}

                    </List>
                    <Divider />

                </div>
            </Drawer>

        </Fragment>
    );
})

export default DrawerComponent;