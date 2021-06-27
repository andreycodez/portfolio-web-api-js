let someObject = {};

someObject['students'] = {
    'One': {
        'id': 1,
        'Name': 'Andrey',
        'Major': 'Maths'
    },
    'Two': {
        'id': 2,
        'Name': 'John',
        'Major': 'Maths'
    },
    'Three': {
        'id': 2,
        'Name': 'John',
        'Major': 'Geography'
    },
    'Four': {
        'id': 2,
        'Name': 'John',
        'Major': 'Maths'
    },
    'Five': {
        'id': 2,
        'Name': 'John',
        'Major': 'Geography'
    },
    'Six': {
        'id': 2,
        'Name': 'John',
        'Major': 'Drawing'
    }
};

//const someObjectToArray = someObject.json();
console.log(typeof someObject);
console.log(someObject);

someObject.getGenders = function(major) {
    let count = 0;
    for (const item of Object.values(this.students)) {
        if (item.Major === major) {
            count ++;
        }
    }
    return count
}

console.log(someObject.getGenders('Maths'));

function getGenders(obj) {
    for (const item of Object.values(obj.students)) {
        if (!someObject.hasOwnProperty('genders')){
            someObject['genders'] = {}
        } else {
            if (!someObject.genders.hasOwnProperty(item.Major)) {
                someObject.genders[item.Major] = 1;
            } else {
                someObject.genders[item.Major] ++;
            }
        }
    }
}


// for (const student of Object.entries(someObject['students'])) {
//     console.log(student);
// }

getGenders(someObject);
//console.log(someObject);

//console.log(Object.keys(someObject.students));
