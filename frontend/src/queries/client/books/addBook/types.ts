import {HttpResponse} from "@/queries/http";
import {Book} from "@/types/book";
import {AddBookFormRequest} from '@/components/dashboard/books/form/types'

export type AddBookRequestType = AddBookFormRequest

export interface AddBookResponseType extends HttpResponse {
    message: Book
}
