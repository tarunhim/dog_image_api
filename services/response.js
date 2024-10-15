module.exports.createJsonResponse = (success, message, error, data) => {
    return {
        success: success,
        message: message,
        error: error,
        data: data
    }
}