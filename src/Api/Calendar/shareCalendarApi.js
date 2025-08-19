/**
 * shareCalendarApi - Makes a PUT request to share a calendar with another user.
 * 
 * @param {string} token - The authentication token of the user.
 * @param {string} shareUser - The username or identifier of the user to share the calendar with.
 * @param {string} shareCalendar - The name or identifier of the calendar to share.
 * @returns {Promise<void>} Resolves if the calendar is successfully shared.
 *          Rejects with an error if the request fails.
 */

const shareCalendarApi = (token, shareUser, shareCalendar) => {
    return new Promise((resolve, reject) => {
        const endpoint = './api/calendar/share';

        console.log(token);

        fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                shareUser: shareUser,
                shareCalendar: shareCalendar
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Calendar Share Fail');
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

export default shareCalendarApi;