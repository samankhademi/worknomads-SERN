import {BookListWithFilter, useBooksList} from "@/queries";
import {useDeleteBook} from "@/queries";
import {useEffect, useState} from "react";
import {AddBookFormRequest} from "@/components/dashboard/books/form";
import {PaginationType} from "@/types/pagination";
import {SubmitHandler, useForm} from "react-hook-form";

export function useBooks(){
    const {handleSubmit: handleSubmitFilter, control: controlFilter} = useForm<AddBookFormRequest>();

    const [openAddEditModal, setOpenAddEditModal] = useState<boolean>(false)
    const [editModalForm, setEditModalForm] = useState<Partial<AddBookFormRequest>|undefined>()
    const [pagination, setPagination] = useState<PaginationType>({ page: 0, take: 10 })
    const [filterQuery, setFilterQuery] = useState<BookListWithFilter>({ page: 0, take: 10 })

    const {data: bookList, refetch: getBookList, isFetching: bookListLoading} = useBooksList(filterQuery)
    const { mutateAsync: deleteBook, isLoading: deleteBookLoading } = useDeleteBook()

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
            take: pagination.take
        })
    }
    return {
        bookList,
        getBookList,
        bookListLoading,
        openAddEditModal,
        setOpenAddEditModal,
        editModalForm,
        setEditModalForm,
        pagination,
        setPagination,
        deleteBook,
        deleteBookLoading,
        handleSubmitFilter,
        controlFilter,
        onSubmitFilter
    }
}