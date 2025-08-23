/**
 * login - Makes a POST request to authenticate a user.
 * 
 * @param {string} username - The username of the user trying to log in.
 * @param {string} password - The password for the user.
 * @returns {Promise<string>} Resolves with a token string if authentication succeeds.
 *          Rejects with an error message if credentials are invalid (401) 
 *          or if any other error occurs during the request.
 */

const loginApi = (username, password) => {
    return new Promise((resolve, reject) => {
        const endpoint = './api/auth/login';

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
                response.status === 401 ? reject("invalid username or password") : reject("an error occurred");
            }
            resolve(response.json());
        })
        .catch(error => {
            reject(error);
        });
    });
};

export default loginApi;