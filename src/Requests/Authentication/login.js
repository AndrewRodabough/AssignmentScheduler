export const login = (username, password) => {
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
            return response.json();
        })
        .then(data => {
            const { token } = data
            resolve(token);
        })
        .catch(error => {
            reject(error);
        });
    });
};