import Box from "@mui/material/Box";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '@/components/dashboard/dashboardElements/Title';
import {AddEditBookForm} from './../form'
import {useBooks} from "@/components/dashboard/books/crud";
import * as React from "react";
import {Book} from "@/types/book";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import moment from 'moment'
import {LinearProgress, TablePagination} from "@mui/material";
import {FilterBookForm} from "@/components/dashboard/books/crud/FilterBookForm";

export function BookListTable(){
    const {
        bookList,
        openAddEditModal,
        setOpenAddEditModal,
        bookListLoading,
        editModalForm,
        setEditModalForm,
        setPagination,
        pagination,
        deleteBook,
        deleteBookLoading,
        controlFilter,
        handleSubmitFilter,
        onSubmitFilter,
    } = useBooks()
    return <Box className='flex flex-col bg-white rounded-xl p-4 pt-8 relative overflow-hidden'>
        {bookListLoading && <LinearProgress className='!absolute inset-x-0 top-0' />}
        <Title>
            <span>Book List</span>
            <Button
                variant='contained'
                color='primary'
                size='medium'
                onClick={() => {
                    setOpenAddEditModal(true)
                    setEditModalForm(undefined)
                }}
            >
                Add Book
            </Button>
        </Title>
        <Box component="form" onSubmit={handleSubmitFilter(onSubmitFilter)} noValidate className='flex my-2 !py-4 border-y'>
            <FilterBookForm control={controlFilter} />
        </Box>
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>ISBN</TableCell>
                    <TableCell>Publisher</TableCell>
                    <TableCell>Year Of Publication</TableCell>
                    <TableCell>Created Date</TableCell>
                    <TableCell align="center">Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {bookList?.message?.books?.map((row:Book) => (
                    <TableRow key={row.id}>
                        <TableCell className='max-w-[200px] truncate' title={row.bookTitle}>{row.bookTitle}</TableCell>
                        <TableCell>{row.ISBN}</TableCell>
                        <TableCell className='max-w-[200px] truncate'>{row.publisher}</TableCell>
                        <TableCell>{row.yearOfPublication}</TableCell>
                        <TableCell>{moment(row.createdAt).format('MMM DD YYYY')}</TableCell>
                        <TableCell>
                            <div className='flex justify-around'>
                                <Button
                                    variant='contained'
                                    color='error'
                                    size='small'
                                    disabled={deleteBookLoading}
                                    onClick={() => {
                                        deleteBook(row.id)
                                    }}
                                >
                                    Remove
                                </Button>
                                <Divider orientation="vertical" flexItem />
                                <Button
                                    variant='contained'
                                    color='info'
                                    size='small'
                                    onClick={() => {
                                        setOpenAddEditModal(true)
                                        setEditModalForm({...row, yearOfPublication: row?.yearOfPublication?.toString()})
                                    }}
                                >
                                    Edit
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        {bookList?.message &&
            <TablePagination
                component="div"
                count={bookList?.message.total || 0}
                page={bookList?.message.page - 1 || 0}
                rowsPerPage={bookList?.message?.take || 10}
                onPageChange={(e, page) => setPagination({ page, take: pagination.take})}
                onRowsPerPageChange={(e) => setPagination({ page: 0, take: +e.target.value })}
            />
        }
        <AddEditBookForm open={openAddEditModal} setOpen={setOpenAddEditModal} form={editModalForm} editMode={!!editModalForm} />
    </Box>
}