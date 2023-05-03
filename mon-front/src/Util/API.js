import axios from "axios";

export const fetchPersonList = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/person/allActive`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}