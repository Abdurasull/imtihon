class ClienError extends Error{
    constructor(message, statusCode){
        super(message);
        this.message = "Client Error: " + message;
        this.statusCode = statusCode;
    }
};

class ServerError extends Error{
    constructor(message, statusCode){
        super(message);
        this.message = "Server Error: " + message;
        this.statusCode = 500;
    }
};
const globalError = (err, res) => {
    let error = {
        message: err.message,
        status: err.status || 500
    }
    res.status(error.status).json(error.message);
}

export {globalError, ClienError, ServerError};

