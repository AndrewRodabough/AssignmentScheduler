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
                throw new Error('Login failed');
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