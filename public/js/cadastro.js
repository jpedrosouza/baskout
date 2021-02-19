document.getElementById('cadastrar').addEventListener('click', () => {
    const name = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('senha').value;

    registerUser(name, email, password);
});

document.getElementById('cancelar').addEventListener('click', () => {
    window.location.href = '/';
});

async function registerUser(name, email, password) {
    await fetch('/user/create-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    }).then((response) => {
        window.location.href = '/';
    });
}