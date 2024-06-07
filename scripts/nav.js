window.onload = function() {
    fetch('./elements/navigation.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-container').innerHTML = data;
        });
}