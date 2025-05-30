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
  if (inputName.value.length <= 3) {
    inputName.classList.add("not-valid");
  } else {
    inputName.classList.remove("not-valid");
    inputName.classList.add("valid");
    flage = true;
  }
  return flage;
}

function checkValueInUrl() {
  let flage = false;
  if (!inputUrl.value.endsWith(".com")) {
    inputUrl.classList.add("not-valid");
  } else {
    inputUrl.classList.remove("not-valid");
    inputUrl.classList.add("valid");
    flage = true;
  }
  return flage;
}

submit.addEventListener("click", function () {
  if (checkValueInUrl() && checkValueInName()) {
    addBooks();
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
            if (!url.startsWith('http')) {
                url = 'https://' + url;
            }
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