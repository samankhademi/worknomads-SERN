export type UserFilterRequest = {
    firstName: string
    lastName: string
    age: string | number
    role: string | number
    sex: number | string
    page: number | string,
    take: number | string,
}