import { url } from "../Services/url.service"

export const generateFilePath = (file) => {
    return `${url}/${file}`
}