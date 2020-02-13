let counter = 1;
let counter2 = 10;

// simulate a little bit of latency
const latency = () => new Promise(resolve => setTimeout(resolve, Math.random() * 100));

/**
 * This function is intended to simulate an asynchrone api call like fetch, axios...
 *
 * @param {string} url
 * @param {string} method
 * @param {any} data
 */
export async function api(url, method = 'GET', data = {}) {
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
    } else if (url === '/counter2') {
        if (method === 'GET') {
            console.log('Call GET /counter2');
            await latency();
            return counter2;
        } else if (method === 'POST') {
            console.log('Call POST /counter2', data);
            await latency();
            counter2 = data.value;
            return counter2 || 10;
        }
    } else {
        throw new Error('Unknown route api');
    }
}