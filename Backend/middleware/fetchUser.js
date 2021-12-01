const jwt = require("jsonwebtoken");
const JWT_SECRET = "Harryisagoodb$oy";

// fecthes the user from the jwt token
const fetchUser = (req, res, next) => {
  const token = req.header("authtoken");
  if(!token){
    return res.send("token not found")
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.send("invalid token");
  }
};
module.exports = fetchUser;
