import React, { memo } from "react";
import TablePagination from '@material-ui/core/TablePagination';

const Pagination = memo(({ count, page, rowsPerPage, onChangePage, onChangeRowsPerPage, ...props }) => {
    return <TablePagination
        style={{ width: '1%' }}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        onChangePage={onChangePage}
        labelRowsPerPage={'Campos por pagina'}
        labelDisplayedRows={
            ({ from, to, count }) => `${from}-${to === -1 ? count : to} de ${count}`}
        {...props} />
})


export default Pagination;