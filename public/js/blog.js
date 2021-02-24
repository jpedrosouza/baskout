// Caso o usuário não esteja logado ele sera redirecionado para a página 
// inicial e terá que fazer o login.
(function() {
    const login = document.getElementById('logo').className.toString().includes('true');

    if (!login) {
        window.location.href = '/'
    }
}());