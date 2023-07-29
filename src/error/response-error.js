class ResponseError extends Error {

    constructor (status, message, details = {}) {
        super(message);
        this.status = status;
        if (details.length) {
            this.details = details.map((item) => {
                return {
                    message: item.message,
                    context: item.context
                }
            });
        }
    }
}

export {
    ResponseError
}