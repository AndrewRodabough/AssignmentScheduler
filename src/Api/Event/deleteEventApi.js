/**
 * deleteEventApi - Makes a DELETE request to remove an event.
 *
 * @param {string} token - The authentication token of the user.
 * @param {string} eventId - The ID of the event to be deleted.
 * @returns {Promise<void>} Resolves if event deletion is successful.
 *          Rejects with an error if the request fails.
 */

const deleteEventApi = (token, eventId) => {
    return new Promise((resolve, reject) => {
        const endpoint = './api/event/delete';
        fetch(endpoint, {
            method: 'DELETE',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ eventId })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Event Deletion failed');
            }
            return null;
        })
        .then(() => {
            resolve();
        })
        .catch(error => {
            reject(error);
        });
    });
};

export default deleteEventApi;
