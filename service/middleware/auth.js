import { UserService } from '../services/userService.js';

const checkExistingUser = (dataStore) => {

    const userService = new UserService(dataStore);

    return async (req, res, next) => {
        const { username } = req.body;
        
        if (userService.getUser(username)) {
            return res.status(409).json({
            error: 'Username already exists'
            });
        }
        
        // User doesn't exist, proceed to next middleware handler
        next();
    };
};

const checkTokenExists = (dataStore) => {

    const userService = new UserService(dataStore);

    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (userService.getToken()) {
            return res.status(401).json({
                error: 'invalid token'
                });
        }

        // Token exists, proceed to next middleware handler
        next();
    }
}