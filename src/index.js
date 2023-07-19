document.addEventListener('DOMContentLoaded',()=>{
    fetch('http://localhost:3000/quotes?_embed=likes')
    .then(resp=>resp.json())
    .then(data=>data.forEach(quote=>createCard(quote)))

    const form = document.querySelector('#new-quote-form')
    form.addEventListener('submit', e=>{
        e.preventDefault()
        newQuote(e.target)
    })
})

function createCard(quoteInfo){
    const quoteList = document.querySelector('#quote-list')
    const quoteLI = document.createElement('li')

    const blockquote = document.createElement('blockquote')
    blockquote.id = quoteInfo.id
    blockquote.className = 'blockquote'

    const p = document.createElement('p')
    p.className = 'mb-0'
    p.innerText = quoteInfo.quote

    const footer = document.createElement('footer')
    footer.className = 'blockquote-footer'
    footer.innerText = quoteInfo.author

    const br = document.createElement('br')
    
    const buttonSuccess = document.createElement('button')
    buttonSuccess.className = 'btn-success'
    buttonSuccess.innerText = `Likes: `
    const span = document.createElement('span')
    span.innerText = quoteInfo.likes.length
    buttonSuccess.appendChild(span)

    const buttonDanger = document.createElement('button')
    buttonDanger.className = 'btn-danger'
    buttonDanger.innerText = 'Danger'

    blockquote.append(p, footer, br, buttonSuccess, buttonDanger)
    quoteLI.appendChild(blockquote)
    quoteList.appendChild(quoteLI)

    buttonDanger.addEventListener('click', e=>{
        e.preventDefault()
        deleteButton(e.target.parentNode)
    })

    buttonSuccess.addEventListener('click', e=>{
        e.preventDefault()
        likeButton(e.target.parentNode)
    })
}

function newQuote(info){
    const quoteObj = {'quote': info.elements[0].value, 'author': info.elements[1].value}
    createCard({...quoteObj, 'likes': []})
    fetch('http://localhost:3000/quotes', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(quoteObj)
    })
}

function deleteButton(info){
    const quoteToDelete = document.getElementById(info.id).parentNode
    quoteToDelete.remove()
    fetch(`http://localhost:3000/quotes/${info.id}`, {
        method: 'DELETE',
        headers: {'content-type': 'application/json'},
    })

}

function likeButton(info){
    const quoteLiked = document.getElementById(info.id).querySelector('span')
    quoteLiked.innerText = parseInt(quoteLiked.innerText)+1
    const id = parseInt(info.id)
    console.log(info)
    fetch('http://localhost:3000/likes', {
        method: 'POST', 
        headers: {'content-type': 'application.json'},
        body: JSON.stringify({'quoteId': id})
    })

}