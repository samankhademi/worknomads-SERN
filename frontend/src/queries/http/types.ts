
export interface HttpResponse<Payload = any> {
    statusCode: number;
    exceptionCode: string;
    message: any;
}
