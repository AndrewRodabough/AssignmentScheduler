const checkExistingUser = (users) => {
    return (req, res, next) => {
      const { username } = req.body;
      
      if (users[username]) {
        return res.status(409).json({
          error: 'Username already exists'
        });
      }
      
      // User doesn't exist, proceed to next middleware/route handler
      next();
    };
};