// Getting Random Users from API

const usersCount = 30
let dataFromAPI = []
let didUsersLoad = false
let isTimer = false

const p1 = new Promise( (resolve, reject) => {
    console.log('Started the API')
    const listUsers = []
    for (let i = 0; i < 30; i++) {
        const randomUser = fetch('https://random-data-api.com/api/users/random_user')
        randomUser
            .then((response) => response.json())
            .then((data) => {
                //console.log(data)
                listUsers.push(data)
            })
            .catch((error) => console.log(error))
    }
    setTimeout(() => {
        resolve(listUsers)
    }, 10000)
}).then((data) => {
    dataFromAPI = data
    generateUsersList(dataFromAPI)

})

function generateUsersList(data) {
    const parentHolder = document.getElementById('userListId');
    for (const man of data) {
        const nameHolder = document.createElement('p');
        nameHolder.innerHTML = man.first_name;
        const holder = document.createElement('div');
        holder.setAttribute('class', 'user');
        holder.appendChild(nameHolder);
        parentHolder.appendChild(holder);
    }

}