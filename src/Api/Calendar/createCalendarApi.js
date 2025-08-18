/**
 * createCalendarApi - Makes a POST request to create a new calendar.
 * 
 * @param {string} token - The authentication token of the user.
 * @param {string} calendarName - The name of the calendar to be created.
 * @returns {Promise<void>} Resolves if calendar creation is successful.
 *          Rejects with an error if the request fails.
 */

const createCalendarApi = (token, calendarName) => {
    return new Promise((resolve, reject) => {
        const endpoint = './api/calendar/create';

        console.log(token);

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                calendarName: calendarName
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Calendar Creation failed');
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

export default createCalendarApi;