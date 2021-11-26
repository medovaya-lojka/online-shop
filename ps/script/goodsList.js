window.addEventListener("load", () => {

})

const loadProduct = () => {
    fetch('/getPositionsList')
        .then(response => response.json())
        .then(data => {
            
        });
    
}