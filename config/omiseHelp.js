const axios = require('axios');
const username = 'skey_test_5yj3rubgxihd3sxdlv2';

async function createCharge(amount) {
    try {
        let date = new Date()
        date.setMinutes(date.getMinutes() + 15);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');

        const formattedDateUTC = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
        const response = await axios.post(
            'https://api.omise.co/charges',
            {
                amount: amount*100,
                currency: "THB",
                source: {
                    "type": "promptpay"
                },
                expires_at: formattedDateUTC
            },
            {
                auth: {
                    "username": username,
                    "password": ''
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout:3000
            }
        )
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error);
        return {error:error.message}
    }
}

async function getCharge(id) {
    try {
        const response = await axios.get(
            `https://api.omise.co/charges/${id}`,
            {
                auth: {
                    "username": username,
                    "password": ''
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout:3000
            }
        )
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error to handle it outside the function
    }
}

module.exports = { createCharge, getCharge };