function start() {
  firebase.auth().onAuthStateChanged(function(userLogged) {
    console.log(firebase.auth().currentUser.email);
  });
}

function getDatabaseList() {
  firebase.database().ref("children").once("value").then(function(snapshot) {
    var list = document.querySelector("#childList");
    snapshot.val().forEach(element => {
      var listElement = document.createElement("li");
      listElement.id = `${element.id}`;
      listElement.textContent = `${element.name} ${element.surname}`;
      list.appendChild(listElement);
    });
  });
}

function disconnect() {
  document.querySelector("#disconnect").addEventListener("click", function() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        alert(`You have signed out succesfully`);
        window.location = "login/login.html";
      })
      .catch(function(error) {
        alert("You could not signed out. Please, try again");
      });
  });
}

function onLoad() {
  start();
  getDatabaseList();
  disconnect();
}

onLoad();
