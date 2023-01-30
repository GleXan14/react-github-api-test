import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { Fragment, useEffect, useState } from 'react';
import MenuPopover from './menu-popover.component';
import VisibilityIcon from '@mui/icons-material/Visibility';


interface Props{
    headers:string[],
    data:any[],
    rowImageIndex?:number,
    onPageChange?: (
        newPage: number,
        rowsPerPage:number
    ) => Promise<void>;
    onDetailsClick?: (row:any) => void;
    count: number;
}


function CustomTable(props: Props){

    const [rows, setRows] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(25);
    const {headers = [], data = [], rowImageIndex, onPageChange, onDetailsClick,  count} = props;
    

    useEffect(() => {

        setRows(data);
        console.log(data);

        return () => {
            setRows([]);
            setPage(0);
            setRowsPerPage(25);
        }
    }, [])

    useEffect(() => {
        setRows(data);
    }, [data])

    useEffect(() => {
        if(onPageChange && onPageChange !== undefined){
            onPageChange(page, rowsPerPage);
        }
    }, [page, rowsPerPage])

    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDetailsClick = (event: React.MouseEvent<HTMLLIElement>, row:any) => {
        onDetailsClick!(row);
    };

    return (
        <div className="table">
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
                        <TableHead>
                            <TableRow>
                                {headers.map((header, index) =>
                                    <TableCell key={index}>{header}</TableCell>
                                )}
                                <TableCell>ACCIONES</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows && rows.length ?
                                <>
                                    {rows.map((row, index) => 
                                        <TableRow key={index}>
                                            {Object.keys(row).map((rowKey, rowKeyIndex) => 
                                                <Fragment key={rowKeyIndex}>
                                                    {!!(rowImageIndex && rowImageIndex === rowKeyIndex) ?
                                                    <TableCell>
                                                        <img src={row[rowKey]} 
                                                        className="table-image"
                                                        width={50} height={50} alt="data-image"/>
                                                    </TableCell> :
                                                    <TableCell>
                                                        {row[rowKey]}
                                                    </TableCell>}
                                                </Fragment>
                                            )}

                                            <TableCell>
                                                <MenuPopover
                                                name={`table-actions-${index}`}
                                                title={`ACCIONES`}
                                                items={[{
                                                    text: 'Detalles',
                                                    icon: <VisibilityIcon fontSize="small" />,
                                                    onClick: (event:any) => handleDetailsClick(event, row)
                                                }]}
                                                customButtonClass="table-actions"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )} 
                                </> :

                                <TableRow>
                                    <TableCell align="center" colSpan={headers.length+1}>
                                        <h4>No se han encontrado datos.</h4>
                                    </TableCell>
                                </TableRow>
                            
                            }


                        </TableBody>

                    </Table>
                </TableContainer>
                <TablePagination 
                component="div"
                rowsPerPageOptions={[25, 50, 100]}
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    )
}

export default CustomTable;


