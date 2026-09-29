// US Department of Transportation: https://vpic.nhtsa.dot.gov/api/

// 2024 GMC Sierra 2500HD: 1GD59ME74RF750709
// 2016 Honda SXS500M: 1HFVE034XG4100055
// 1990 Ford F-350: 2FTJW35M4LCB26178
// 1988 Dodge Ram Van: 2B7HB23W7JK164483
// 2010 BMW M5: WBSNB9C58AC043408

document.querySelector('#getVehicleDetails').addEventListener('click', getVehicleDetails);

const getVehicleDetailsURL = 'https://vpic.nhtsa.dot.gov/api/';

function getVehicleDetails() {

    document.querySelector('#vehicleDetails').replaceChildren();

    const vehicleVIN = document.querySelector('#vehicleVIN').value;
    console.log(vehicleVIN);

    if (vehicleVIN.length < 1) {
        return alert('Please enver a VIN');
    }
    else if (vehicleVIN.length < 17) {
        return alert('A VIN must be 17 characters long.');
    };

    getDetailsVIN(vehicleVIN);

};

function getDetailsVIN(vin) {

    const detailsVINURL = getVehicleDetailsURL + `/vehicles/DecodeVinValuesExtended/${vin}?format=json`;
    console.log(detailsVINURL);

    fetch(detailsVINURL)

        .then(function (response) {
            console.log(response);
            return response.json();
        })

        .then(function (data) {
            console.log(data);

            const dataVIN = data.Results[0];
            console.log(dataVIN);

            const namesDataVIN = Object.keys(dataVIN);
            console.log(namesDataVIN);
            console.log(namesDataVIN.length);

            const valuesDataVIN = Object.values(dataVIN);
            console.log(valuesDataVIN);
            console.log(valuesDataVIN.length);

            let vehicleDetails = [];

            for (let i = 0; i < namesDataVIN.length; i++) {

                let vehicleDetail = {
                    name: namesDataVIN[i],
                    value: valuesDataVIN[i]
                };

                console.log(vehicleDetail);
                console.log(vehicleDetail.name);
                console.log(vehicleDetail.value);

                vehicleDetails.push(vehicleDetail);

            };

            console.log(vehicleDetails);

            buildVehicleDetails(vehicleDetails);

        });

};

function buildVehicleDetails(vehicleDetails) {
    console.log(vehicleDetails);
    console.log(vehicleDetails.length);

    const vehicleDetailsResults = document.querySelector('#vehicleDetails');
    console.log(vehicleDetailsResults);

    vehicleDetailsResults.replaceChildren();

    let sectionVehicleDetails = document.createElement('section');
    console.log(sectionVehicleDetails);

    vehicleDetails.forEach(function (vehicleDetail) {
        console.log(vehicleDetail);

        if (vehicleDetail.value !== '') {

            let divVehicleDetail = document.createElement('div');
            console.log(divVehicleDetail);

            console.log(vehicleDetail.name);

            let nameVehicleDetail = document.createElement('span');
            console.log(nameVehicleDetail);
            nameVehicleDetail.innerText = vehicleDetail.name.toUpperCase() + ': ';
            divVehicleDetail.appendChild(nameVehicleDetail);

            console.log(vehicleDetail.value);

            let valueVehicleDetail = document.createElement('span');
            console.log(valueVehicleDetail);
            valueVehicleDetail.innerText = vehicleDetail.value;
            divVehicleDetail.appendChild(valueVehicleDetail);

            sectionVehicleDetails.appendChild(divVehicleDetail);

        };

    });

    vehicleDetailsResults.appendChild(sectionVehicleDetails);

};