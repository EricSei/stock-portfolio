const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //get token which is sent from req.header
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    //jwt verify and return the user payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    /* what is inside payload -> 
		user: {
			id: user.id
		}
	*/
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
