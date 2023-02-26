const loadData = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
    displayData(data.data, dataLimit)
}

const displayData = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container')
    phonesContainer.textContent = ''
    // showing certain amount of phones
    const showAllButton = document.getElementById('show-all')
    if(dataLimit && phones.length > 6){
        phones = phones.slice(0,6)
        showAllButton.classList.remove('d-none')
    }
    else{
        showAllButton.classList.add('d-none')
    }

    // showing warning message for no phones found
    const noPhoneWaring = document.getElementById('no-phones-warning')
    if(phones.length === 0){
        noPhoneWaring.classList.remove('d-none')
    }
    else{
        noPhoneWaring.classList.add('d-none')
    }
    phones.forEach(phone =>{
        // console.log(phone)
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
            <div class="card p-5">
                <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                        to additional content. This content is a little bit longer.</p>
                        <button onclick="loadPhoneDetails('${phone.slug}')" data-bs-toggle="modal" data-bs-target="#exampleModal" href="#" class="btn btn-primary">Show Details</button>
                    </div>
            </div>
        `
        phonesContainer.appendChild(phoneDiv)
    })
    // stop the loading spinner
    toggleLoader(false)
}

const processSearch = (dataLimit) => {
    toggleLoader(true)
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    loadData(searchText, dataLimit)
}

const loadPhonesBySearch = () => {
    // start the loading spinner
    processSearch(6)
}
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      processSearch(6)
    }
});

const toggleLoader = isLoading => {
    const spinner = document.getElementById('loader')
    if(isLoading === true){
        spinner.classList.remove('d-none')
    }
    else{
        spinner.classList.add('d-none')
    }
}

document.getElementById('show-all-btn').addEventListener('click', function(){
    processSearch()
})

const loadPhoneDetails = async(id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhoneDetails(data.data)
}

const displayPhoneDetails = phone => {
    // console.log(phone.mainFeatures.sensors)
    const phoneDetailTitle = document.getElementById('exampleModalLabel')
    phoneDetailTitle.innerText = phone.name

    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.innerHTML = `
        <p><strong>Release Date:</strong> ${phone.releaseDate}</p>
        <p><strong>Storage: </strong>${phone.mainFeatures ? phone.mainFeatures.storage : 'no storage information available for this device'}</p>
        <p><strong>Display Size: </strong>${phone.mainFeatures ? phone.mainFeatures.displaySize : 'No sensor'}</p>
        <p><strong>Sensor-1: </strong>${phone.mainFeatures ? phone.mainFeatures.sensors[0] : 'No sensor'}</p>
        <p><strong>Sensor-2: </strong>${phone.mainFeatures ? phone.mainFeatures.sensors[1] : 'No sensor'}</p>
        <p><strong>Sensor-3: </strong>${phone.mainFeatures ? phone.mainFeatures.sensors[2] : 'No sensor'}</p>
        <p><strong>Sensor-4: </strong>${phone.mainFeatures ? phone.mainFeatures.sensors[3] : 'No sensor'}</p>
    `
}

// loadData('apple');