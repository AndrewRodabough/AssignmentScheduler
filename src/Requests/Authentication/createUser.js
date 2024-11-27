export const createUser = (username, password) => {
    return new Promise((resolve, reject) => {
        const endpoint = 'http://localhost:4000/api/auth/create';

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
                throw new Error('User Creation failed');
            }
            return response.json();
        })
        .then(data => {
            resolve();
        })
        .catch(error => {
            reject(error);
        });
    });
};