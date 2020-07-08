import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import { Pagination, BaseComponent } from "components";
import Search from '@material-ui/icons/Search';
import { InputAdornment, Input, FormControl, Typography, Avatar, ListItemAvatar, ListItemText, Divider, ListItem, List } from '@material-ui/core';
import { fetchUsers } from "reduxState/ducks/users";



const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    margin: {
        margin: theme.spacing(1),
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center'
    },
}));


const Users = ({ history }) => {
    let [pesquisa, setPesquisa] = useState('')
    let { users, page, total, rowsPerPage } = useSelector(({ users }) => users);
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    const fetchData = () => {

    }

    const classes = useStyles();

    return (
        <BaseComponent>

            <FormControl className={classes.margin}>
                <Input
                    style={{ width: '100%' }}
                    placeholder={'Pesquisar...'}
                    value={pesquisa}
                    onChange={e => { setPesquisa(e.target.value); dispatch(fetchUsers(page, rowsPerPage, e.target.value)) }}
                    // id="input-with-icon-adornment"
                    startAdornment={
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    }
                />
            </FormControl>



            <Pagination count={total} page={page} rowsPerPage={rowsPerPage} onChangeRowsPerPage={e => dispatch(fetchUsers(page, e.target.value, pesquisa))}
                onChangePage={(e, apage) => dispatch(fetchUsers(apage, rowsPerPage, pesquisa))} />

            <Typography variant="h5" align={'center'} component="h2" gutterBottom>
                Users
      </Typography>

            <List className={classes.root}>
                {
                    users.map(({ Username, image_id, Email, Securelevel, id }) => {
                        let image = '';
                        async (image_id) => {
                            image = await require("services/Api.js").default.getImage({ token: token.token, id: image_id.String })
                        }
                        console.log(image)
                        return (
                            <Fragment>
                                <ListItem alignItems="flex-start" onClick={_ => history.push("/users/update/" + id)}>
                                    <ListItemAvatar>
                                        <Avatar alt={Username} src={image} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={Username}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    {Email}
                                                </Typography>
                                                {'  '} {Securelevel}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </Fragment>
                        )
                    })
                }

            </List>
            <Pagination
                count={total}
                page={page}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={e => dispatch(fetchUsers(page, e.target.value, pesquisa))}
                onChangePage={(e, apage) => dispatch(fetchUsers(apage, rowsPerPage, pesquisa))} />


        </BaseComponent>

    )
}

export default Users


