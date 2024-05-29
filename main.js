
document.querySelector("#app").innerHTML = `
<div class="container py-2">
    <div class="col my-3">
      <div class="card border border-secondary rounded p-1">
        <div class="header-format col-md-12">
          <h1 class="first-heading">POST Data To Local Database by Local Server</h1>
        </div>
        <form class="card-body py-2">
          <div id="validation-alert-msg" class="alert alert-danger validation-msg" role="alert">
            You must be provide valid username and Email ..!
            <button type="button" class="close" id="close-alert-btn">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="row">
            <div class="form-group col-md-6">
              <label for="user-name">Your Name</label>
              <input type="text" class="form-control text-capitalize" id="user-name">
              <small id="nameHelp" class="form-text text-muted">You must give your name.</small>
            </div>
            <div class="form-group col-md-6">
              <label for="user-email">Email address</label>
              <input type="email" class="form-control text-lowercase" id="user-email" aria-describedby="emailHelp">
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="px-3 py-1">
              <button type="submit" class="btn btn-info btn-post" id="btn-post">Add Data</button>
              <button type="submit" class="btn btn-primary btn-post-update ml-3" id="btn-post-update">Update
                Data</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="col result-box mb-3">
      <div class="header header-format">
        <h1 class="border-bottom">Collected Data From Local Database</h1>
        
      <!--<button class="btn btn-light my-1" id="btn-refresh">Refresh</button>-->
      <form class="col-4 p-2 ml-auto" id="search__form">
      <input type="text" class="form-control" placeholder="Search Your Data...">
      </form>
        <ul id="list" class="list"></ul>
      </div>
    </div>
  </div>
  `;

// alert('$ npm run dev  " to run the server"');

let URL = "http://localhost:3000/products"; //local server api url


let ulList = document.getElementById("list");
let btnPost = document.getElementById("btn-post");
let btnPostUpdate = document.getElementById("btn-post-update");
let validationAlertMag = document.getElementById("validation-alert-msg");
let closeAlertBtn = document.getElementById("close-alert-btn");
let OrderChanger = document.getElementById("select-accending-deccending");

let Name = document.getElementById("user-name");
let Email = document.getElementById("user-email");
let validationAlertMagId;


let createListItem = (myData) => {
  myData.forEach((data) => {
    let li = document.createElement("li");
    li.className = "list-item";
    li.title = `${data.id} ${data.name}`;
    li.setAttribute("data-id", data.id);
    li.innerHTML = `
    <div class="data__section">
       <div class="data__id">
          <span class="heading">Id : </span><span id="data-id">${data.id}</span>
       </div>
       <div class="data__name">
          <span class="heading">Name : </span><span id="data-name">${data.name}</span>
       </div>
       <div class="data__email">
           <span class="heading">E-mail : </span><span id="data-email">${data.email}</span>
       </div>
    </div>
    <div class="data__action-btns"style="display:flex">
       <button title="Edit your data" class="btn btn-info px-3 mr-2" id="btn-edit">Edit</button>
       <button title="Delete your data" class="btn btn-danger px-2" id="btn-delete">Delete</button>
    </div>`;

    ulList.prepend(li);
  });
};

// Get Data From API
// GET : MATHOD
let getData = async function (URL) {
  let myObject = await fetch(URL);
  let myData = await myObject.json();

  // console.log(myData)
  createListItem(myData);
};

// POST Data To API
// POST : MATHOD

btnPost.addEventListener("click", function (e) {
  e.preventDefault();
  Name.value.toLowerCase();
  Email.value.toLowerCase();

  if (!Name.value || !Email.value) {
    clearTimeout(validationAlertMagId);
    validationAlertMagId = setTimeout(() => {
      validationAlertMag.style.display = "none";
    }, 5000);
    validationAlertMag.style.display = "block";
    // alert("Enter your name and your email.");
  } else {
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name: Name.value,
        email: Email.value,
      }),
    })
      .then((res) => res.json())
      .then(() => location.reload());
  }
});

ulList.addEventListener("click", (event) => {
  event.preventDefault();
  //console.log(event.target.parentElement.parentElement.dataset.id);
  const pressedDeleteBtn = event.target.id === "btn-delete";
  const pressedEditBtn = event.target.id === "btn-edit";
  let ID = event.target.parentElement.parentElement.dataset.id;

  if (pressedDeleteBtn) {
    // Delete Data From API
    // MATHOD : DELETE
    if (confirm("ARE YOU SURE TO DELETE THIS DATA.?")) {
      fetch(`${URL}/${ID}`, {
        method: "DELETE",
      });
    }
  }

  if (pressedEditBtn) {
    let nameValue =
      event.target.parentElement.parentElement.querySelector(
        "#data-name"
      ).innerText;
    let emailValue =
      event.target.parentElement.parentElement.querySelector(
        "#data-email"
      ).innerText;
    Name.value = nameValue;
    Email.value = emailValue;

    nameValue.toLowerCase();
    emailValue.toLowerCase();
    btnPost.classList.add("disabled");
    btnPost.disabled = "true";
    btnPostUpdate.classList.add("show");

    // console.log(nameValue, emailValue);

    // Edit Data From API
    // MATHOD : PATCH
    const editData = (URL, ID, NameValue, EmailValue) => {
      fetch(`${URL}/${ID}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: NameValue,
          email: EmailValue,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then(() => location.reload());
    };

    btnPostUpdate.addEventListener("click", function (e) {
      e.preventDefault();

      if (Name.value && Email.value) {
        editData(URL, ID, Name.value, Email.value);
      } else {
        editData(URL, ID, nameValue, emailValue);
      }
    });
  }
});

// refresh the data list
// document.getElementById("btn-refresh").addEventListener("click", (e) => {
//   e.preventDefault();
//   location.reload();
// });

// close the validation alert message
document.getElementById("close-alert-btn").addEventListener("click", (e) => {
  e.preventDefault();
  validationAlertMag.style.display = "none";
  clearTimeout(validationAlertMagId);
});

document.getElementById("search__form").addEventListener("input", (e) => {
  let LI = Array.from(document.querySelectorAll(".list .list-item"));
  let Target = e.target;

  LI.forEach((list) => {
    if (list.querySelector(".data__section").innerText.toLowerCase().indexOf(Target.value.toLowerCase()) > -1) {
      list.classList.remove("hide");
    } else {
      list.classList.add("hide");
    }
  });
});

getData(URL);
