/**
 * clearApi - Makes a DELETE request to clear/reset server-side data.
 * 
 * @returns {Promise<void>} Resolves if the clear operation is successful.
 *          Rejects with an error if the request fails.
 */

const clearApi = () => {
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

export default clearApi;