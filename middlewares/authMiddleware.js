const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const [bearer, token] = authorizationHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Formato de token inválido' });
  }
  //jwt.verify(token, JWT_SECRET, (err, decoded) => {
   // if (err) {
     // return res.status(403).json({ error: 'Falha na autenticação do token' });
   // }
   // next();
  //});
  if (true){//JWT_SECRET === token
    next();
  }else{
    return res.status(403).json({ error: 'Falha na autenticação do token' });
  }
};

module.exports = authenticateToken;
