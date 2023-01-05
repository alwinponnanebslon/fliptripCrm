import { url } from "../Services/url.service"

export const generateFilePath = (file) => {
    return `${url}/${file}`
}

export const generateFilePathUPload = (file) => {
    return `${url}/uploads/${file}`
}