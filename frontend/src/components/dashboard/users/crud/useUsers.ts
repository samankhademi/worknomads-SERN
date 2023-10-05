import {useEffect, useState} from "react";
import {useEditUserRequest, UsersListWithFilter, useUserList} from "@/queries";
import {useDeleteUser} from "@/queries";
import {AddUserFormRequest} from "@/components/dashboard/users/form";
import {SubmitHandler, useForm} from "react-hook-form";
import {AddBookFormRequest} from "@/components/dashboard/books/form";
import {PaginationType} from "@/types/pagination";

export function useUsers(){
    const {handleSubmit: handleSubmitFilter, control: controlFilter} = useForm<AddUserFormRequest>();

    const [filterQuery, setFilterQuery] = useState<UsersListWithFilter>({ page: 0, take: 10 })
    const [openAddEditModal, setOpenAddEditModal] = useState<boolean>(false)
    const [pagination, setPagination] = useState<PaginationType>({ page: 0, take: 10 })
    const [editModalForm, setEditModalForm] = useState<Partial<AddUserFormRequest>|undefined>()
    const {data: userList, refetch: getUserList, isFetching: userListLoading} = useUserList(filterQuery)
    const { mutateAsync: deleteUser, isLoading: deleteUserLoading } = useDeleteUser()
    const { mutateAsync: editUserMutate } = useEditUserRequest()

    useEffect(() => {
        setFilterQuery({
            ...filterQuery,
            page: pagination.page + 1,
            take: pagination.take
        })
    },[pagination])

    const onSubmitFilter: SubmitHandler<Partial<AddBookFormRequest>> = async (data) => {
        const searchQuery:any = {}
        Object.entries(data).forEach(([key, value]) => {
            if (value && typeof (value) !== undefined) searchQuery[key] = value;
        })
        setFilterQuery({
            ...searchQuery,
            page: 0,
            take: filterQuery.take
        })
    }

    const toggleActive = (id: number, isActive:boolean) => {
        editUserMutate({ id, isActive })
    }

    return {
        userList,
        getUserList,
        userListLoading,
        openAddEditModal,
        setOpenAddEditModal,
        editModalForm,
        setEditModalForm,
        deleteUser,
        deleteUserLoading,
        pagination,
        setPagination,
        handleSubmitFilter,
        controlFilter,
        onSubmitFilter,
        filterQuery,
        setFilterQuery,
        toggleActive
    }
}