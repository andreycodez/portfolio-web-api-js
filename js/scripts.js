const dataFilter = '[data-filter]';
const dataSort = '[data-sort]'
const dataUser = '[data-user]';
let filterLinks = [];
let sortLinks = [];

if (dataSource === 'local') {
    generateContent(dataLocal);
    setInterval(() => {
        const loader = document.getElementById('loaderLayer')
        //loader.classList.remove('isVisible-flex')
        loader.style.setProperty('visibility', 'hidden')
        loader.style.setProperty('opacity', '0')
    }, 2000);
}

function generateContent(obj) {
    generateUsersList(obj);
    setPlans(obj)
    generateFilterList(obj);
    setViewOptions();
    disableLoader();
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
        image.setAttribute('src', robo.avatar);
        const holder = document.createElement('div');
        holder.setAttribute('class', 'user');
        holder.setAttribute('data-user', robo.id);
        holder.setAttribute('data-item', robo.subscription.plan);
        holder.setAttribute('data-name', robo.first_name);
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

function generateFilterList(obj) {
    const filterItemsList = document.getElementById('filter');
    const filterItemsObject = obj.plans;
    const filterItemsArr = Object.entries(filterItemsObject);
    const allFilterItem = document.createElement('li');
    allFilterItem.setAttribute('class', 'filter-item active');
    allFilterItem.setAttribute('data-filter', 'all');
    allFilterItem.innerHTML = `All  <span>${Object.keys(obj.robos).length}</span>`;
    filterItemsList.appendChild(allFilterItem);
    for (let item of filterItemsArr) {
        const filterItem = document.createElement('li');
        filterItem.setAttribute('class', 'filter-item');
        filterItem.setAttribute('data-filter', item[0]);
        filterItem.innerHTML = `${item[0]}  <span>${item[1]}</span>`;
        filterItemsList.appendChild(filterItem);
    }
}

function setViewOptions() {
    sortLinks = document.querySelectorAll(dataSort);
    for (const item of sortLinks) {
        item.addEventListener('click', function() {
            sortLinks.forEach( link => link.classList.remove('active'));
            if (!item.classList.contains('active')) {
                item.classList.add('active');
                sortItems('userListId', item.dataset.sort);
            }
        })
    }
    filterLinks = document.querySelectorAll(dataFilter);
    for (const item of filterLinks) {
        item.addEventListener('click', function() {
            filterLinks.forEach( link => link.classList.remove('active'));
            if (!item.classList.contains('active')) {
                item.classList.add('active');
                filterItems(item.dataset.filter);
            }
        })
    }
}

function sortItems(entity, way){
    const parentHolder = document.getElementById(entity);
    let arrItems = [];
    parentHolder.childNodes.forEach( item => (item.nodeType === 1) ? arrItems.push(item) : 0);

    if (way === 'asc') {
        arrItems.sort(function (a, b) {
            return a.dataset.name === b.dataset.name ? 0 : (a.dataset.name > b.dataset.name ? 1 : -1)
        });
    } else {
        arrItems.sort(function (a, b) {
            return a.dataset.name === b.dataset.name ? 0 : (a.dataset.name < b.dataset.name ? 1 : -1)
        });
    }
    parentHolder.childNodes.forEach( item => item.remove());
    arrItems.forEach( item => parentHolder.appendChild(item));
}

function filterItems(filter) {
    const robos = document.querySelectorAll(dataUser);
    if (filter === 'all') {
        robos.forEach( item => item.style.display = 'block')
    } else {
        for (const robo of robos) {
            if (robo.dataset.item !== filter) {
                robo.style.display = 'none'
            } else {
                robo.style.display = 'block'
            }
        }
    }
}

function updateClass(type, element, className) {
    if (type === 'add') {
        element.classList.add(className);
    } else if (type === 'remove') {
        element.classList.remove(className);
    }
}

function disableLoader() {
    const loader = document.getElementById('loaderLayer');
    loader.style.setProperty('visibility', 'hidden')
    loader.style.setProperty('opacity', '0')
}

const header = document.getElementById('header');
const color1 = getRandomColor();
const color2 = getRandomColor();
header.style.setProperty('background', 'linear-gradient(45deg, ' + color1 + ' 0%, ' + color2 + ' 100%)');
setTimeout(() => {
    header.style.setProperty('opacity','0');
},1200);

setInterval(() => {
    const header = document.getElementById('header');
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    setTimeout(() => {
        header.style.setProperty('opacity','0');
    },1200);
    header.style.setProperty('background', 'linear-gradient(45deg, ' + color1 + ' 0%, ' + color2 + ' 100%)');
    header.style.setProperty('opacity','1');
}, 2000);

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setPlans(obj) {
    const arr = Object.entries(obj.robos);
    for (let i = 0; i < arr.length; i++) {
        let tempArr = arr[i];
        if (!obj.hasOwnProperty('plans')) { obj.plans = {}}
        if (!obj.plans.hasOwnProperty(tempArr[1].subscription.plan)) {
            obj.plans[tempArr[1].subscription.plan] = 1;
        } else {
            obj.plans[tempArr[1].subscription.plan]++;
        }
    }
}