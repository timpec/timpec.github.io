// Https GET request to a random person api for random names
const method = 'GET';
const url = 'https://randomuser.me/api/?results=20';

export const getRandomName = () => {
    return fetch(url, {
        method: method,
        mode: 'cors',
    })
    .then((response) => response.json())
    .then((data) => {
        return data
    })
    .catch(err => console.error(err))
}