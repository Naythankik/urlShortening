let modal = document.querySelector(".modal");
let menu = document.querySelector(".menu-header");
modal.addEventListener("click", function () {
  if (window.innerWidth <= 1000) {
    if (menu.style.display == "none") {
      menu.style.display = "flex";
    } else {
      menu.style.display = "none";
    }
  }
});

// the api server
let err = document.querySelector(".error");
let errInput = document.querySelector("#name");

const apiServer = async (api) => {
  const server = await fetch(api);

  if (!server.ok) {
    alert("The link is not valid!");
    err.style.display = "flex";
    errInput.classList.add("input-error");
  }

  return server.json();
};

let copyButton = document.querySelectorAll(".copy");
let shortUrl = document.querySelectorAll("#short-url");
let fullUrl = document.querySelectorAll("#full-url");

const mainMessage = async (link) => {
  let address = new URL("https://api.shrtco.de/v2/shorten");
  address.searchParams.set("url", link);

  let api = await apiServer(address.toString());
  api = api.result;

  let short = [api.short_link, api.short_link2, api.short_link3];
  let long = [api.full_short_link, api.full_short_link2, api.full_short_link3];
  let parent = document.querySelectorAll(".auto-complete");

  for (let i = 0; i < copyButton.length; i++) {
    shortUrl[i].innerHTML = short[i];
    fullUrl[i].innerHTML = long[i];
    parent[i].style.display = "flex";
    fullUrl[i].setAttribute("href", api.original_link);
    shortUrl[i].setAttribute("href", api.original_link);
  }
};

let userURL = document.getElementById("urlInput");
userURL.addEventListener("submit", function (e) {
  e.preventDefault();
  let url = document.querySelector("#name");
  mainMessage(url.value);
  if (errInput.classList.contains("input-error")) {
    err.style.display = "none";
    errInput.classList.remove("input-error");
  }
});

for (let i = 0; i < copyButton.length; i++) {
  copyButton[i].addEventListener("click", function (e) {
    e.target.classList.add("copied");
    e.target.textContent = "copied";
  });
}
