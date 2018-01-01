firebase
  .database()
  .ref("children")
  .once("value")
    .then(function (snapshot) {
        var list = document.querySelector("#childList");
        snapshot.val().forEach(element => {
            var listElement = document.createElement('li');
            listElement.id = `${ element.id }`;
            listElement.textContent = `${element.name} ${element.surname}`;
            list.appendChild(listElement);
        });
  });
