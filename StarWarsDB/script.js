// Selecting elements

const peopleCard = $("#getPeople");
const shipsCard = $("#getShips");
const spinner = $("#loader");
const resultDiv = $("#result");
const nextBtn = $("#next");
const previousBtn = $("#prev");
const paginationDiv = $("#pagination")

const baseUrl = "https://swapi.dev/api/";
let peoplePage = 1;
let shipsPage = 1;
let activeCard = '';

const peopleColumns = [
    "Name",
    "Height",
    "Mass",
    "Gender",
    "Birth Year",
    "Appearances",
];

const starShipsColumns = [
    "Name",
    "Model",
    "Manufacturer",
    "Cost",
    "People Capacity",
    "Class"
];

function Person(data) {
    this.name = data.name;
    this.height = data.height;
    this.mass = data.mass;
    this.gender = data.gender;
    this.birthYear = data.birth_year;
    this.appearances = data.films.length;
}

function StarShip(data) {
    this.name = data.name;
    this.model = data.model;
    this.manufacturer = data.manufacturer;
    this.cost = data.cost_in_credits;
    this.peopleCapacity = data.passengers;
    this.class = data.starship_class;
}

function showSpinner(show) {
    if (show) {
        spinner.css("display", "block");
    } else {
        spinner.css("display", "none");
    }
}

const getPeople = () => {
    showSpinner(true);
    resultDiv.html("");
    paginationDiv.css("display", "none");
    setTimeout(() => {
        fetch(`${baseUrl}people/?page=${peoplePage}`)
        .then(res => res.json())
        .then(response => {
            let people = response.results.map(person => new Person(person));
            showSpinner(false);
            console.log(response);

            if(!response.previous) {
                console.log("PREV BUTTON SHOULD BE DISABLED");
                previousBtn.attr("disabled", true);
            } else {
                console.log("PREV BUTTON SHOULD BE ENABLED");
                previousBtn.attr("disabled", false);
            }
            if(!response.next) {
                console.log("NEXT BUTTON SHOULD BE DISABLED");
                nextBtn.attr("disabled", true);
            } else {
                console.log("NEXT BUTTON SHOULD BE ENABLED");
                nextBtn.attr("disabled", false);
            }
            paginationDiv.css("display", "flex");
            generateTable(people, peopleColumns);
        })
        .catch(error => {
            showSpinner(false);
            console.log(error);
        })
    }, 1500)
}

const getShips = () => {
    showSpinner(true);
    resultDiv.html("");
    paginationDiv.css("display", "none");
    setTimeout(() => {
        fetch(`${baseUrl}starships/?page=${shipsPage}`)
        .then(res => res.json())
        .then(response => {
            let starShips = response.results.map(ship => new StarShip(ship));
            showSpinner(false);

            if(!response.previous) {
                console.log("PREV BUTTON SHOULD BE DISABLED");
                previousBtn.attr("disabled", true);
            } else {
                console.log("PREV BUTTON SHOULD BE ENABLED");
                previousBtn.attr("disabled", false);
            }
            if(!response.next) {
                console.log("NEXT BUTTON SHOULD BE DISABLED");
                nextBtn.attr("disabled", true);
            } else {
                console.log("NEXT BUTTON SHOULD BE ENABLED");
                nextBtn.attr("disabled", false);
            }
            paginationDiv.css("display", "flex");
            generateTable(starShips, starShipsColumns)
        })
        .catch(error => {
            showSpinner(false);
            console.log(error);
        })
    }, 1500)   
}

peopleCard.click(() => {
    peopleCard.addClass("active-card");
    shipsCard.removeClass("active-card");
    activeCard = "peopleCard";
    peoplePage = 1;
    getPeople();
})

shipsCard.click(() => {
    shipsCard.addClass("active-card");
    peopleCard.removeClass("active-card");
    activeCard = "shipsCard";
    shipsPage = 1;
    getShips();
})

nextBtn.click(() => {
    if(activeCard === "peopleCard") {
        peoplePage++;
        getPeople();
    } else if(activeCard === "shipsCard") {
        shipsPage++;
        getShips();
    }
})

previousBtn.click(() => {
    if(activeCard === "peopleCard") {
        peoplePage--;
        getPeople();
    } else if(activeCard === "shipsCard") {
        shipsPage--;
        getShips();
    }
})

function generateTableVanilaJS(data, columns) {
    let table = document.createElement("table");
    table.classList.add("table");
    table.style.color = "white";
    let tableHead = document.createElement("thead");
    let headerRow = document.createElement("tr");
    columns.forEach(column => {
        let th = $("<th>");
        th.textContent = column;
        headerRow.appendChild(th);
    });
    tableHead.appendChild(headerRow);
    table.appendChild(tableHead);
    let tableBody = document.createElement("tbody");
    data.forEach(item => {
        let tableRow = document.createElement("tr");
        Object.keys(item).forEach(key => {
            let td = document.createElement("td");
            td.textContent = item[key];
            tableRow.appendChild(td);
        })
        tableBody.appendChild(tableRow);
    })
    table.appendChild(tableBody);
    resultDiv.innerHTML = table;
}

function generateTable(data, columns) {
    let table = $("<table>");
    table.addClass("table");
    table.css("color", "white");
    let tableHead = $("<thead>");
    let headerRow = $("<tr>");
    columns.forEach(column => {
        let th = $("<th>");
        th.text(column);
        headerRow.append(th);
    });
    tableHead.append(headerRow);
    table.append(tableHead);
    let tableBody = $("<tbody>");
    data.forEach(item => {
        let tableRow = $("<tr>");
        Object.keys(item).forEach(key => {
            let td = $("<td>");
            td.text(item[key])
            tableRow.append(td);
        })
        tableBody.append(tableRow);
    })
    table.append(tableBody);
    resultDiv.html(table);
}

async function fetchUsersAsync() {
    try {
        console.log("BEFORE MAKING THE CALL");
        let response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.status)
        }
        let users = await response.json();
        console.log(users)
    } catch (error) {
        console.log(`Error Status ${error}`)
    }
}

fetchUsersAsync();
console.log("I DONT CARE ABOUT ASYNC");