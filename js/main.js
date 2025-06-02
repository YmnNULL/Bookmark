const inputName = document.getElementById("bookmarkName");
const inputUrl = document.getElementById("bookmarkURL");
const submit = document.getElementById("btnSubmit");
const closeBtn = document.getElementById("closeBtn");
const erorrWindow = document.getElementById("Erorr");
const tableContent = document.getElementById("tableContent");
let innerTable = [];


if(localStorage.getItem("books")){
    var arrBooks = JSON.parse(localStorage.getItem("books"));
    showBooks();
}
else{
    var arrBooks= [];
}

function addBooks(){
    let book = {
        bookName : inputName.value,
        bookUrl : inputUrl.value,
    }
    arrBooks.push(book);
    localStorage.setItem("books",JSON.stringify(arrBooks));
    clearForm();
    inputName.classList.remove("valid");
    inputUrl.classList.remove("valid");
    showBooks();
}

function clearForm(){
    inputName.value = null;
    inputUrl.value = null;
}


function checkValueInName() {
  let flage = false;
  if (inputName.value.trim().length < 3) {
    inputName.classList.add("is-invalid");
    inputName.nextElementSibling.classList.remove("d-none");
  } else {
    inputName.classList.remove("is-invalid");
    inputName.classList.add("is-valid");
    inputName.nextElementSibling.classList.add("d-none");
    inputName.nextElementSibling.classList.remove("d-block");
    flage = true;
  }
  return flage;
}

const regex = /^(https:\/\/|http:\/\/).*\.(com|edu|org|net)(\/.*)?$/;

function checkValueInUrl() {
  let flage = false;
  if (!regex.test(inputUrl.value)) {
    inputUrl.classList.add("is-invalid");
    inputUrl.nextElementSibling.classList.remove("d-none");
  } else {
    inputUrl.classList.remove("is-invalid");
    inputUrl.classList.add("is-valid");
    inputUrl.nextElementSibling.classList.add("d-none");
    inputUrl.nextElementSibling.classList.remove("d-block");
    flage = true;
  }
  return flage;
}

submit.addEventListener("click", function () {
  if (checkValueInUrl() && checkValueInName()) {
    addBooks();
    inputUrl.classList.remove("is-valid");
    inputName.classList.remove("is-valid");
  } else {
    erorrWindow.classList.remove("d-none");
  }
});

closeBtn.addEventListener("click", function () {
  erorrWindow.classList.add("d-none");
});

function showBooks() {
    let catroona = '';

    for (let i = 0; i < arrBooks.length; i++) {
        catroona += `
            <tr>
                <td class="align-middle"> ${i + 1} </td>
                <td class="align-middle text-truncate"> ${arrBooks[i].bookName} </td>
                <td class="align-middle">
                    <button class="btn btn-visit btn-secondary btn-sm py-1 visit-btn" data-url="${arrBooks[i].bookUrl}">
                        <i class="fa-solid fa-eye pe-1 pe-md-2"></i>Visit
                    </button>
                </td>
                <td class="align-middle">
                    <button class="btn btn-delete btn-danger btn-sm py-1" onclick="deleteBook(${i})">
                        <i class="fa-solid fa-trash-can pe-1 pe-md-2"></i>Delete
                    </button>
                </td>
            </tr>
        `;
    }

    tableContent.innerHTML = catroona;

    const visitButtons = document.querySelectorAll('.visit-btn');
    visitButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            let url = this.getAttribute('data-url');
            window.open(url, '_blank');
        });
    });
}


function deleteBook(index){
    arrBooks.splice(index, 1);
    localStorage.setItem("books",JSON.stringify(arrBooks));
    clearForm();
    showBooks();
}