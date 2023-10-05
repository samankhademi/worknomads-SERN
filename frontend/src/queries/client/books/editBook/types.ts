import {HttpResponse} from "@/queries/http";
import {Book} from "@/types/book";
import {AddBookFormRequest} from '@/components/dashboard/books/form/types'

export type EditBookRequestType = Partial<AddBookFormRequest>

export interface EditBookResponseType extends HttpResponse {
    message: Book
}
