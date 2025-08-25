/**
 * updateEventApi - Makes a PUT request to update an existing event.
 *
 * @param {string} token - The authentication token of the user.
 * @param {string} eventUID - The ID of the event to update.
 * @param {Object} updates - The data to update in the event.
 * @returns {Promise<Object>} Resolves with the updated event object if successful.
 *          Rejects with an error if the request fails.
 */

const updateEventApi = (token, eventUID, updates) => {
    return new Promise((resolve, reject) => {
        const endpoint = './api/event/update';
        fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ 
                eventUID: eventUID, 
                updates: updates
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Event Update Failed');
            }
            resolve(response.json());
        })
        .catch(error => {
            reject(error);
        });
    });
};

export default updateEventApi;