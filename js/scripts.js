const dataFilter = '[data-filter]';
const dataSort = '[data-sort]'
const dataUser = '[data-user]';
let filterLinks = [];
let sortLinks = [];
let tempFavourites = {};
let settings = { filter: {}, sorting: {} };

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
    addModalEvents(obj);
    setPlans(obj)
    generateFilterList(obj);
    setViewOptions();
    disableLoader();
    //generateFav(obj.robos, 974);
    //generateFav(obj.robos, 2283);
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

        const favItem = document.createElement('a');
        favItem.setAttribute('class', 'fav-button');
        favItem.innerHTML = 'add to favorites';
        favItem.setAttribute('data-favorite', '');

        imageHolder.appendChild(image);
        userInfoHolder.appendChild(nameHolder);
        userInfoHolder.appendChild(genderHolder);
        userInfoHolder.appendChild(dateOfBirth);
        userInfoHolder.appendChild(subsPlan);
        holder.appendChild(userInfoHolder);
        holder.appendChild(favItem);
        parentHolder.appendChild(holder);
    }
    setAddToFavoritesEventOnUser(obj)
}

function addModalEvents(obj){
    const eventAreas = document.querySelectorAll(dataUser);
    eventAreas.forEach( item => {
        const imageHolder = item.querySelector('div.image-holder')
        imageHolder.addEventListener('click', () => {
            //console.log(item.dataset.user);
            generateModal(obj, item.dataset.user);
            const modal = document.getElementById('modal');
            modal.classList.remove('is-hidden');
            modal.classList.add('is-visible');
        })
    })
}

function generateModal(obj, id) {
    const robo = obj.robos[id];
    const description = Object.entries(robo).map((item) => {
        if (item[0] === 'email') {
            return `<strong>${item[0]}:</strong> <a href="mailto:${item[1]}">${item[1]}</a><br/>`
        } else if (item[0] === 'id'
            || item[0] === 'uid'
            || item[0] === 'firs_name'
            || item[0] === 'last_name'
            || item[0] === 'user_name'
            || item[0] === 'gender'
            || item[0] === 'date_of_birth'
            ){
            return `<strong>${item[0]}:</strong> ${item[1]}<br/>`
        } else {
            return ''
        }
    })
    const controlPoint = document.querySelector('.content-wrapper');
    const newNode = document.createElement('div');
    controlPoint.after(newNode);
    newNode.setAttribute('id', `modal`);
    newNode.setAttribute('class', 'modal is-hidden');

    const modalBox = document.createElement('div');
    modalBox.setAttribute('class', 'modal-box');
    newNode.appendChild(modalBox);

    const modalHeader = document.createElement('div');
    modalHeader.setAttribute('class', 'modal-header');
    const header = document.createElement('h2');
    header.innerHTML = robo.first_name + ' ' + robo.last_name;
    modalHeader.appendChild(header);
    const modalCloseIcon = document.createElement('div');
    modalCloseIcon.setAttribute('class', 'modal-close');

    const closeIcon = document.createElement('i');
    closeIcon.setAttribute('class', 'fa fa-times');
    modalCloseIcon.appendChild(closeIcon);
    modalHeader.appendChild(modalCloseIcon);
    modalBox.appendChild(modalHeader);

    const modalBody = document.createElement('div');
    modalBody.setAttribute('class', 'modal-body');
    const modalImage = document.createElement('div');
    modalImage.setAttribute('class', 'modal-image');
    const imageHolder = document.createElement('img');
    imageHolder.setAttribute('src', robo.avatar);
    imageHolder.style.background = getRandomColor();
    modalImage.appendChild(imageHolder);
    const modalDescription = document.createElement('div');
    modalDescription.setAttribute('class', 'modal-description');
    modalDescription.innerHTML = description.join('');
    modalBody.appendChild(modalImage);
    modalBody.appendChild(modalDescription);
    modalBox.appendChild(modalBody);

    modalCloseIcon.addEventListener('click', () => {
        const getAModal = document.querySelector('.modal.is-visible');
        getAModal.classList.remove('is-visible');
        getAModal.classList.add('is-hidden');
        getAModal.remove();
    })

    const modalFooter = document.createElement('div');
    modalFooter.setAttribute('class','modal-footer');
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
    settings.sorting.userlist = way;
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
    settings.filter.userfilter = filter;
    if (filter === 'all') {
        robos.forEach( item => item.style.display = 'flex')
    } else {
        for (const robo of robos) {
            if (robo.dataset.item !== filter) {
                robo.style.display = 'none'
            } else {
                robo.style.display = 'flex'
            }
        }
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

function favsDeleteEventSet() {
    const deleteItems = document.querySelectorAll('[data-delete]');
    for (const item of deleteItems) {
        item.addEventListener('click', () => {
            item.parentElement.remove();
            addNodeToList(item.parentElement.getAttribute('id'));
            //TODO: Get the no more favorites state below

            if (document.getElementsByClassName('fav-item') === null) {
                console.log('No more Items in Favorites');
            }
        })
    }
}

function generateFav(obj, id) {
    const robo = obj.robos[id];
    console.log(obj)
    const parentItem = document.getElementById('favList');
    const favItem = document.createElement('div');
    favItem.setAttribute('class', 'fav-item');
    favItem.setAttribute('id', id);
    const delItem = document.createElement('div');
    delItem.setAttribute('class','delete-item');
    delItem.setAttribute('data-delete', '');
    const delIcon = document.createElement('i');
    delIcon.setAttribute('class','fa fa-times');
    delItem.appendChild(delIcon);
    favItem.appendChild(delItem);
    const imageWrapper = document.createElement('div');
    imageWrapper.setAttribute('class','image-wrapper');
    const imageItem = document.createElement('img');
    imageItem.setAttribute('src', robo.avatar);
    imageWrapper.appendChild(imageItem);
    favItem.appendChild(imageWrapper);
    const descriptionWrapper = document.createElement('div');
    descriptionWrapper.setAttribute('class', 'fav-description');
    const favName = document.createElement('div');
    favName.setAttribute('class', 'fav-name');
    favName.innerHTML = robo.first_name + ' ' + robo.last_name;
    const favPlan = document.createElement('div');
    favPlan.setAttribute('class', 'fav-plan');
    favPlan.innerHTML = robo.subscription.plan;
    descriptionWrapper.appendChild(favName);
    descriptionWrapper.appendChild(favPlan);
    favItem.appendChild(descriptionWrapper);
    parentItem.appendChild(favItem);
    favsDeleteEventSet();
    deleteNodeFromList(id);
}

function deleteNodeFromList(nodeId) {
    const nodeList = document.getElementById('userListId');
    for (const item of nodeList.childNodes) {
        if (+item.dataset.user === nodeId) {
            tempFavourites[nodeId] = item;
            nodeList.removeChild(item);
        }
    }
}

function addNodeToList(nodeId) {
    const nodeList = document.getElementById('userListId');
    for (let item of Object.entries(tempFavourites)) {
        if (item[0] === nodeId) {
            nodeList.appendChild(item[1]);
            if (settings.filter['userfilter']) { filterItems(settings.filter['userfilter']); }
            if (settings.sorting.userlist) { sortItems('userListId', settings.sorting.userlist); }
        }
    }
}

function setAddToFavoritesEventOnUser(obj) {
    const favButtons = document.querySelectorAll('[data-favorite]');
    for (const item of favButtons) {
        item.addEventListener('click', () => {
            generateFav(obj, +item.parentElement.dataset.user);
        })
    }
}

// function showFavsPanel() {
//     const favsExist =
// }