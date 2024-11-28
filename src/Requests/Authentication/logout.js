export const logout = (token) => {
    return new Promise((resolve, reject) => {
        const endpoint = 'http://localhost:4000/api/auth/logout';

        fetch(endpoint, {
            method: 'DELETE',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {

            console.log(response)

            if (!response.ok) {
                throw new Error('Logout failed');
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