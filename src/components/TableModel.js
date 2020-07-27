import React, { memo, lazy, Suspense } from "react";
import { Table, TableRow, TableCell, TableBody, TableContainer, TableHead, FormControl, Input, InputAdornment, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
// import Pagination from "./Pagination";

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
        width: '98%',
        alignItems: 'center',
        justifyContent: 'center'
    },
}));
const Pagination = lazy(() => import('./Pagination'))
const Search = require('@material-ui/icons/Search').default

const TableModel = memo(({ header, data, total, page, rowsPerPage, setPesquisa, onChangeRowsPerPage, onChangePage }) => {
    const classes = useStyles();

    return (
        <div style={{ width: '100%', height: '100%' }}>

            <FormControl className={classes.margin}>
                <Input
                    style={{ width: '100%' }}
                    placeholder={'Pesquisar...'}
                    // value={pesquisa}
                    onChange={e => { setPesquisa(e.target.value); }}
                    // id="input-with-icon-adornment"
                    startAdornment={
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    }
                />
            </FormControl>
            <Suspense fallback={<div></div>} >
                <Pagination
                    onChangeRowsPerPage={onChangeRowsPerPage}
                    count={total}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onChangePage={onChangePage}
                />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {
                                    header.map((v, index) => <TableCell component="th" id={index} scope="row" padding="none">{v}</TableCell>)
                                }
                            </TableRow>
                        </TableHead>


                        <TableBody>
                            {data.map(
                                (v) => <TableRow>
                                    {
                                        Object.keys(v).map(key =>
                                            <TableCell>{v[key]}</TableCell>
                                        )}
                                </TableRow>
                            )}
                        </TableBody>

                    </Table>
                </TableContainer>

                <Pagination
                    onChangeRowsPerPage={onChangeRowsPerPage}
                    count={total}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onChangePage={onChangePage}
                />
            </Suspense>
        </div>
    )
},// (prev, next) => //(prev.count !== next.count || prev.page !== next.page || prev.rowsPerPage !== next.rowsPerPage)
)


export default TableModel;