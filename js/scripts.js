// Start API queue

const usersCount = 30;
const listUsers = [];
let didUsersLoad = false
let isTimer = false;

listUsers.push('John')

const getUser = (number) => {
    for (let i = 0; i < number; i++) {
        const randomUser = fetch('https://random-data-api.com/api/users/random_user');
        randomUser
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                listUsers.push(data)
            })
            .catch((error) => console.log(error));
    }
}

console.log(listUsers)

function generateUsersList(data) {
    const parentHolder = document.getElementById('userListId');
    console.log(parentHolder);
    for (const man of data) {
        const nameHolder = document.createElement('p');
        nameHolder.innerHTML = man;
        const holder = document.createElement('div');
        holder.setAttribute('class', 'user');
        holder.appendChild(nameHolder);
        parentHolder.appendChild(holder);
    }

}

getUser(usersCount);

generateUsersList(listUsers);


