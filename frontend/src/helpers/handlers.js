export function defaultHandler(response) {
    return response.data
}

export function errorHandler(error) {
    throw error
}