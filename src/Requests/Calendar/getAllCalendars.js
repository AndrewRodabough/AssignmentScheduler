export const getAllCalendar = (token) => {
    return new Promise((resolve, reject) => {
        const endpoint = './api/calendar/getAll';

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
                throw new Error('Calendar get failed');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            resolve(data);
        })
        .catch(error => {
            reject(error);
        });
    });
};