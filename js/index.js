
const loadingElement = document.querySelector("#loading")
const postscontainer = document.querySelector("#posts-container")
const botao = document.querySelector("#botaobuscar")
const url = "https://jsonplaceholder.typicode.com/posts"
//pegar a url
const urlParametros = new URLSearchParams(window.location.search)
const idPost = urlParametros.get("id")
const comentarioscontainer = document.querySelector("#comentarios-container")

if (!idPost) {
    buscartodosposts()
} else
 {
    //tratar aqui o metodo de gravar comentarios e visualizar detalhe do post
    console.log("o valor do idPost e " + idPost)
    buscarpostespecifico(idPost)
}

async function buscartodosposts() {
    const resposta = await fetch(url)

    console.log(resposta)

    const data = await resposta.json()

    console.log(data)

    loading.classList.add("hide")

    data.map((postagem) => {
        const div = document.createElement("div")
        const title = document.createElement("h2")
        const body = document.createElement("p")
        const link = document.createElement("a")

        title.innerText = postagem.title
        body.innerText = postagem.body
        link.innerText = "ler"
        link.setAttribute("href", './post.html?id=' + postagem.id)

        div.appendChild(title)
        div.appendChild(body)
        div.appendChild(link)
        postscontainer.appendChild(div)
    })
}

async function buscarpostespecifico(id) {
    const respostapost = await fetch(`${url}/${id}`)
const respostacomentario = await fetch (`${url}/${id}/comments`)


    const datapostagem = await respostapost.json()
    const datacomentario = await respostacomentario.json()
    console.log(datacomentario)
    console.log(datapostagem)

    const title = document.createElement("h1")
    const body = document.createElement("p")


    title.innerText = datapostagem.title
    body.innerText = datapostagem.body

    postscontainer.appendChild(title)
    postscontainer.appendChild(body)

    datacomentario.map((comentario) => {
        criarcomentario(comentario)
    })
}


function criarcomentario(comentario) {
    const divcomentario = document.createElement("div")
    const email = document.createElement("h3")
    const paragrafocomentario = document.createElement("p")

email.innerText = comentario.email
paragrafocomentario.innerText = comentario.body

divcomentario.appendChild(email)
divcomentario.appendChild(paragrafocomentario)
comentarioscontainer.appendChild(divcomentario)

}