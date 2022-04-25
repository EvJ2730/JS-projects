const peopleCard = $("#getPeople");
const shipsCard = $("#getShips");
const spinner = $("#loader");
const resultDiv = $("#result");
const nextBtn = $("next");
const previousBtn = $("prev");
const paginationDiv = $("pagination");

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
    "Appearance",
];
const shipColumns = [ 
    "Name",
    "Model",
    "Manufacturer",
    "Cost",
    "People Capacity",
    "Class",
];

function Person(data){
    this.name = data.name;
    this.height = data.height ;
    this.mass = data.mass ;
    this.gender = data.gender ;
    this.birthYear = data.birthYear ;
    this.appearances = data.appearances ;
}
function Ship(data){
    this.name = data.name;
    this.model = data.model ;
    this.manufacturer = data.manufacturer ;
    this.cost = data.cost ;
    this.peopleCapacity = data.peopleCapacity ;
    this.class = data.class ;
}

showSpinner = (show) => {
    if(show){
        spinner.css("display", "block");
    }else{
        spinner.css("display", "none");
    }
}

const getPeople = () =>{
    showSpinner(true);
    resultDiv.html("");
    paginationDiv.css("display", "none");
    setTimeout(() =>{
        fetch(`${baseUrl} people/?page=${peoplePage}`)
        .then(res => res.json())
        .then(response =>{
            let people = response.results.map(person=> new Person(person));
            showSpinner(false);

            if(!response.previous){
                previousBtn.attr("disabled", true);
            }else{
                previousBtn.atttr("disabled", false);
            }
            if(!response.next){
                nextBtn.attr("disabled", true);
            }else{
                nextBtn.attr("disables", false)
            }
            paginationDiv.css("display", "flex");
            generateTable(people, peopleColumns);
        })

        .catch(error=>{
            showSpinner(false);
            console.log(error);
        })
    }, 1000)
}
