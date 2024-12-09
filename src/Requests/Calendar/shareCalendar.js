export const shareCalendar = (token, shareUser, shareCalendar) => {
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