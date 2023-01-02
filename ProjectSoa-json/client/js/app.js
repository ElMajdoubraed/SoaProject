function main(){

    fetch('http://localhost:3000/', {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
        ch2 = setData(data);
        document.getElementById("body").innerHTML = ch2
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    /*
    fetch("http://localhost:3000/").then((response) => {
        
    */
}

function getData(){

    fetch('http://localhost:3000/', {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    /*
    fetch("http://localhost:3000/").then((response) => {
        
    */
}

function mainModels(){


    fetch('http://localhost:3000/getmodels', {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
        buttons = setDataModelButtons(data)
        ch2 = setDataModel(data);
        console.log(buttons)
        document.getElementById("inner").innerHTML = ch2
        document.getElementById("carroButtons").innerHTML = buttons
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    /*
    fetch("http://localhost:3000/").then((response) => {
        
    */
}

const setData = (data) => {
    ch = ""
    for (let index = 0; index < data.length; index++) {
        const sale = data[index].sale?.data[0] === 1 ? "text-danger" : "text-success"
        ch = ch + `
                  <div class="col-3 mb-3">
                      <div class="card" style="height: 36rem;">
                            <div class="">
                            <p class="text-primary text-center p-3">${data[index].name}</p>
                            <p class="text-center">${data[index].model}</p>
                            </div>
                          <img  style="max-height: 28rem;" src=${data[index].image} class="card-img-top" alt="...">
                          <p class="mb-3 ${sale} mt-3 text-center">${data[index].price} $</p>
                          <div class="card-body position-absolute bottom-0">
                            <p class="card-text">${data[index].description}</p>
                          </div>
                      </div>
                  </div>
      `
      
    }
    return ch
}

const setDataModel = (data) => {
    ch = ""
    for (let index = 0; index < data.length; index++) {
        active = index === 0 ? "active" : ""
        ch = ch + `
        <div class="carousel-item  ${active}">
        <img style="max-height: 35rem;" src=${data[index].image} class="d-block w-100  rounded-img" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>${data[index].name}</h5>
          <p>${data[index].description}</p>
        </div>
      </div>
      `
      
    }
    return ch
}

const setDataModelButtons = (data) => {
    buttons = ""
    for (let index = 0; index < data.length; index++) {
        active = index === 0 ? "active" : ""
        current = index === 0 ? `aria-current="true"` : ""
        buttons = buttons + `
        <button ${current} class="${active}" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${index}" aria-label="Slide ${index+1}"></button>
      `
      
    }
    return buttons
}

function changeSales() {
    fetch('http://localhost:3000/', {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
        const dataSales = data.filter(e => e.sale?.data[0] === 1)
        const ch = setData(dataSales)
        document.getElementById("body").innerHTML = ch
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function changeNoSales() {
    fetch('http://localhost:3000/', {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
        const dataSales = data.filter(e => e.sale?.data[0] === 0)
        const ch = setData(dataSales)
        document.getElementById("body").innerHTML = ch
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function SearchByPrice() {
    fetch('http://localhost:3000/', {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
        const price = document.getElementById("priceInput").value
        console.log(price)
        const dataSales = data.filter(e => e.price == price)
        const ch = setData(dataSales)
        document.getElementById("body").innerHTML = ch
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function SearchByModel() {
    fetch('http://localhost:3000/', {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
        const model = document.getElementById("modelInput").value
        const dataSales = data.filter(e => e.model == model)
        const ch = setData(dataSales)
        document.getElementById("body").innerHTML = ch
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

main();
mainModels();