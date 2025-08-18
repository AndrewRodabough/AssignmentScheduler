/**
 * getAllCalendarApi - Makes a GET request to retrieve all calendars associated with the user.
 * 
 * @param {string} token - The authentication token of the user.
 * @returns {Promise<Array>} Resolves with an array of calendars if successful.
 *          Rejects with an error if the request fails.
 */

const getAllCalendarApi = (token) => {
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

export default getAllCalendarApi;