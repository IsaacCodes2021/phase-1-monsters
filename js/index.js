document.addEventListener('DOMContentLoaded', () => {
    GetAllMonsters()
    processForm()
    pageTurn()
    
})

function GetAllMonsters () {
    fetch('http://localhost:3000/monsters')
    .then(response => response.json())
    .then(data => displayMonster(data))
}

let i = 0
function displayMonster(monsterArray) {
    let fiftyBatch = monsterArray.slice(i, i + 50)
    fiftyBatch.forEach(element => monsterMash(element));
}

function monsterMash (monsterObject) {
    const div = document.querySelector('#monster-container')
    let monsterDiv = document.createElement('div')
    let monsterName = document.createElement('h2')
    let monsterAge = document.createElement('h4')
    let monsterDescription = document.createElement('p')

    monsterName.textContent = monsterObject.name
    monsterAge.textContent = `age: ${monsterObject.age} years`
    monsterDescription.textContent = `description: ${monsterObject.description}`

    div.appendChild(monsterDiv)
    monsterDiv.appendChild(monsterName)
    monsterDiv.appendChild(monsterAge)
    monsterDiv.appendChild(monsterDescription)
}

function pageTurn() {
    const pageForward = document.querySelector('#forward')
    const pageBack = document.querySelector('#back')
    const div = document.querySelector('#monster-container')
    pageForward.addEventListener('click', () => {
        i+=50
        div.innerHTML = " "
        GetAllMonsters();
    })
    pageBack.addEventListener('click', () => {
        i-=50
        div.innerHTML = ' '
        GetAllMonsters()
    })
}

function processForm() {
    let div = document.querySelector('#create-monster')
    let newMonster = document.createElement('form')
    let nameInput = document.createElement('input')
    let ageInput = document.createElement('input')
    let descriptionInput = document.createElement('input')
    let monsterButton = document.createElement('button')

    newMonster.setAttribute('id', 'new-monster')
    nameInput.setAttribute('id', 'name')
    nameInput.placeholder = 'name...'
    nameInput.type = 'text'
    ageInput.setAttribute('id', 'age')
    ageInput.placeholder = 'age'
    ageInput.type = 'text'
    descriptionInput.setAttribute('id', 'description')
    descriptionInput.placeholder = 'description...'
    descriptionInput.type = 'text'
    monsterButton.setAttribute('id', 'submit')
    monsterButton.textContent = "submit"

    div.append(newMonster)
    newMonster.appendChild(nameInput)
    newMonster.appendChild(ageInput)
    newMonster.appendChild(descriptionInput)
    newMonster.appendChild(monsterButton)

    newMonster.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log('submit sucessful')
        let nameValue = nameInput.value
        let ageValue = ageInput.value
        let descriptionValue = descriptionInput.value
        submitForm(nameValue, ageValue, descriptionValue)
    })
}

function submitForm(name, age, description) {
    fetch('http://localhost:3000/monsters')
    .then(response => response.json())
    .then(data => {
        //console.log(data)
        let newMonsterObject = {
            name : name,
            age : age,
            description : description,
            id : '0'
        }
        // console.log(newMonsterObject)
        // console.log(`name: ${name}\nage: ${age}\ndescription: ${description}`)
        // data.unshift(newMonsterObject)
        // GetAllMonsters()
        displayNewMonster(newMonsterObject)
    })
}
function displayNewMonster(newMonster) {
    const div = document.querySelector('#monster-container')
    let monsterDiv = document.createElement('div')
    let monsterName = document.createElement('h2')
    let monsterAge = document.createElement('h4')
    let monsterDescription = document.createElement('p')

    monsterName.textContent = newMonster.name
    monsterAge.textContent = `age: ${newMonster.age} years`
    monsterDescription.textContent = `description: ${newMonster.description}`

    div.appendChild(monsterDiv)
    monsterDiv.appendChild(monsterName)
    monsterDiv.appendChild(monsterAge)
    monsterDiv.appendChild(monsterDescription)
}
