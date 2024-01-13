const jwt = require('jsonwebtoken');
const { signingKey } = require('../utils/index')

module.exports.handler = async (event) => {
    const authorization = ( event?.authorizationToken || event?.headers?.authorization ).replace('Bearer ','');
    const methodArn = event?.routeArn || event.methodArn || '';

    if (authorization === '') {
      return generateAuthResponse('Deny', methodArn)
    }
  
    try {
      const token = authorization.replace('Bearer ', '')
  
      const decoded = jwt.verify(token, signingKey() )
      console.log('Allow', decoded)
  
      return generateAuthResponse('Allow', methodArn)
    } catch (err) {
      return generateAuthResponse('Deny', methodArn)
    }
  
    function generateAuthResponse (effect, methodArn) {
        return {
            "isAuthorized": (effect == 'Allow'),
            "context": {
              "exampleKey": "exampleValue"
            }
        }
    }
}

