export const createUser = (username, password) => {
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
            return null
        })
        .then(data => {
            resolve();
        })
        .catch(error => {
            reject(error);
        });
    });
};