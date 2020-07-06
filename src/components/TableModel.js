import React, { memo, Fragment, lazy, Suspense } from "react";
import { Table, TableRow, TableCell, TableBody, TableContainer, TableHead, FormControl, Input, InputAdornment } from "@material-ui/core";
import { Search } from "@material-ui/icons";
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

const TableModel = memo(({ header, data, keys, setPesquisa, total, page, rowsPerPage }) => {
    const classes = useStyles();
    const Pagination = lazy(() => import('./Pagination'))
    return (<Suspense fallback={<div>loading...</div>}>
        <div style={{ width: '90%', height: '90%' }}>

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

            <Pagination count={total} page={page} rowsPerPage={rowsPerPage} />
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
                        {data.map((v, index) => <TableRow >{Object.keys(v).map(key => <TableCell>{v[key]}</TableCell>)} </TableRow>
                        )}
                    </TableBody>

                </Table>
            </TableContainer>
            <Pagination count={total} page={page} rowsPerPage={rowsPerPage} />
        </div>
    </Suspense>)
})


export default TableModel;