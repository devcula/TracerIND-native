const axios = require('axios');
const fs = require('fs');

var jwtToken = null;

// const URI = 'https://api-tracerind.covidindiataskforce.org/api/';

const URI = 'http://localhost:8000/api/';

const mandals = [ 
    {
        id: '01',
        name: 'Chintoor',
    },
    {
        id: '02',
        name: 'Yetapaka',
    },
    {
        id: '03',
        name: 'Kunnavaram',
    },
    {
        id: '04',
        name: 'V.R Puram',
    }
]

const creds = {
    username: 'dev',
    password: 'DELHi@34'
}

var allData = mandals;

function login() {
    axios.post(URI + 'token_jwt_get/', creds).then(response => {
        if(response.status === 200) {
            return response.data;
        }
    }).then(data => {
        jwtToken = data.token;
        console.log(`Logged in to server`);
        fetchData();
    });
}

async function fetchData() {
    console.log(`Initial data ${mandals}`);
    console.log(`Starting to fetch data...`)
    for(let i = 0;i < mandals.length; i++){
        let responsePHC = await axios.post(URI + 'GetPHCData/', {
            mandal_id: mandals[i].id
        }, {
                headers: { Authorization: `JWT ${jwtToken}` }
        });
        if(responsePHC.status === 200) {
            console.log(`PHC list fetched for mandal ${mandals[i].name}`);
            let phcList = responsePHC.data;
            for(let j = 0; j < phcList.length; j++){
                let responseVillSec = await axios.post(URI + 'GetVillageSecData/', {
                    PHC_id: phcList[j].PHC_id
                }, {
                    headers: { Authorization: `JWT ${jwtToken}` }
                });
                if(responseVillSec.status === 200) {
                    console.log(`Village Secretariats fetched for PHC ${phcList[j].name}`);
                    let villageSecList = responseVillSec.data;
                    for(let k = 0; k < villageSecList.length; k++){
                        let responseVillage = await axios.post(URI + 'GetVillageData/', {
                            villagesec_id: villageSecList[k].villagesec_id
                        }, {
                            headers: { Authorization: `JWT ${jwtToken}` }
                        });
                        if(responseVillage.status === 200){
                            console.log(`Villages fetched for Village Secretariat ${villageSecList[k].name}`);
                            let villageList = responseVillage.data;
                            villageSecList[k].villages = villageList;
                        }
                    }
                    phcList[j].villageSecs = villageSecList;
                }
            }
            allData[i].phcs = phcList;
        }
    }
    console.log('All data fetched. Exporting results to a file...');
    fs.writeFileSync('data.json', JSON.stringify(allData));
    console.log('Done');
}

login();