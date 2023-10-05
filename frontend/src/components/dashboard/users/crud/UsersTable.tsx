import * as React from "react";
import Box from "@mui/material/Box";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '@/components/dashboard/dashboardElements/Title';
import {AddEditUserForm} from './../form'
import {useUsers} from "./useUsers";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import moment from 'moment'
import {LinearProgress, TablePagination} from "@mui/material";
import {SexEnum, User} from "@/queries";
import {FilterUserForm} from "@/components/dashboard/users/crud/FilterUserForm";
import Checkbox from "@mui/material/Checkbox";

export function UserListTable(){
    const {
        userList,
        openAddEditModal,
        setOpenAddEditModal,
        userListLoading,
        editModalForm,
        setEditModalForm,
        deleteUser,
        deleteUserLoading,
        controlFilter,
        handleSubmitFilter,
        onSubmitFilter,
        pagination,
        setPagination,
        toggleActive
    } = useUsers()
    return <Box className='flex flex-col bg-white rounded-xl p-4 pt-8 relative overflow-hidden'>
        {userListLoading && <LinearProgress className='!absolute inset-x-0 top-0' />}
        <Title>
            <span>Users List</span>
            <Button
                variant='contained'
                color='primary'
                size='medium'
                onClick={() => {
                    setOpenAddEditModal(true)
                    setEditModalForm(undefined)
                }}
            >
                Add User
            </Button>
        </Title>
        <Box component="form" onSubmit={handleSubmitFilter(onSubmitFilter)} noValidate className='flex my-2 !py-4 border-y'>
            <FilterUserForm control={controlFilter} />
        </Box>
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>Full Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Sex</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Is Active</TableCell>
                    <TableCell>Created Date</TableCell>
                    <TableCell align="center">Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {userList?.message?.users.map((row:User) => (
                    <TableRow key={row.id}>
                        <TableCell className='max-w-[200px] truncate' title={`${row.firstName} ${row.lastName}`}>{`${row.firstName} ${row.lastName}`}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell className='capitalize'>{SexEnum[row.sex]?.toLowerCase()}</TableCell>
                        <TableCell>{row.age}</TableCell>
                        <TableCell className='max-w-[200px] truncate capitalize '>{row.role?.toLowerCase()}</TableCell>
                        <TableCell>
                            <Checkbox checked={row.isActive} onClick={() => {toggleActive(row.id, !row.isActive)}} />
                        </TableCell>
                        <TableCell>{moment(row.createdAt).format('MMM DD YYYY')}</TableCell>
                        <TableCell>
                            <div className='flex justify-around'>
                                <Button
                                    variant='contained'
                                    color='error'
                                    size='small'
                                    disabled={deleteUserLoading}
                                    onClick={() => {
                                        deleteUser(row.id)
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
                                        setEditModalForm({...row})
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
        {userList?.message &&
            <TablePagination
                component="div"
                count={userList?.message.total || 0}
                page={userList?.message.page - 1 || 0}
                rowsPerPage={userList?.message?.take || 10}
                onPageChange={(e, page) => setPagination({ page, take: pagination.take})}
                onRowsPerPageChange={(e) => setPagination({ page: 0, take: +e.target.value })}
            />
        }
        <AddEditUserForm open={openAddEditModal} setOpen={setOpenAddEditModal} form={editModalForm} editMode={!!editModalForm} />
    </Box>
}