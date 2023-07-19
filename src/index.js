document.addEventListener('DOMContentLoaded',()=>{
    fetch('http://localhost:3000/quotes?_embed=likes')
    .then(resp=>resp.json())
    .then(data=>data.forEach(quote=>createCard(quote)))
})

function createCard(quoteInfo){
    const quoteList = document.querySelector('#quote-list')
    const quoteLI = document.createElement('li')

    const blockquote = document.createElement('blockquote')
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
}