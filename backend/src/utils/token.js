const jwt = require("jsonwebtoken");
require("dotenv").config();

class Token {
  async generateToken(user) {
    return jwt.sign(user,  process.env.JWT_SECRET);
  }

  async validateToken(token) {
    return jwt.verify(token,  process.env.JWT_SECRET, (err, decoded) => {
      if (err) 
        throw new Error('Problema para checar os dados de acesso');
      else
        return decoded; 
    }); 
  }

  async decodeToken(token){
    return await jwt.decode(token);
  }
}

module.exports = new Token();