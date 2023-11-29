
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://playground-1e07d-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsListInDB = ref(database, "endorsementsList")

const inputFieldEl = document.getElementById("input-field")
const publishButtonEl = document.getElementById("publish-button")
const endorsementsEl = document.getElementById("endorsements-list")

publishButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value 
    push(endorsementsListInDB, inputValue)
    clearInputFieldEl()
})

function clearInputFieldEl(){
    inputFieldEl.value = ""
}

onValue(endorsementsListInDB, function(snapshot) {
    
       let itemsArray = Object.entries(snapshot.val())
       
       clearEndorsementsList()
       
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToListEl(currentItem)
        }    
})
function clearEndorsementsList(){
    endorsementsEl.innerHTML = ""
}
function appendItemToListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    newEl.addEventListener("dblclick", function(){
        let exactLocationInDB = ref(database, `endorsementsList/${itemID}`)
        remove(exactLocationInDB)
    })
    endorsementsEl.append(newEl)
    }

