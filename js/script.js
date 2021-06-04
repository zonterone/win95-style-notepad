const editButton = document.querySelector("#edit");
const saveButton = document.querySelector("#save");
const cancelButton = document.querySelector("#cancel");
const textArea = document.querySelector("#textArea");
const select = document.querySelector(".text-select");
const selectSubmBtn = document.querySelector("#btn-container__submit");
const selectCancelBtn = document.querySelector("#btn-container__cancel");

let getLastText = function () {
  let arr = getArr();
  return arr[arr.length - 1].text;
};

let getArr = function () {
  return JSON.parse(localStorage.getItem("lastKey"));
};

editButton.addEventListener("click", edit);
saveButton.addEventListener("click", save);
cancelButton.addEventListener("click", cancel);
selectSubmBtn.addEventListener("click", selectSubm);
selectCancelBtn.addEventListener("click", selectCancel);
document.addEventListener("DOMContentLoaded", ready);

function edit() {
  saveButton.removeAttribute("disabled");
  cancelButton.removeAttribute("disabled");
  editButton.setAttribute("disabled", "true");
  textArea.setAttribute("contenteditable", "true");
}

function save() {
  let localStorageArr = [];

  let now = new Date();
  let currentTime =
    now.getDate() +
    "." +
    now.getMonth() +
    "." +
    now.getFullYear() +
    " " +
    now.getHours() +
    ":" +
    now.getMinutes() +
    ":" +
    now.getSeconds();
  if (JSON.parse(localStorage.getItem("lastKey")) !== null) {
    localStorageArr = getArr();
  }

  localStorageArr.push({ key: currentTime, text: textArea.textContent });
  localStorage.setItem("lastKey", JSON.stringify(localStorageArr));

  saveButton.setAttribute("disabled", "true");
  cancelButton.setAttribute("disabled", "true");
  editButton.removeAttribute("disabled");
  textArea.removeAttribute("contenteditable");
}

function cancel() {
  if (localStorage.length > 0) {
    textArea.textContent = getLastText();
  } else {
    alert("Вы еще ничего не сохранили!");
  }

  saveButton.setAttribute("disabled", "true");
  cancelButton.setAttribute("disabled", "true");
  editButton.removeAttribute("disabled");
  textArea.removeAttribute("contenteditable");
}

function ready() {
  let arr = getArr();

  if (arr !== null && arr.length > 0) {
    select.parentElement.style.display = "flex";

    textArea.textContent = getLastText();

    for (let i = 0; i < arr.length; i++) {
      let elem = arr[i];

      let option = document.createElement("option");

      option.textContent = elem.key + " -- " + elem.text;
      option.setAttribute("value", elem.key);
      select.append(option);
    }
  }
}

function selectSubm() {
  let arr = getArr();
  textArea.textContent = arr.find(item => item.key === select.value).text;
  select.parentElement.style.display = "";
}

function selectCancel() {
  select.parentElement.style.display = "";
}
