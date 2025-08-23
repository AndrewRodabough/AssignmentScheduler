const getAllEventsApi = (token) => {
    return new Promise((resolve, reject) => {
        const endpoint = './api/event/getAll';

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
                throw new Error('Events Get Failed');
            }
            resolve(response.json());
        })
        .catch(error => {
            reject(error);
        });
    });
};

export default getAllEventsApi;