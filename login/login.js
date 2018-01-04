function onDisconnect() {
  var connectedRef = firebase.database().ref(".info/connected");
  connectedRef.on("value", function(snap) {
    if (snap.val() === true) {
      alert("connected");
    } else {
      alert("not connected");
    }
  });
}

function highlight() {
  $(".form").find("input, textarea").on("keyup blur focus", function(e) {
    var $this = $(this), label = $this.prev("label");
    if (e.type === "keyup") {
      if ($this.val() === "") {
        label.removeClass("active highlight");
      } else {
        label.addClass("active highlight");
      }
    } else if (e.type === "blur") {
      if ($this.val() === "") {
        label.removeClass("active highlight");
      } else {
        label.removeClass("highlight");
      }
    } else if (e.type === "focus") {
      if ($this.val() === "") {
        label.removeClass("highlight");
      } else if ($this.val() !== "") {
        label.addClass("highlight");
      }
    }
  });

  $(".tab a").on("click", function(e) {
    e.preventDefault();

    $(this).parent().addClass("active");
    $(this).parent().siblings().removeClass("active");

    target = $(this).attr("href");

    $(".tab-content > div").not(target).hide();

    $(target).fadeIn(600);
  });
}

function events() {
  document.querySelector("#logintoapp").addEventListener("click", function(e) {
    if (firebase.auth().currentUser) {
      // [START signout]
      firebase.auth().signOut();

      // [END signout]
    } else {
      login();
    }
  });

  document.querySelector("#signuptoapp").addEventListener("click", function(e) {
    signup();
  });
}

function login() {
  var user = document.querySelector("#loginusertoapp").value;
  var password = document.querySelector("#loginpasswordtoapp").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(user, password)
    .then(function() {
      changeToPage();
    })
    .catch(function(error) {
      console.log(error.code);
      console.log(error.message);
    });
}

function signup() {
  var user = document.querySelector("#signupusertoapp").value;
  var password = document.querySelector("#signuppasswordtoapp").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(user, password)
    .then(function() {
      changeToPage();
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      debugger;
    });
}

function changeToPage() {
  firebase.auth().onAuthStateChanged(function(userLogged) {
    if (userLogged) {
      // User is signed in.
      var displayName = userLogged.displayName;
      var email = userLogged.email;
      var emailVerified = userLogged.emailVerified;
      var photoURL = userLogged.photoURL;
      var isAnonymous = userLogged.isAnonymous;
      var uid = userLogged.uid;
      var providerData = userLogged.providerData;
      // ...
      window.location = "../index.html";
    } else {
      // User is signed out.
      // ...
    }
  });
}

function onLoad() {
  onDisconnect();
  events();
  highlight();
}

onLoad();
