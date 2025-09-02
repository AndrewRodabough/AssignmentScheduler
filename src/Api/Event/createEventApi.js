/**
 * createEventApi - Makes a POST request to create a new event.
 * 
 * @param {string} token - The authentication token of the user.
 * @param {string} groupUID - The uid of the group to which the event will be added.
 * @param {Object} event - The event data object to be created.
 * @returns {Promise<void>} Resolves if event creation is successful.
 *          Rejects with an error if the request fails.
 */

const createEventApi = (token, event) => {
    return new Promise((resolve, reject) => {
        const endpoint = './api/event/create';

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                event
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Event Creation Failed');
            }
            resolve(response.json());
        })
        .catch(error => {
            reject(error);
        });
    });
};

export default createEventApi;