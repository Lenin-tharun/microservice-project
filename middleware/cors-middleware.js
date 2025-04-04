

const allowedOrigins = [
    'http://localhost:3100',
    'https://simworkspace.banyanpro.com',
    'http://192.168.31.96:8000',
  ];
  
  const corsMiddleware = (req, res, next) => {
    const origin = req.headers.origin;
  
    if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Credentials', 'true'); // ✅ Allow credentials
    }
  
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204)
    }
  
    next();
  };
  
  export default corsMiddleware;
  