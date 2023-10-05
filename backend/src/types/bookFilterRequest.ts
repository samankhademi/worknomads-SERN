export type BookFilterRequest = {
    ISBN: string
    bookTitle: string
    publisher: string
    yearOfPublication: number | string
    page: number | string,
    take: number | string,
}