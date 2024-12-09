export const createCalendar = (token, calendarName) => {
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