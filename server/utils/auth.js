const jwt = require('jsonwebtoken');

// Set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // Function for our authenticated routes
  authMiddleware: function (req, res, next) {
    let token = req.query.token || req.headers.authorization;

    // Check if token is present in Authorization header and format it properly
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // If no token is provided, respond with an Unauthorized status
    if (!token) {
      return res.status(401).json({ message: 'You must be logged in to access this route!' });
    }

    try {
      // Verify token and extract user data
      const { data } = jwt.verify(token, secret);
      req.user = data; // Attach user data to req.user
    } catch (err) {
      console.log('Invalid token', err);
      return res.status(401).json({ message: 'Invalid or expired token!' });
    }

    // Proceed to the next middleware/route handler
    next();
  },

  // Sign a new token with the user data
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

// const jwt = require('jsonwebtoken');

// // set token secret and expiration date
// const secret = 'mysecretsshhhhh';
// const expiration = '2h';

// module.exports = {
//   // function for our authenticated routes
//   authMiddleware: function (req, res, next) {
//     // allows token to be sent via  req.query or headers
//     let token = req.query.token || req.headers.authorization;

//     // ["Bearer", "<tokenvalue>"]
//     if (req.headers.authorization) {
//       token = token.split(' ').pop().trim();
//     }

//     if (!token) {
//       return res.status(400).json({ message: 'You have no token!' });
//     }

//     // verify token and get user data out of it
//     try {
//       const { data } = jwt.verify(token, secret, { maxAge: expiration });
//       req.user = data;
//     } catch {
//       console.log('Invalid token');
//       return res.status(400).json({ message: 'Invalid token!' });
//     }

//     // send to next endpoint
//     next();
//   },
//   signToken: function ({ username, email, _id }) {
//     const payload = { username, email, _id };

//     return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
//   },
// };
