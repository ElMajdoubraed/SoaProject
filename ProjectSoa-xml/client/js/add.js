function saveProduct(){

    nameProduct = document.getElementById("name").value;
    model = document.getElementById("model").value;
    price = document.getElementById("price").value;
    image = document.getElementById("image").value;
    sale = document.getElementById("sale").checked;
    description = document.getElementById("description").value;
    const body = {
        name : nameProduct,
        model : model,
        price : price,
        image: image,
        sale: sale,
        description: description
    }
    
    fetch('http://localhost:3000/save', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
    })
  .then((response) => response.json())
  .then((result) => {
    console.log("Product saved !")
  })
  .catch((error) => {
    console.error(error)
  });
}