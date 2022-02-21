let inputText = document.querySelector("#text-input");
let btnSubmit = document.querySelector("#btn-submit");
let listItem = document.querySelector(".list-item-container");

checkDataCount();

function checkDataCount() {
  if (listItem.childElementCount === 0) {
    var TextWarn = document.createElement("h2");
    TextWarn.classList.add("text-warning");
    TextWarn.textContent = "No Data...";
    listItem.append(TextWarn);
  } else {
    listItem.removeChild(listItem.firstElementChild);
  }
}
btnSubmit.addEventListener("click", addItem);
function addItem() {
  if (inputText.value !== "" && inputText.value.trim() !== "") {
    checkDataCount();
    // DIV
    let divText = document.createElement("div");
    divText.classList.add("list-item");

    // ELEMENT IN DIV
    let NewText = document.createElement("h3");
    NewText.textContent = inputText.value;

    let btnGroup = document.createElement("div");
    btnGroup.classList.add("btn-group");
    // BTN DELETE
    const btnDel = document.createElement("button");
    btnDel.classList.add("btn-del-custom");

    let iconDel = document.createElement("i");
    iconDel.classList.add("fas", "fa-trash");
    btnDel.append(iconDel);
    btnDel.addEventListener("click", delItem);

    // BTN EDIT
    let btnEdit = document.createElement("button");
    btnEdit.classList.add("btn-edit-custom");

    let iconEdit = document.createElement("i");
    iconEdit.classList.add("fas", "fa-edit");
    btnEdit.append(iconEdit);
    btnEdit.addEventListener("click", editItem);

    btnGroup.append(btnDel, btnEdit);
    divText.append(NewText, btnGroup);
    listItem.append(divText);

    inputText.value = "";
  } else {
    alert("wtf are you doing ?");
  }
}

function delItem(e) {
  const currentDelBtn = e.currentTarget;
  if (confirm("Are you sure ?")) {
    currentDelBtn.parentNode.parentNode.remove();
  }
  checkDataCount();
}

function editItem(e) {
  if (confirm("Are you sure want to fix it ?")) {
    let parentElement =
      e.currentTarget.parentNode.parentNode.parentNode.previousElementSibling;
    let hideBtn =
      e.currentTarget.parentNode.parentNode.parentNode.previousElementSibling
        .children[1];
    hideBtn.style.display = "none";

    let btnSure = document.createElement("button");
    btnSure.classList.add("btn-check-custom");
    let iconBtnSure = document.createElement("i");
    iconBtnSure.classList.add("fas", "fa-check");

    btnSure.append(iconBtnSure);
    parentElement.append(btnSure);

    let btnDel = e.currentTarget.parentNode.children[0];
    let btnEdit = e.currentTarget.parentNode.children[1];
    btnDel.style.display = "none";
    btnEdit.style.display = "none";

    let elementEdit = e.currentTarget.parentElement.previousElementSibling;
    console.log(elementEdit);

    inputText.value = elementEdit.textContent;

    btnSure.addEventListener("click", () => {
      elementEdit.textContent = inputText.value;
      inputText.value = "";
      btnSure.remove();
      btnDel.style.display = "block";
      btnEdit.style.display = "block";
      hideBtn.style.display = "block";
    });
  }
}
