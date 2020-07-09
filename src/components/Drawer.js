import React, { memo, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from "react-router-dom";
// import routes from '../routes';

const useStyles = makeStyles({
    list: {
        width: 250,
        backgroundColor: '#303f9f',
        height: 'auto'
    },
    fullList: {
        width: 'auto',
        backgroundColor: '#303f9f',
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
                                            <ListItem style={{ color: 'white' }} onClick={_ => history.push(path)} button key={id}>
                                                <ListItemIcon><Icon style={{ color: 'white' }} /></ListItemIcon>
                                                <ListItemText style={{ color: 'white' }} primary={text} />
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
}, (prev, next) => prev.state === next.state)

export default DrawerComponent;