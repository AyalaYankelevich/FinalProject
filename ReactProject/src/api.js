import axios from 'axios';

export const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:5095/api/Client/get');
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};