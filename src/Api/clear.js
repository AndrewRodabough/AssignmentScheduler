export const clear = () => {
    return new Promise((resolve, reject) => {
        const endpoint = './api/clear';

        fetch(endpoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Clear failed');
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