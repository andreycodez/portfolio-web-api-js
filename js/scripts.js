// // Getting Random Users from API
// let dataFromAPI = [];
//
// const p1 = new Promise( (resolve, reject) => {
//     const usersCount = 4;
//     console.log('Started the API');
//     const listUsers = [];
//     for (let i = 0; i < usersCount; i++) {
//         const randomUser = fetch('https://random-data-api.com/api/users/random_user')
//         randomUser
//             .then((response) => response.json())
//             .then((data) => {
//                 //console.log(data)
//                 listUsers.push(data)
//             })
//             .catch((error) => console.log(error))
//     };
//     setTimeout(() => {
//         resolve(listUsers)
//     }, usersCount * 1000);
// }).then((data) => {
//     dataFromAPI = data;
//     generateUsersList(dataFromAPI);
//     const loader = document.getElementById('loaderLayer');
//     loader.classList.remove('isVisible-flex');
// });



// LOCAL DATA FOR TESTING
// Comment from here
let dataFromApi =
    [
        {"id":8268,"uid":"32c8ff48-551c-4928-9354-eb5c6edfecef","password":"ShEOc1HeX0","first_name":"Jed","last_name":"Waters","username":"jed.waters","email":"jed.waters@email.com","avatar":"https://robohash.org/atdolorumnecessitatibus.png?size=300x300\u0026set=set1","gender":"Non-binary","phone_number":"+48 100-463-9361 x782","social_insurance_number":"611541467","date_of_birth":"1993-03-13","employment":{"title":"IT Administrator","key_skill":"Problem solving"},"address":{"city":"Port Lelia","street_name":"Janyce Tunnel","street_address":"533 Sterling Knolls","zip_code":"88168","state":"Hawaii","country":"United States","coordinates":{"lat":26.04615575831174,"lng":-173.04637960676968}},"credit_card":{"cc_number":"4400969280310"},"subscription":{"plan":"Student","status":"Active","payment_method":"Cheque","term":"Monthly"}},
        {"id":1247,"uid":"f92896f1-1872-42d7-93e8-670c673fd4fe","password":"fmNg0Iy3H9","first_name":"Aurelio","last_name":"Will","username":"aurelio.will","email":"aurelio.will@email.com","avatar":"https://robohash.org/quisquamdelectusmolestiae.png?size=300x300\u0026set=set1","gender":"Bigender","phone_number":"+597 737-736-6374 x2162","social_insurance_number":"248136269","date_of_birth":"1966-05-01","employment":{"title":"Technology Coordinator","key_skill":"Organisation"},"address":{"city":"Berniermouth","street_name":"Schmeler Shoals","street_address":"571 Dewitt Plaza","zip_code":"39327","state":"Massachusetts","country":"United States","coordinates":{"lat":-69.86291354119149,"lng":115.60491004107632}},"credit_card":{"cc_number":"5174-4553-5781-2234"},"subscription":{"plan":"Gold","status":"Active","payment_method":"WeChat Pay","term":"Payment in advance"}},
        {"id":9838,"uid":"7bf94145-4895-4460-b8f7-db50ff0bd8ca","password":"xAkzf2NUMd","first_name":"Vincenzo","last_name":"Monahan","username":"vincenzo.monahan","email":"vincenzo.monahan@email.com","avatar":"https://robohash.org/eaquedoloraut.png?size=300x300\u0026set=set1","gender":"Genderfluid","phone_number":"+254 (763) 091-2029 x07051","social_insurance_number":"161538020","date_of_birth":"1979-07-23","employment":{"title":"Regional Technology Orchestrator","key_skill":"Organisation"},"address":{"city":"South Gwennland","street_name":"Demetrius Burg","street_address":"846 Mitchell Ridges","zip_code":"43207","state":"New Jersey","country":"United States","coordinates":{"lat":32.761654260975675,"lng":-3.3850895216118886}},"credit_card":{"cc_number":"4869263700027"},"subscription":{"plan":"Premium","status":"Idle","payment_method":"WeChat Pay","term":"Full subscription"}},
        {"id":7990,"uid":"1bbe972c-1c52-4676-8514-2705282f983b","password":"0VIKQiJ4ja","first_name":"Phil","last_name":"Reilly","username":"phil.reilly","email":"phil.reilly@email.com","avatar":"https://robohash.org/quiarerumet.png?size=300x300\u0026set=set1","gender":"Polygender","phone_number":"+34 521.099.7419 x467","social_insurance_number":"415494186","date_of_birth":"1972-06-06","employment":{"title":"Accounting Assistant","key_skill":"Proactive"},"address":{"city":"Greenville","street_name":"Abram Springs","street_address":"94515 Coleen Hollow","zip_code":"57727","state":"Iowa","country":"United States","coordinates":{"lat":-49.49121741683694,"lng":-127.1718308522436}},"credit_card":{"cc_number":"4461-1823-5109-5112"},"subscription":{"plan":"Diamond","status":"Active","payment_method":"WeChat Pay","term":"Payment in advance"}},
        {"id":1251,"uid":"0598ba13-6c95-4b05-8d37-3b48e53c4f6a","password":"6ec7Uko9iA","first_name":"Krystina","last_name":"Nitzsche","username":"krystina.nitzsche","email":"krystina.nitzsche@email.com","avatar":"https://robohash.org/etitaqueminima.png?size=300x300\u0026set=set1","gender":"Genderfluid","phone_number":"+264 964.358.7757 x18671","social_insurance_number":"360070916","date_of_birth":"1960-12-05","employment":{"title":"Human Design Producer","key_skill":"Communication"},"address":{"city":"Port Andrewhaven","street_name":"Travis Greens","street_address":"59717 Cathern Lights","zip_code":"89267-3447","state":"Iowa","country":"United States","coordinates":{"lat":71.53885165665918,"lng":-145.70967042489116}},"credit_card":{"cc_number":"6771-8974-4652-7916"},"subscription":{"plan":"Business","status":"Idle","payment_method":"Money transfer","term":"Annual"}},
        {"id":511,"uid":"93214e0b-2e43-484c-b79f-3491d5f43cd9","password":"Zf9TPiIeDl","first_name":"Lincoln","last_name":"Hettinger","username":"lincoln.hettinger","email":"lincoln.hettinger@email.com","avatar":"https://robohash.org/idexercitationemtenetur.png?size=300x300\u0026set=set1","gender":"Non-binary","phone_number":"+298 1-109-673-2084 x41849","social_insurance_number":"383330313","date_of_birth":"1994-09-09","employment":{"title":"Farming Associate","key_skill":"Teamwork"},"address":{"city":"South Raqueltown","street_name":"Kenneth Falls","street_address":"826 Tangela Square","zip_code":"17581-7187","state":"Maryland","country":"United States","coordinates":{"lat":-5.570243468491071,"lng":-167.4229346675423}},"credit_card":{"cc_number":"6771-8984-0485-6388"},"subscription":{"plan":"Platinum","status":"Blocked","payment_method":"Debit card","term":"Annual"}},
        {"id":2748,"uid":"672d285a-12bd-4fa4-8854-084b44310459","password":"BuYt0VSUTf","first_name":"Nell","last_name":"Wisoky","username":"nell.wisoky","email":"nell.wisoky@email.com","avatar":"https://robohash.org/reiciendisveritatistotam.png?size=300x300\u0026set=set1","gender":"Female","phone_number":"+1-869 299.746.6068 x03259","social_insurance_number":"721756443","date_of_birth":"1987-12-02","employment":{"title":"Direct Hospitality Designer","key_skill":"Work under pressure"},"address":{"city":"West Vivaburgh","street_name":"Jaskolski Islands","street_address":"2224 Francesca Village","zip_code":"68660","state":"Nebraska","country":"United States","coordinates":{"lat":-84.00965206176518,"lng":65.48040652542147}},"credit_card":{"cc_number":"4464628372777"},"subscription":{"plan":"Professional","status":"Blocked","payment_method":"Money transfer","term":"Annual"}},
        {"id":3232,"uid":"46cf845d-09d5-4201-8e45-06f9b05fc020","password":"1BmpiX7x9t","first_name":"Duane","last_name":"Mills","username":"duane.mills","email":"duane.mills@email.com","avatar":"https://robohash.org/omnisutenim.png?size=300x300\u0026set=set1","gender":"Male","phone_number":"+1-649 518-028-3542 x601","social_insurance_number":"353339583","date_of_birth":"1999-11-07","employment":{"title":"Legal Liaison","key_skill":"Networking skills"},"address":{"city":"Normanview","street_name":"Yukiko Meadow","street_address":"5096 Collins Plaza","zip_code":"19924","state":"Rhode Island","country":"United States","coordinates":{"lat":-65.94162904001846,"lng":-102.49603677430089}},"credit_card":{"cc_number":"4673-4836-6542-2479"},"subscription":{"plan":"Gold","status":"Blocked","payment_method":"Cheque","term":"Payment in advance"}},
        {"id":4558,"uid":"b6fd3046-c7f7-408b-917e-d57d8e6c1a69","password":"62QTL54kcX","first_name":"Hyun","last_name":"Kozey","username":"hyun.kozey","email":"hyun.kozey@email.com","avatar":"https://robohash.org/sintdeseruntbeatae.png?size=300x300\u0026set=set1","gender":"Non-binary","phone_number":"+676 422-936-3132 x1207","social_insurance_number":"133845412","date_of_birth":"1971-03-05","employment":{"title":"Marketing Representative","key_skill":"Confidence"},"address":{"city":"Douglashaven","street_name":"Ilene Ways","street_address":"905 Stoltenberg Point","zip_code":"17409","state":"Wyoming","country":"United States","coordinates":{"lat":-80.69045904943488,"lng":-107.54294425955568}},"credit_card":{"cc_number":"4112257093400"},"subscription":{"plan":"Basic","status":"Pending","payment_method":"Cash","term":"Annual"}},
        {"id":9652,"uid":"8cc51422-f5e4-438c-83da-8dcb6c84afd1","password":"bsVOdUwKFH","first_name":"Vance","last_name":"Franecki","username":"vance.franecki","email":"vance.franecki@email.com","avatar":"https://robohash.org/distinctiodolorumquos.png?size=300x300\u0026set=set1","gender":"Agender","phone_number":"+376 277-599-1890","social_insurance_number":"138896790","date_of_birth":"2002-08-22","employment":{"title":"Human Healthcare Director","key_skill":"Proactive"},"address":{"city":"East Norahport","street_name":"Josue Road","street_address":"487 Bechtelar Lake","zip_code":"06257","state":"Utah","country":"United States","coordinates":{"lat":41.47282654436964,"lng":26.05012594127703}},"credit_card":{"cc_number":"4823428002449"},"subscription":{"plan":"Diamond","status":"Blocked","payment_method":"Cheque","term":"Full subscription"}}
    ];
generateUsersList(dataFromApi);
setInterval(() => {
    const loader = document.getElementById('loaderLayer')
    loader.classList.remove('isVisible-flex')
}, 2000);

// Comment to here


function generateUsersList(data) {
    const parentHolder = document.getElementById('userListId');
    for (const man of data) {
        const nameHolder = document.createElement('p');
        nameHolder.innerHTML = man.first_name + ' ' + man.last_name;
        const imgHolder = document.createElement('img');
        imgHolder.setAttribute('src',man.avatar)
        const holder = document.createElement('div');
        holder.setAttribute('class', 'user');
        const genderHolder = document.createElement('p');
        genderHolder.innerHTML = 'Gender: ' + man.gender
        holder.appendChild(imgHolder);
        holder.appendChild(nameHolder);
        holder.appendChild(genderHolder);
        parentHolder.appendChild(holder);
    }
}