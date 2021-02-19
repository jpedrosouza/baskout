(function() {
    const login = document.getElementById('logo').className.toString().includes('true');

    if (!login) {
        window.location.href = '/'
    }
}());