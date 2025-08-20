/**
 * updateCalendarApi - Makes a PUT request to update an existing calendar.
 *
 * @param {string} token - The authentication token of the user.
 * @param {string} calendarName - The name of the calendar to update.
 * @param {Object} updateData - The data to update in the calendar.
 * @returns {Promise<Object>} Resolves with the updated calendar object if successful.
 *          Rejects with an error if the request fails.
 */

const updateCalendarApi = (token, calendarName, updateData) => {
    return new Promise((resolve, reject) => {
        const endpoint = './api/calendar/update';
        fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ calendarName, ...updateData })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Calendar Update failed');
            }
            return response.json();
        })
        .then(data => {
            resolve(data.calendar ? data.calendar : data);
        })
        .catch(error => {
            reject(error);
        });
    });
};

export default updateCalendarApi;
