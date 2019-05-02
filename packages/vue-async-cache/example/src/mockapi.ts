let counter = 1;

// simulate a little bit of latency
const latency = () => new Promise((resolve) => setTimeout(resolve, Math.random() * 100));

/**
 * This function is intended to simulate an asynchrone api call like fetch, axios...
 *
 * @param {string} url
 * @param {string} method
 * @param {any} data
 */
export async function api(url: string, method = 'GET', data: any = {}) {
    if (url === '/counter') {
        if (method === 'GET') {
            console.log('Call GET /counter');
            await latency();
            return counter;
        } else if (method === 'POST') {
            console.log('Call POST /counter', data);
            await latency();
            counter = data.value;
            return counter || 1;
        }
    } else {
        throw new Error('Unknown route api');
    }
}
