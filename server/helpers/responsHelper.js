function createResponsSuccess(data){
    return{status:200, data};
}
function createResponsError(status, message){
    return{status: status || 500, data: {error: message|| 'okänt fel'}};
}
function createResponsMessage(status,message){
    return { status: status || 200, data: {message}};
}
module.exports={
    createResponsSuccess,
    createResponsError,
    createResponsMessage
};