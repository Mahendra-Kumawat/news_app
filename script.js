const apiKey = "a2c97c2f0b08416487389120f9fbc035";
const baseUrl = "https://newsapi.org/v2/everything?q=";

const loading = document.querySelector(".wrapper");

const notFound = document.querySelector(".not-found");

const fragement = document.createDocumentFragment();

const cardTemplate = document.getElementById("card-template");
const cardContainer = document.querySelector(".card-container");

const searchText = document.querySelectorAll(".search-input");

const searchButton = document.querySelectorAll(".search-button");

const input_Error = document.querySelector(".error");

const manu_icon = document.querySelector(".nav-icon");

window.addEventListener("load", fetchData("general"));

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
  let t1 = performance.now();

  articles.forEach((article) => {
    if (!article.urlToImage) {
      return;
    }
    const cardClone = cardTemplate.content.cloneNode(true).firstElementChild;
    fillCardData(cardClone, article);
    fragement.appendChild(cardClone);
  });

  cardContainer.append(fragement);
  let t2 = performance.now();
}

function fillCardData(cardClone, article) {
  const cardImg = cardClone.querySelector("#card-img");

  const cardTitle = cardClone.querySelector(".title");

  const cardDate = cardClone.querySelector(".date");

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

function selectNavItem(value) {
  fetchData(value);
}

const show_error = document.querySelector(".show-error");

Array.from(searchButton).forEach((element, index) => {
  element.addEventListener("click", () => {
    let value = searchText[index].value;
    if (!Number(value)) {
      fetchData(value);
    } else {
      input_Error.style.display = "block";
      show_error.style.display = "block";
    }
  });
  searchText[index].addEventListener("click", () => {
    input_Error.style.display = "none";
    show_error.style.display = "none";
  });
});

// manu icon
const hamburger_manu = document.querySelector(".manu-icon");
const nav_icon = document.querySelector(".nav-icon");

nav_icon.addEventListener("click", () => {
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

function changeHandler(object) {
  let value = object.value;
  if (value) {
    fetchData(value);
  }
}
