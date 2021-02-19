(function() {
    getPosts();
}());

async function getPosts() {
    const postsContainer = document.getElementById('postsContainer');

    await fetch('/post/get-posts', { method: 'GET' })
        .then(response => response.json())
        .then((response) => {
            console.log(response);

            response.forEach((element) => {
                postsContainer.innerHTML += `
                <div id=${element['id']} class="post" onclick="navigateToPost(this.id)">
                    <div class="content">
                        <div class="imagem">
                            <img src="${element['imageUrl']}">
                        </div>
                        <div class="resumo">
                            <div class="titulo" style="text-align: center;">
                                <p>${element['title']}</p>
                            </div>
                        <a href="/apresentacao" style="padding-top: 30px;">${element['content']}</a>
                        </div>
                    </div>
                </div>
                `;
            });
        });
}

function navigateToPost(id) {
    window.location.href = `/post?id=${id}`;
}

const modal = document.getElementById('myModal');

document.getElementById('cadastro').addEventListener('click', () => {
    window.location.href = '/cadastro';
});

document.getElementById('login').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('senha').value;

    authUser(email, password);
});

async function authUser(email, password) {
    await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(response => response.json())
        .then((response) => {
            console.log(response['code'])

            if (response['code'] == 200) {
                modal.className = 'none';
            }
        });
}