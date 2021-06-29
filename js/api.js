let dataFromApi = { robos: {}, plans:{} };
const usersCount = 7;
let arrPromise = [];

for (let i = 0; i < usersCount; i++) {
    arrPromise[i] = fetch('https://random-data-api.com/api/users/random_user');
}

Promise
    .all(arrPromise)
    .then((response) => {
        return Promise.all(response.map((item => item.json())))
    })
    .then((data) => {
        data.map((item) => {
            dataFromApi.robos[item.id] = item;
            dataFromApi.robos[item.id].status = 'active';
        })
        dataFromApi.setPlans();
        generateUsersList(dataFromApi);

    })

