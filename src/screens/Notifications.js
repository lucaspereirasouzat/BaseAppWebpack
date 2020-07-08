import React, { useReducer, useState, useRef, useEffect, Suspense, lazy } from "react";
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fetchNotifications } from "reduxState/ducks/notifications";
import { useDispatch, useSelector } from "react-redux";
import { BaseComponent } from "components";

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 300,
            flexDirection: 'row',
            display: 'flex',

        },
    },
}));

const Notifications = () => {
    let [pesquisa, setPesquisa] = useState('')
    let { notifications, rowsPerPage, page, total } = useSelector(({ notification }) => notification)

    const classes = useStyles();
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNotifications())
    }, [])

    const TableModel = lazy(() => import('components/TableModel'));

    return (
        <BaseComponent>
            <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', width: '100vw', height: '100vh' }}>
                <Suspense fallback={<div>Loading...</div>}>
                    <TableModel
                        total={total}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        setPesquisa={v => { setPesquisa(v); dispatch(fetchNotifications(page, rowsPerPage, v)); }}
                        onChangeRowsPerPage={e => dispatch(fetchNotifications(page, e.target.value, pesquisa))}
                        onChangePage={(e, apage) => dispatch(fetchNotifications(apage, rowsPerPage, pesquisa))}
                        header={['Data', 'Titulo', 'Corpo']}
                        data={notifications} />
                </Suspense>
            </div>
        </BaseComponent>
    )
}

export default Notifications