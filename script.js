// console.log("running");
let list = $("list");
let form = document.getElementById("form");
let elements = document.getElementById("elements");
let temp = [];
let type = "";
let em = "";
let count = 1;
const obj = {};
let error = "";
let vali;
let x;

// list.addEventListener("dragstart", (e) => {
//   console.log("grag start");
// });

function dragstart(e, typ, plachold, req, value) {
  //   console.log("drag started");
  type = typ;
  plchldr = plachold;
  requir = req;
  vali = value;
}

//dragover
function dragover(e) {
  //   console.log("drag over");
  e.preventDefault();
}

function drop(e) {
  //   console.log("dropped");

  ///creating div
  let newdiv = document.createElement("div");
  newdiv.id = count;
  newdiv.classList.add("newdiv");
  console.log(newdiv);

  //creating iputs
  let input = document.createElement("input");
  input.type = `${type}`;
  input.id = type + count;
  input.placeholder = `${plchldr}`;

  //creating break element
  let brek = document.createElement("br");

  //creating button element
  let button = document.createElement("button");
  button.innerText = "X";
  button.classList.add("red");
  //   button.id = count;

  //onClick delete
  button.onclick = () => del(newdiv?.id);
  //   console.log(input.id);
  //   alementarray.push(count);
  count++;

  //append to div
  newdiv.appendChild(input);
  newdiv.appendChild(button);
  newdiv.appendChild(brek);

  //assigning div to parent div
  form.appendChild(newdiv);
  //   console.log(form);
}

//delete element div
function del(val) {
  let divElement = document.getElementById(val);
  let inp = divElement.querySelector("input");
  delete obj[inp.id];
  x = "";
  document.getElementById("retrive").innerHTML = x;
  divElement.remove();
}

//submit function
function submit() {
  document.getElementById("retrive").innerHTML = "";
  for (let i = 1; i <= count; i++) {
    //creating elements
    let data = document.getElementById(i);
    if (data) {
      var inp = data.querySelector("input");
      if (inp.value != "") {
        if (validate(inp)) {
          let index = inp.id;
          let val = inp.value;
          //adding to object and
          if (val) {
            obj[index] = val;
            let a = JSON.stringify(obj);
            //storing data to local storage
            localStorage.setItem("dform", a);
            //getting the data back
            x = localStorage.getItem("dform");
            x = JSON.parse(x);
          }
        } else {
          alert(error);
        }
      } else {
        alert("empty " + inp.id);
      }
    }
  }
  //retriving data from local storage
  if (x) {
    let a = document.getElementById("retrive");
    let lable = document.createElement("h3");
    lable.innerHTML = "Data from Local Storage: ";
    a.appendChild(lable);
    for (ele in x) {
      let head = document.createElement("p");
      var pre = ele.split(/[0-9]/)[0];
      head.innerHTML = pre + ": " + x[ele];
      a.appendChild(head);
    }
  }
}

//form validation according to data types
function validate(data) {
  if (data.type === "text") {
    return true;
  } else if (data.type === "email") {
    if (validateEmail(data.value)) {
      //   console.log("valid email");
      return true;
    } else {
      error = "enter a valid email";
      return false;
    }
  } else if (data.type === "password") {
    let passw = /^[A-Za-z]\w{7,14}$/;
    if (data.value.match(passw)) {
      return true;
    } else {
      error =
        "password between 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter";
      return false;
    }
  } else if (data.type === "number") {
    return true;
  } else if (data.type === "tel") {
    return true;
  } else if (data.type === "color") {
    return true;
  } else if (data.type === "file") {
    return true;
  } else if (data.type === "range") {
    return true;
  } else {
    error = "reached to end with nothing to search";
  }
}

//validating email
const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
