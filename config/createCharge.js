const axios = require('axios');

function createCharge(amount) {
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
    axios.post(
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
                "username": 'skey_test_5yj3rubgxihd3sxdlv2',
                "password": ''
            },
            headers: {
                'Content-Type': 'application/json'
            },
            timeout:3000
        }
    ).then((result)=>{
        console.log("result",result.data)
        return result.data
    }).catch((error)=>{
        return {error: error.response}
    });
}

module.exports = createCharge;