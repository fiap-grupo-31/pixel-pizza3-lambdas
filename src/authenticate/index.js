const jwt = require('jsonwebtoken');
const { signingKey, extract } = require('../utils/index')
const axios = require('axios');

const authenticate = {
    elb: null,
    getConsumer: async ( _cpf ) => {
        try {
            const { data } = await axios.get(`http://${authenticate.elb}:8080/customers?cpf=${_cpf}`);
            if(!data.data[0]) 
                throw new Error('Inexistente!');

            return data.data[0];
        } catch (error) {
            console.log( 'getConsumer', error)
            return await authenticate.setCustomer( _cpf )
        }
    },
    setCustomer: async ( _cpf ) => {
        try {
            const { data } = await axios.post(`http://${authenticate.elb}:8080/customers`,{
                "name": " ",
                "mail": "",
                "cpf": _cpf,
                "birthdate": "",
                "subscription": ""
            }, {
                headers: {
                'Content-Type': 'application/json'
                }
            })

            return (!data?.data ? data: data?.data )
        } catch (error) {
            console.log( 'setCustomer', error)
            return false;
        }
    }
}

exports.handler = async (event, context, callback) => {
    const { body } = extract(event)
    const { _cpf } = body;

    authenticate.elb = process.env.ELBAPP;
    console.log( authenticate )

    const consumer = await authenticate.getConsumer( _cpf ) ;
    console.log( consumer )

    if( !consumer?._id )
        return {
            statusCode: consumer?.statusCode || 404,
            body: JSON.stringify({
                message: consumer?.message || 'error'
            }),
        };

    const accessToken = jwt.sign({ consumerId: consumer._id }, signingKey() );

	return {
		statusCode: 200,
		body: JSON.stringify({
            accessToken
        }),
	};

}