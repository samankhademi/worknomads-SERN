import {HttpResponse} from "@/queries/http";
import {Book} from "@/types/book";
import {AddBookFormRequest} from "@/components/dashboard/books/form";

export interface BooksResponse extends HttpResponse{
    message: {
        books: Book[]
        total: number
        page: number
        take: number
    }
}

export type BookListWithFilter = Partial<AddBookFormRequest> & {
    page: number,
    take: number
}