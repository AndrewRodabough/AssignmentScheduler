/**
 * createUserApi - Makes a POST request to create a new user account.
 * 
 * @param {string} username - The username for the new user.
 * @param {string} password - The password for the new user.
 * @returns {Promise<void>} Resolves if user creation is successful.
 *          Rejects with an error message if the username already exists
 *          or if any other error occurs during the request.
 */

const createUserApi = (username, password) => {
    return new Promise((resolve, reject) => {
        const endpoint = '/api/auth/create';

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => {
            if (!response.ok) {
                (response.status === 409) ? reject("username already exists") : reject("an error occurred");
            }
            resolve(response.json());
        })
        .catch(error => {
            reject(error);
        });
    });
};

export default createUserApi;