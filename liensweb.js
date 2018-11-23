/* 
Activité 1
*/

// Liste des liens Web à afficher. Un lien est défini par :
// - son titre
// - son URL
// - son auteur (la personne qui l'a publié)
var listeLiens = [
    {
        titre: "So Foot",
        url: "http://sofoot.com",
        auteur: "yann.usaille"
    },
    {
        titre: "Guide d'autodéfense numérique",
        url: "http://guide.boum.org",
        auteur: "paulochon"
    },
    {
        titre: "L'encyclopédie en ligne Wikipedia",
        url: "http://Wikipedia.org",
        auteur: "annie.zette"
    }
];

// TODO : compléter ce fichier pour ajouter les liens à la page web


listeLiens.forEach(function (listeLiens) {// Boucle pour chaque item
    
    var containerElt = document.createElement("div"); // Construction du container

    var lienElt = document.createElement("a"); // Construction du lien
    lienElt.href = listeLiens.url // Ajout du lien en paramètre "href"
    lienElt.style.textDecoration = "none"; // Style du lien
    lienElt.style.color = "black"; // Style du lien

    var titreElt = document.createElement("h2"); // Construction du titre pour le <h2>
    titreElt.textContent = listeLiens.titre; // Définition du contenu du titre
    titreElt.style.color = "#428bca"; // Style du titre
    titreElt.style.display = "inline"; // Style du titre
    titreElt.style.paddingRight = "15px"; // Style du titre

    var urlElt = document.createElement("span"); // Construction de la <span> pour l'url
    urlElt.textContent = listeLiens.url; // Définition du contenu de la <span>

    var auteurElt = document.createElement("p");// Construction de du <p> pour l'auteur
    var intro = "Ajouté par " // Création d'une variable pour stocker du texte à ajouter plus loin
    auteurElt.textContent =  intro + listeLiens.auteur; // Définition du contenu du <p> en ajoutant les deux variables

    lienElt.appendChild(titreElt); // Ajout du titre <h2> au lien <a> pour le rendre clicable
    lienElt.appendChild(urlElt); // Ajout de l'url <span> au lien <a> pour le rendre clicable
    containerElt.appendChild(lienElt); // Ajout du lien <a> au container
    containerElt.appendChild(auteurElt); // Ajout de l'auteur <p> au container
    document.getElementById("contenu").appendChild(containerElt); // Ajout du container à la div qui à l'id "contenu"

    containerElt.classList.add("lien");// Ajout de la class au container à la fin de la boucle car la variable containerElt n'existe pas en dehors de la boucle
});




