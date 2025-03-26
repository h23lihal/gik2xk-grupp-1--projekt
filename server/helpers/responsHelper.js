// Funktion som skapar ett framgångs-svar (response) med en statuskod 200 och data
function createResponsSuccess(data){
    return { 
        status: 200, 
        data 
    };
}

// Funktion som skapar ett fel-svar (response) med en statuskod och ett felmeddelande
function createResponsError(status, message){
    return {
        status: status || 500, 
        data: {
            error: message || 'okänt fel' 
        }
    };
}

// Funktion som skapar ett meddelande-svar (response) med en statuskod och ett meddelande
function createResponsMessage(status, message){
    return { 
        status: status || 200,   
            data: { 
            message 
        }
    };
}

// Exporterar funktionerna så att de kan användas i andra filer
module.exports = {
    createResponsSuccess, 
    createResponsError, 
    createResponsMessage 
};