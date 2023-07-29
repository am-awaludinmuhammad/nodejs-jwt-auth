import { ResponseError } from "../error/response-error.js";

const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: false
    });
    if (result.error) {
        throw new ResponseError(400, 'The given data was invalid', result.error.details);
    } else {
        return result.value;
    }
}

export {
    validate
}