/**
 * deleteCalendarApi - Makes a DELETE request to remove an existing calendar.
 * 
 * @param {string} token - The authentication token of the user.
 * @param {string} calendarName - The name of the calendar to be deleted.
 * @returns {Promise<string>} Resolves with a success message if calendar deletion is successful.
 *          Does not return updated calendar data. Rejects with an error if the request fails.
 */

const deleteCalendarApi = (token, calendarName) => {
    return new Promise((resolve, reject) => {
        const endpoint = './api/calendar/delete';

        console.log(token);

        fetch(endpoint, {
            method: 'DELETE',
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
                throw new Error('Calendar Deletion failed');
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

export default deleteCalendarApi;