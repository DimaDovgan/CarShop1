const createError = (status:number, message:string) => {
    const error = new Error(message);
    (error as any).status = status;
    return error;
}
export default createError;