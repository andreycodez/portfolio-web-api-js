// Getting Random Users from API
let dataFromApi = { robos: {} };
const usersCount = 30;
let arrPromise = [];

for (let i = 0; i < usersCount; i++) {
    arrPromise[i] = fetch('https://random-data-api.com/api/users/random_user');
}


Promise
    .all(arrPromise)
    .then((response) => {
        return Promise.all(response.map((promiseItem => promiseItem.json())))
    })
    .then((data) => {
        console.log(data)
        data.map((item) => {
            dataFromApi.robos[item.id] = item;
        })
        generateUsersList(dataFromApi);
        const loader = document.getElementById('loaderLayer');
        loader.style.setProperty('visibility', 'hidden')
        loader.style.setProperty('opacity', '0')
    })

