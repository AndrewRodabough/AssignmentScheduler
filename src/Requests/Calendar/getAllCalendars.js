export const createUser = (token) => {
    return new Promise((resolve, reject) => {
        const endpoint = 'http://localhost:4000/api/calendar/getAll';

        fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Calendar Creation failed');
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