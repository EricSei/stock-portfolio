const jwt = require('jsonwebtoken');
const config = require('config');
/*
	Note: parameters : (next): move on to the next piece of middleware
	If the current middleware function does not end the request-response cycle, 
	it must call next() to pass control to the next middleware function. 
	Otherwise, the request will be left hanging.
*/
module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    //jwt verify and return the user payload
    const decoded = jwt.verify(token, config.get('JWT_SECRET'));
    /* what is inside payload -> 
		user: {
			id: user.id
		}
	*/
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
