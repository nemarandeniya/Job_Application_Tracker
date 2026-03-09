import { jwtDecode } from 'jwt-decode'

export const useGetUser = () => {
    const token = localStorage.getItem("token")
    if (!token) {
        return null
    }

    try {
        const decoded = jwtDecode(token)
        return decoded
    } catch (error) {
        console.error("Invalid token", error);
        return null
    }
}


export const useGetUserId = () => {
    return window.localStorage.getItem("userID")
}