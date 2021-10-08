let bookmarks = []

const bookmarksFromLocalStorage = JSON.parse( localStorage.getItem("myBookmarks") )

const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const saveTabBtn = document.getElementById("tab-btn")

if (bookmarksFromLocalStorage) {
    bookmarks = bookmarksFromLocalStorage
    render(bookmarks)
}

inputBtn.addEventListener("click", function() {
    bookmarks.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem( "myBookmarks", JSON.stringify( bookmarks ) )
    inputEl.focus()
    render(bookmarks)
})

deleteBtn.addEventListener("click", function() {
    localStorage.clear()
    bookmarks = []
    render(bookmarks)
})

saveTabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        bookmarks.push(tabs[0].url)
        localStorage.setItem( "myBookmarks", JSON.stringify( bookmarks ) )
        render(bookmarks)
    })
})

function render (items) {
    let listItems = ""
    for (let i = 0; i < items.length; i++) {
        listItems += `
        <li>
            <a target='_blank' href='${items[i]}'>
                ${items[i]}
            </a>
        </li>
        `
    }
    ulEl.innerHTML = listItems
}
