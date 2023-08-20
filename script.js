const apiKey = "a2c97c2f0b08416487389120f9fbc035";
const baseUrl = "https://newsapi.org/v2/everything?q=";

// loader
const loading = document.querySelector(".wrapper");

// Data not found container
const notFound = document.querySelector(".not-found");

// fragement
const fragement = document.createDocumentFragment();

// template
const cardTemplate = document.getElementById("card-template");

// main card Container
const cardContainer = document.querySelector(".card-container");

// all search input
const searchText = document.querySelectorAll(".search-input");

// search button
const searchButton = document.querySelectorAll(".search-button");

// error show
const input_Error = document.querySelector(".error");

window.addEventListener("load", fetchData("ipl"));

async function fetchData(query) {
  notFound.style.display = "none";

  loading.style.display = "block";
  try {
    cardContainer.innerHTML = "";
    const response = await fetch(`${baseUrl}${query}&apikey=${apiKey}`);
    const { articles } = await response.json();
    loading.style.display = "none";
    if (articles.length === 0) {
      notFound.style.display = "block";
    } else {
      bindData(articles);
    }
  } catch (error) {
    console.log("Somethings Went Wrong");
    loading.style.display = "none";
  }
}

function bindData(articles) {
  // let t1 = performance.now();

  articles.forEach((article) => {
    if (!article.urlToImage) {
      return;
    }
    const cardClone = cardTemplate.content.cloneNode(true).firstElementChild;
    fillCardData(cardClone, article);
    fragement.appendChild(cardClone);
  });

  cardContainer.append(fragement);
  // let t2 = performance.now();
}

function fillCardData(cardClone, article) {
  // card image
  const cardImg = cardClone.querySelector("#card-img");

  // card title
  const cardTitle = cardClone.querySelector(".title");

  // card Date
  const cardDate = cardClone.querySelector(".date");

  // card description
  const cardDes = cardClone.querySelector(".description");

  cardImg.src = article.urlToImage;

  cardTitle.textContent = article.title;

  cardDes.textContent = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  cardDate.textContent = `${article.source.name} . ${date}`;

  cardClone.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

// handle navigation for fetching data
const navigationItem = document.querySelectorAll(".nav-item li");

// current active Item 
const currentActive = document.getElementsByClassName("active");

navigationItem.forEach((navItem) => {
  navItem.addEventListener("click", function () {
    let navValue = navItem.textContent.toLowerCase();
    
    // to show the current highlighted navItem  -> first way 

    navItem.className  = navItem.className.replace(" active", "");
    currentActive[0].className = currentActive[0].className.replace(" active","");
    this.className += " active";
    

    // fetch data for navItem 
    if (navValue) {
      fetchData(navValue);
    }
  });
});

// error show container
const show_error = document.querySelector(".show-error");

Array.from(searchButton).forEach((button, index) => {
  button.addEventListener("click", () => {
    searchQueryHandler(index);
  });

  // search when user hit Enter
  searchText[index].addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      searchQueryHandler(index);
    }
  });

  searchText[index].addEventListener("click", () => {
    input_Error.style.display = "none";
    show_error.style.display = "none";
  });
});

// input query handler
function searchQueryHandler(index) {
  let value = searchText[index].value;
  console.log(index);
  if (!Number(value) && value) {
    fetchData(value);
  } else {
    input_Error.style.display = "block";
    show_error.style.display = "block";
  }

  hamburger_manu.classList.toggle("click_li");
  console.log("inside search QueryHandler function");
  hamburger_manu.classList.remove("slider");
}

// manu icon div
const hamburger_manu = document.querySelector(".manu-icon");

// hamburger manu list 
const hamburger_manu_li = document.querySelectorAll(".manu-icon li");

// fetch Data when click the hamburger_manu_li

hamburger_manu_li.forEach((li) => {
    li.addEventListener("click" , () => {
      let listValue = li.textContent.toLowerCase()
      console.log(listValue)
      if (listValue) {
        fetchData(listValue);
      }
    })
})




//nav icon
const manu_icon = document.querySelector(".nav-icon");

manu_icon.addEventListener("click", () => {
  hamburger_manu.classList.toggle("slider");
  hamburger_manu.classList.remove("click_li");
});

const hamburger_manu_para = document.querySelectorAll(".manu-icon li");
hamburger_manu_para.forEach((li) => {
  li.addEventListener("click", () => {
    hamburger_manu.classList.toggle("click_li");
    hamburger_manu.classList.remove("slider");
  });
});

// category wise data

const selectCategory = document.querySelector(".select-captagory");
selectCategory.addEventListener("change", (event) => {
  
  let categoryValue = event.target.value;
  if (categoryValue) {
    fetchData(categoryValue);
  }
});
