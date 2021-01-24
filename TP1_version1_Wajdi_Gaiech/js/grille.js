/* Classe principale du jeu, c'est une grille de cookies. Le jeu se joue comme
Candy Crush Saga etc... c'est un match-3 game... */
class Grille {
  cookiesCliquees = [];
  constructor(l, c) {
    this.nbLignes = l;
    this.nbColonnes = c;
    this.remplirTableauDeCookies(6); // remplie le tableau
  }

  /**
   * parcours la liste des divs de la grille et affiche les images des cookies
   * correspondant à chaque case. Au passage, à chaque image on va ajouter des
   * écouteurs de click et de drag'n'drop pour pouvoir interagir avec elles
   * et implémenter la logique du jeu.
   */
  showCookies() {
    let caseDivs = document.querySelectorAll("#grille div");

    caseDivs.forEach((div, index) => {
      let ligne = Math.floor(index / this.nbLignes);
      let colonne = index % this.nbColonnes;

      console.log("On remplit le div index=" + index + " l=" + ligne + " col=" + colonne);

      let img = this.tabCookies[ligne][colonne].htmlImage;
      // Pour le clique sur les cookie
      img.onclick = (evt) => {

        let img = evt.target;
        let l = img.dataset.ligne;
        let c = img.dataset.colonne;
        let cookieClike = this.tabCookies[l][c];
        console.log("marque =" + cookieClike.marque);
        console.log("ligne = " + l + " colonne = " + c + "type = " + cookieClike.type);
        if (this.cookiesCliquees.length === 0) {// premiere selectionner
          this.cookiesCliquees.push(cookieClike);
          cookieClike.selectionnee();
        } else if (this.cookiesCliquees.length === 1) {// 2eme selectionne
          if (!this.cookiesCliquees.includes(cookieClike)) { // si c'est pas le meme cookies
            this.cookiesCliquees.push(cookieClike);
            cookieClike.selectionnee();

            // test de la distance
            if (Cookie.distance(this.cookiesCliquees[0], this.cookiesCliquees[1]) === 1) {
              // swap des cookies
              Cookie.swapCookies(this.cookiesCliquees[0], this.cookiesCliquees[1]);
              //this.resetmarque();
            }
            this.cookiesCliquees[0].deselectionnee();
            this.cookiesCliquees[1].deselectionnee();
            this.cookiesCliquees = [];
          }
          else {
            cookieClike.deselectionnee();
            this.cookiesCliquees = []; // vider le tableau de cookie
          }
        }



      };

      //--------pour le drag n drop---------//
      //--- Le drag ---//
      img.ondragstart = (evt) => {
        console.log("dragsStart");
        let imgDrag = evt.target;
        let l = imgDrag.dataset.ligne;
        let c = imgDrag.dataset.colonne;
        let cookieDrag = this.tabCookies[l][c];
        console.log("Drag ligne = " + l + " colonne = " + c + " type = " + cookieDrag.type);
        this.cookiesCliquees = [];
        this.cookiesCliquees.push(cookieDrag);
        cookieDrag.selectionnee();
      }

      img.ondragover = (evt) => {
        evt.preventDefault();
      }

      img.ondragenter = (evt) => {
        console.log("ondragenter");

      }
      img.ondragleave = (evt) => {
        console.log("ondragleave");
      }

      img.ondrop = (evt) => {
        console.log("ondrop");
        let imgDrop = evt.target;
        let l = imgDrop.dataset.ligne;
        let c = imgDrop.dataset.colonne;
        let cookieDrop = this.tabCookies[l][c];
        this.cookiesCliquees.push(cookieDrop);
        if (Cookie.distance(this.cookiesCliquees[0], this.cookiesCliquees[1]) === 1) {
          console.log("swap");
          Cookie.swapCookies(this.cookiesCliquees[0], this.cookiesCliquees[1]);
          //this.resetmarque();
        }
        this.cookiesCliquees[0].deselectionnee();
        this.cookiesCliquees[1].deselectionnee();
        this.cookiesCliquees = [];
      }
      // bouton pour faire afficher les alignement
      let btn = document.querySelector("#groupe");
      btn.onclick = () => {
        this.detecterAlignement();
        this.groupeAlignement();
        this.vider();
        for (let l = 0; l < this.nbLignes; l++) {
          this.chute_de_cookie();
        }
        // si vous voulez faire tout sur un seul bouton enlever le commentaire ci-dessous
        // this.nouveau_cookie();
      }

      // on affiche l'image dans le div pour la faire apparaitre à l'écran.
      div.appendChild(img);

    });
  }


  detecterAlignement() {
    this.detecterMatch3Lignes();
    this.detecterMatch3Colonnes();
  }

  detecterMatch3Lignes() {
    for (let l = 0; l < this.nbLignes; l++) {
      for (let c = 0; c < this.nbColonnes; c++) {
        if (c + 2 < this.nbColonnes) {
          if (this.tabCookies[l][c].type == this.tabCookies[l][c + 1].type && this.tabCookies[l][c + 1].type == this.tabCookies[l][c + 2].type) {
            this.tabCookies[l][c].marque = 1;
            this.tabCookies[l][c + 1].marque = 1;
            this.tabCookies[l][c + 2].marque = 1;
            console.log("ligne = " + this.tabCookies[l][c].ligne + " " + this.tabCookies[l][c].colonne + " " + this.tabCookies[l][c + 1].colonne + " " + this.tabCookies[l][c + 2].colonne);
          }
        }
      }
    }
  }

  detecterMatch3Colonnes() {
    for (let c = 0; c < this.nbColonnes; c++) {
      for (let l = 0; l < this.nbLignes; l++) {
        if (l + 2 < this.nbLignes) {
          //if (this.tabCookies[l][c].marque == this.tabCookies[l + 1][c].marque && this.tabCookies[l][c].marque == this.tabCookies[l + 2][c].marque){
          if (this.tabCookies[l][c].type == this.tabCookies[l + 1][c].type && this.tabCookies[l + 1][c].type == this.tabCookies[l + 2][c].type) {
            this.tabCookies[l][c].marque = 1;
            this.tabCookies[l + 1][c].marque = 1;
            this.tabCookies[l + 2][c].marque = 1;
            console.log("colonne = " + this.tabCookies[l][c].colonne + " " + this.tabCookies[l][c].ligne + " " + this.tabCookies[l + 1][c].ligne + " " + this.tabCookies[l + 2][c].ligne);
          }

        }
      }
    }
  }

  vider() {
    for (let c = 0; c < this.nbColonnes; c++) {
      for (let l = 0; l < this.nbLignes; l++) {
        if (this.tabCookies[l][c].marque == 1) {
          //this.tabCookies[l][c].htmlImage.parentNode.removeChild(this.tabCookies[l][c].htmlImage);
          this.tabCookies[l][c].htmlImage.classList.add("cookie-invisible");
          //delete this.tabCookies[l][c];
        }
      }
    }
  }

  groupeAlignement() {
    for (let c = 0; c < this.nbColonnes; c++) {
      for (let l = 0; l < this.nbLignes; l++) {
        if (this.tabCookies[l][c].marque == 1) {
          this.tabCookies[l][c].selectionnee();
          console.log("je suis la");
        }
      }
    }
  }

  resetmarque() {
    for (let c = 0; c < this.nbColonnes; c++) {
      for (let l = 0; l < this.nbLignes; l++) {
        this.tabCookies[l][c].marque = 0;
        this.tabCookies[l][c].deselectionnee();
      }
    }
  }

  chute_de_cookie() {
    for (let c = this.nbLignes - 1; c >= 0; c--) {
      for (let l = this.nbColonnes - 1; l > 0; l--) {
        if (this.tabCookies[l][c].htmlImage.classList.contains("cookie-invisible") && this.tabCookies[l - 1][c].marque === 0) {
          this.tabCookies[l][c].deselectionnee();
          let tmpCookieType = this.tabCookies[l][c].type;
          let tmpCookieImage = this.tabCookies[l][c].htmlImage.src;
          let tmpCookieMarque = this.tabCookies[l][c].marque;

          this.tabCookies[l][c].type = this.tabCookies[l - 1][c].type;
          this.tabCookies[l][c].marque = this.tabCookies[l - 1][c].marque;
          this.tabCookies[l][c].htmlImage.src = this.tabCookies[l - 1][c].htmlImage.src;
          this.tabCookies[l][c].htmlImage.classList.remove("cookie-invisible");

          this.tabCookies[l - 1][c].type = tmpCookieType;
          this.tabCookies[l - 1][c].marque = tmpCookieMarque;
          this.tabCookies[l - 1][c].htmlImage.src = tmpCookieImage;
          this.tabCookies[l - 1][c].htmlImage.classList.add("cookie-invisible");
          this.tabCookies[l - 1][c].deselectionnee();

          console.log("chute");
        }
      }
    }
  }

  nouveau_cookie() {
    for (let l = 0; l < this.nbLignes; l++) {
      for (let c = 0; c < this.nbColonnes; c++) {
        if (this.tabCookies[l][c].marque === 1) {
          let type = Math.floor(Math.random() * 6); // retourne un random entre 0 et 5
          let cookie = new Cookie(type, l, c);
          this.tabCookies[l][c].type = cookie.type;
          this.tabCookies[l][c].marque = cookie.marque;
          this.tabCookies[l][c].htmlImage.src = cookie.htmlImage.src;
          this.tabCookies[l][c].htmlImage.classList.remove("cookie-invisible");
          this.tabCookies[l][c].deselectionnee();
        }
      }
    }
  }
  /**
   * Initialisation du niveau de départ. Le paramètre est le nombre de cookies différents
   * dans la grille. 4 types (4 couleurs) = facile de trouver des possibilités de faire
   * des groupes de 3. 5 = niveau moyen, 6 = niveau difficile
   *
   * Améliorations : 1) s'assurer que dans la grille générée il n'y a pas déjà de groupes
   * de trois. 2) S'assurer qu'il y a au moins 1 possibilité de faire un groupe de 3 sinon
   * on a perdu d'entrée. 3) réfléchir à des stratégies pour générer des niveaux plus ou moins
   * difficiles.
   *
   * On verra plus tard pour les améliorations...
   */
  remplirTableauDeCookies(nbDeCookiesDifferents) {
    // A FAIRE
    this.tabCookies = create2DArray(9);
    for (let l = 0; l < this.nbLignes; l++) {
      for (let c = 0; c < this.nbColonnes; c++) {
        console.log("J'ai crée une cookie ligne " + l + " Colonne " + c);
        let type = Math.floor(Math.random() * nbDeCookiesDifferents); // retourne un random entre 0 et 5
        if (l - 1 >= 0 && c - 1 >= 0) {
          while (type === this.tabCookies[l - 1][c].type || type === this.tabCookies[l][c - 1].type) {
            type = Math.floor(Math.random() * nbDeCookiesDifferents);
            console.log("Je passe dedans");
          }
        }
        let cookie = new Cookie(type, l, c);
        this.tabCookies[l][c] = cookie;
      }
    }
  }
}
