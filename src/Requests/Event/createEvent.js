export const createEvent = (token, event) => {
    return new Promise((resolve, reject) => {
        const endpoint = 'http://localhost:4000/api/event/create';

        console.log(token, event);

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                event: event
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Event Creation failed');
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