const dataSource = "Api";

if (dataSource === 'local') {
    generateUsersList(dataLocal);
    setInterval(() => {
        const loader = document.getElementById('loaderLayer')
        //loader.classList.remove('isVisible-flex')
        loader.style.setProperty('visibility', 'hidden')
        loader.style.setProperty('opacity', '0')
    }, 2000);
}

function generateUsersList(obj) {
    const parentHolder = document.getElementById('userListId');
    for (const robo of Object.values(obj.robos)) {
        const nameHolder = document.createElement('p');
        nameHolder.setAttribute('class', 'name');
        nameHolder.setAttribute('style', 'text-align: center;');
        nameHolder.innerHTML = robo.first_name + ' ' + robo.last_name;
        const imageHolder = document.createElement('div');
        imageHolder.setAttribute('class', 'image-holder')
        imageHolder.style.setProperty('background', getRandomColor())
        const image = document.createElement('img');
        image.setAttribute('src',robo.avatar);
        const holder = document.createElement('div');
        holder.setAttribute('class', 'user');
        holder.setAttribute('data-user', robo.uid)
        const userInfoHolder = document.createElement('div');
        userInfoHolder.setAttribute('class', 'user-info');
        const genderHolder = document.createElement('p');
        genderHolder.innerHTML = '\<strong\>Gender\</strong\>: ' + robo.gender;
        const dateOfBirth = document.createElement('p');
        dateOfBirth.innerHTML = '\<strong\>DoB:\</strong\> ' + robo.date_of_birth;
        const subsPlan = document.createElement('p');
        subsPlan.innerHTML = '\<strong\>Plan:\</strong\> ' + robo.subscription.plan;
        holder.appendChild(imageHolder);
        imageHolder.appendChild(image);
        userInfoHolder.appendChild(nameHolder);
        userInfoHolder.appendChild(genderHolder);
        userInfoHolder.appendChild(dateOfBirth);
        userInfoHolder.appendChild(subsPlan);
        holder.appendChild(userInfoHolder);
        parentHolder.appendChild(holder);
    }
}

const header = document.getElementById('header');
const color1 = getRandomColor();
const color2 = getRandomColor();
header.style.setProperty('background', 'linear-gradient(45deg, ' + color1 + ' 0%, ' + color2 + ' 100%)');
setTimeout(() => {
    header.style.setProperty('opacity','0');
},5200);

setInterval(() => {
    const header = document.getElementById('header');
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    setTimeout(() => {
        header.style.setProperty('opacity','0');
    },5200);
    header.style.setProperty('background', 'linear-gradient(45deg, ' + color1 + ' 0%, ' + color2 + ' 100%)');
    header.style.setProperty('opacity','1');
}, 6000);

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}