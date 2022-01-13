const addBtn = document.querySelector(".footer button");
const articlesList = document.querySelector(".listAricles");
const addNewArticleBtn = document.querySelector(".input-form");
const addForm = document.querySelector(".addContent");
const infoBanner = document.querySelector("#show_info");
const paragraph = document.querySelector("#info");
const img = document.querySelector("#info-img");
const deleteArticleBtn = document.querySelector(".info-form");

showArticles();

addBtn.onclick = () => {
    if (window.innerWidth > 575) {
        infoBanner.style.display = "none";
    } else {
        removeActiveMode();
    }
    addForm.style.display = "grid";
}

function removeActiveMode() {
    var activeli = document.getElementsByClassName("liactive");
    var index = activeli[0].getAttribute("id");
    if (activeli.length > 0) {       
        var elem = document.getElementsByClassName("grid-description")[parseInt(index)];
        if (elem != null) {
            elem.style.display = "none";
        }  
        activeli[0].classList.remove("liactive");
    }
    return index;
}

addNewArticleBtn.onclick = () => {
    let enteredTitle = document.querySelector("#inputTitle").value;
    let enteredLink = document.querySelector("#inputPicLink").value;
    let enteredTxt = document.querySelector("#inputText").value;
    let getLocalStorageData = localStorage.getItem("Articles");
    if (getLocalStorageData == null) {
        listArticles = [];
    } else {
        listArticles = JSON.parse(getLocalStorageData);
    }
    if (enteredTitle == "") {
        alert("Поле заголовок не может быть пустым!");
    } else if (enteredTxt == "") {
        alert("Поле текст не может быть пустым!");
    } else if (enteredLink == "") {
        alert("Поле ссылка на картинку не может быть пустым!");
    } else {
        listArticles.push([enteredTitle, enteredLink, enteredTxt]);
        localStorage.setItem("Articles", JSON.stringify(listArticles));
        alert("Статья успешно добавлена!");
        showArticles();
        document.querySelector("#inputTitle").value = "";
        document.querySelector("#inputPicLink").value = "";
        document.querySelector("#inputText").value = "";
        addForm.style.display = "none";
    }
}

function showArticles() {
    let getLocalStorageData = localStorage.getItem("Articles");
    if (getLocalStorageData == null) {
        listArticles = [];
    } else {
        listArticles = JSON.parse(getLocalStorageData);
    }
    
    let newLiTag = "";
    listArticles.forEach((element, index) => {
            newLiTag += `<li id="${index}" onclick="showInfoBanner(${index})">${element[0]}</li>
      <div class="grid-description">
        <div class="info">
          <img class="info-img right-img" align="right"/>
          <p class="para-info"></p>
        </div>        
        <button class="info-form active" onclick="deleteArticle()">Удалить</button>  
      </div>`;
    });

    articlesList.innerHTML = newLiTag;
    if (listArticles.length > 0) {
        showInfoBanner(0);
    }
}

function showInfoBanner(index) {
    addForm.style.display = "none";
    if (document.getElementsByClassName("liactive").length > 0) {
        removeActiveMode();
    }   
    var items = document.getElementsByTagName("li");
    items[index].classList.add("liactive");
    let getLocalStorageData = localStorage.getItem("Articles");
    var listArticles = JSON.parse(getLocalStorageData);
    if (window.innerWidth > 575) {
        paragraph.innerHTML = listArticles[index][2];
        img.setAttribute("src", listArticles[index][1]);
        img.setAttribute("alt", listArticles[index][0]);
        infoBanner.style.display = "grid";
    } else {
        infoBanner.style.display = "none";
        var elem = document.getElementsByClassName("grid-description")[index];
        var image = elem.getElementsByClassName("info-img")[0];
        var para = elem.getElementsByClassName("para-info")[0];
        para.innerHTML = listArticles[index][2];
        image.setAttribute("src", listArticles[index][1]);
        image.setAttribute("alt", listArticles[index][0]);
        elem.style.display = "grid";
    }
}

function deleteArticle() {
    var index = removeActiveMode();
    let getLocalStorageData = localStorage.getItem("Articles");
    var listArticles = JSON.parse(getLocalStorageData);
    listArticles.splice(index, 1);
    localStorage.setItem("Articles", JSON.stringify(listArticles));
    alert("Статья успешно удалена!");
    if (window.innerWidth > 575) {
        infoBanner.style.display = "none";
        paragraph.innerHTML = "";
    } else {
        var elem = document.getElementsByClassName("grid-description")[index];
        elem.style.display = "none";
        var para = elem.getElementsByClassName("para-info")[0];
        para.innerHTML = "";
    }
    showArticles();
}
