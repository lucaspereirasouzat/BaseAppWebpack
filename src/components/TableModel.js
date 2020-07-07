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

const TableModel = memo(({ header, data, total, page, rowsPerPage, setPesquisa }) => {
    const classes = useStyles();
    const Pagination = require('./Pagination').default
    const Search = require('@material-ui/icons/Search').default

    return (
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
    )
})


export default TableModel;