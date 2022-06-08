const api = "http://localhost:61516/api/folders";

var curr = new Date();
var DateTime =
  curr.getFullYear() +
  "-" +
  curr.getMonth() +
  "-" +
  curr.getDay() +
  " " +
  curr.getHours() +
  ":" +
  curr.getMinutes() +
  ":" +
  curr.getSeconds();

var fname = document.getElementById("fname");
var create = document.getElementById("create");

var id = sessionStorage["id"];
console.log(id);

// function thisFileUpload() {
//   var x = document.getElementById("file").value;
//   console.log(x);
//   document.getElementById("file").click();
// }

function createFolder() {
  try {
    var request = {
      body: JSON.stringify({
        folderName: fname.value,
        createdBy: id,
        createdAt: curr.toISOString(),
        isDeleted: 0,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(api, request).then((folderCreateResponse) => {
      console.log(folderCreateResponse);
      listFolders();
    });
  } catch (err) {
    console.log(err);
  }
}

function listFolders() {
  try {
    var create = document.getElementById("mainn");
    create.innerHTML = "";
    fetch("http://localhost:61516/api/Folders/" + sessionStorage["id"], {
      method: "GET",
    })
      .then((response) => response.json())
      .then((folders) => {
        console.log(folders);
        folders.forEach((folder) => {
          var create = document.getElementById("mainn");

          var createChild = document.createElement("div");

          createChild.classList.add("abc2");
          const fold = folder.folderName;

          var div1 = document.createElement("div");

          div1.classList.add("abc");

          let con = "";

          con +=
            "<span onclick='openfile()' class='iconify' data-icon='bi:folder-fill' style='color: #3a86ff;' data-width='70'></span>";

          con += "<br/><p style='color:black'><b>";

          con += fold + "<b><p>";

          div1.innerHTML = con;

          var div2 = document.createElement("span");

          let con2 = "";
          con2 += `<span class='iconify' data-icon='ion:enter-outline' data-width='30' onclick='openfile(${folder.folderId})'>Open folder></span>&nbsp;`;

          con2 += `<span class='iconify' data-icon='fluent:delete-20-regular' data-width='30' onclick='deletefolder(${folder.folderId})'>Delete </span>`;

          div2.classList.add("btn123");

          div2.innerHTML = con2;

          createChild.appendChild(div1);

          createChild.appendChild(div2);

          create.append(createChild);
        });
      });
  } catch (err) {
    console.log(err);
  }  
}
function onLoad() {
  listFolders(); 
}

onLoad();

function openfile(folderId) {
  sessionStorage.setItem("folderId", folderId);
  window.location.href = "file.html";
}


function deletefolder(folder) {
  var raw = "";
  var requestOptions = {
    method: "DELETE",
    body: raw,
    redirect: "follow",
  };

  let deleteurl = "http://localhost:61516/api/Folders/" + folder;
  fetch(deleteurl, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  //location.reload();
}





function searchFolder() {
  try {
    var id1 = document.getElementById("write");

    if (id1.value == "") {
      location.reload();
    } else {
      var create = document.getElementById("mainn");
      create.innerHTML = "";
      fetch(
        "http://localhost:61516/api/Folders/" +
        sessionStorage.getItem("folderId") +
          "/" +
          id1.value,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((folders) => {
          console.log(folders);
          folders.forEach((folder) => {
            var create = document.getElementById("mainn");

            var createChild = document.createElement("div");

            createChild.classList.add("abc2");
            const fold = folder.folderName;
            
            var div1 = document.createElement("div");

            // div1.classList.add("abc");

            let con = "";

            con +=
              `<span class='iconify' data-icon='bi:folder-fill' style='color: #3a86ff;' data-width='70' onclick='openfile(${folder.folderId})'></span>`;

            con += "<br/><p style='color:black'><b>";

            con += fold + "<b><p>";

            div1.innerHTML = con;

            var div2 = document.createElement("span");

            let con2 = "";

            con2 += `<button  onclick='openfile(${folder.folderId})'>Open folder</button>&nbsp;`;

            con2 += `<button onclick='deletefolder(${folder.folderId})' >Delete</button>`;
            // div2.classList.add("btn123");

            div2.innerHTML = con2;
            // div.innerHTML = folder.fName;

            createChild.appendChild(div1);

            createChild.appendChild(div2);

            create.append(createChild);
          });
        });
    }
  } catch (err) {
    console.log(err);
  }
}

function logout() {
  sessionStorage.clear();
  window.location.href = "Sign_In.html";
}