// Crée et renvoie un élément DOM affichant les données d'un lien
// Le paramètre lien est un objet JS représentant un lien
function creerElementLien(lien) {
  var titreElt = document.createElement("a");
  titreElt.href = lien.url;
  titreElt.style.color = "#428bca";
  titreElt.style.textDecoration = "none";
  titreElt.style.marginRight = "5px";
  titreElt.appendChild(document.createTextNode(lien.titre));

  var urlElt = document.createElement("span");
  urlElt.appendChild(document.createTextNode(lien.url));

  // Cette ligne contient le titre et l'URL du lien
  var ligneTitreElt = document.createElement("h4");
  ligneTitreElt.style.margin = "0px";
  ligneTitreElt.appendChild(titreElt);
  ligneTitreElt.appendChild(urlElt);

  // Cette ligne contient l'auteur
  var ligneDetailsElt = document.createElement("span");
  ligneDetailsElt.appendChild(document.createTextNode("Ajouté par " + lien.auteur));

  var divLienElt = document.createElement("div");
  divLienElt.classList.add("lien");
  divLienElt.appendChild(ligneTitreElt);
  divLienElt.appendChild(ligneDetailsElt);

  return divLienElt;
}

var contenuElt = document.getElementById("contenu");
ajaxGet("https://oc-jswebsrv.herokuapp.com/api/liens", function (lien) {
  // Parcours de la liste des liens et ajout d'un élément au DOM pour chaque lien
  var listeLiens = JSON.parse(lien);
  listeLiens.forEach(function (lien) {
    var lienElt = creerElementLien(lien);
    contenuElt.appendChild(lienElt);
  });
});

// Créer un élément DOM de type input
function creerElementInput(placeholder, taille) {
  var inputElt = document.createElement("input");
  inputElt.type = "text";
  inputElt.setAttribute("placeholder", placeholder);
  inputElt.setAttribute("size", taille);
  inputElt.setAttribute("required", "true");
  return inputElt;
}

var ajouterLienElt = document.getElementById("ajoutLien");

// Gère l'ajout d'un nouveau lien
ajouterLienElt.addEventListener("click", function () {
  var auteurElt = creerElementInput("Entrez votre nom", 20);
  var titreElt = creerElementInput("Entrez le titre du lien", 40);
  var urlElt = creerElementInput("Entrez l'URL du lien", 40);

  var ajoutElt = document.createElement("input");
  ajoutElt.type = "Submit";
  ajoutElt.value = "Ajouter";

  var formAjoutElt = document.createElement("form");
  formAjoutElt.appendChild(auteurElt);
  formAjoutElt.appendChild(titreElt);
  formAjoutElt.appendChild(urlElt);
  formAjoutElt.appendChild(ajoutElt);

  var p = document.querySelector("p");

  // Remplace le bouton d'ajout par le formulaire d'ajout
  p.replaceChild(formAjoutElt, ajouterLienElt);

  //ajoute le nouveau lien
  formAjoutElt.addEventListener("submit", function (e) {
    e.preventDefault();
    var url = urlElt.value;

    // Si l'URL ne commence ni par "http://" ni par "https://"
    if ((url.indexOf("http://") !== 0) && (url.indexOf("https://") !== 0)) {
      // On la préfixe par "http://"
      url = "http://" + url;
    }
    // Création de l'objet contenant les données du nouveau lien
    var lien = {
      titre: titreElt.value,
      url: url,
      auteur: auteurElt.value
    };

    ajaxPost("https://oc-jswebsrv.herokuapp.com/api/lien", lien, function () {
      var lienElt = creerElementLien(lien);
      // Ajoute le nouveau lien en haut de la liste
      contenuElt.insertBefore(lienElt, contenuElt.firstChild);

      // Création du message d'information
      var infoElt = document.createElement("div");
      infoElt.classList.add("info");
      infoElt.textContent = "Le lien \"" + lien.titre + "\" a bien été ajouté.";
      p.insertBefore(infoElt, ajouterLienElt);
      // Suppresion du message après 2 secondes
      setTimeout(function () {
        p.removeChild(infoElt);
      }, 2000);
    }, true);

    // Remplace le formulaire d'ajout par le bouton d'ajout
    p.replaceChild(ajouterLienElt, formAjoutElt);

  });
});