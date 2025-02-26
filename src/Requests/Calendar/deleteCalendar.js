export const deleteCalendar = (token, calendarName) => {
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