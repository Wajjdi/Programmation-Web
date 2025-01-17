class Cookie {
  static urlsImagesNormales = [
    "./assets/images/Croissant@2x.png",
    "./assets/images/Cupcake@2x.png",
    "./assets/images/Danish@2x.png",
    "./assets/images/Donut@2x.png",
    "./assets/images/Macaroon@2x.png",
    "./assets/images/SugarCookie@2x.png",
  ];
  static urlsImagesSurlignees = [
    "./assets/images/Croissant-Highlighted@2x.png",
    "./assets/images/Cupcake-Highlighted@2x.png",
    "./assets/images/Danish-Highlighted@2x.png",
    "./assets/images/Donut-Highlighted@2x.png",
    "./assets/images/Macaroon-Highlighted@2x.png",
    "./assets/images/SugarCookie-Highlighted@2x.png",
  ];

  constructor(type, ligne, colonne) {
    // A FAIRE
    this.type=type;
    this.ligne=ligne;
    this.colonne=colonne;
    this.marque= 0;
    this.htmlImage = document.createElement("img");
    this.htmlImage.src= Cookie.urlsImagesNormales[this.type];
    this.htmlImage.width=80; 
    this.htmlImage.height=80;
    this.htmlImage.dataset.colonne=colonne; 
    this.htmlImage.dataset.ligne=ligne;
    this.htmlImage.classList.add("cookies");
  }

  selectionnee() {
    // on change l'image et la classe CSS
    this.htmlImage.classList.add("cookies-selected"); 
    this.htmlImage.src= Cookie.urlsImagesSurlignees[this.type]; 
   
  }

  deselectionnee() {
    // on change l'image et la classe CSS
    this.htmlImage.classList.remove("cookies-selected");
    this.htmlImage.src= Cookie.urlsImagesNormales[this.type];
  }

  static swapCookies(c1, c2) {
    console.log("SWAP C1 ligne= "+ c1.ligne+ " colonne = "+c1.colonne +" C2 ligne= "+ c2.ligne+ " colonne = "+c2.colonne);
    // On échange leurs images et types
  let tmptype = c1.type;
  let tmpimage = c1.htmlImage.src;

  c1.type=c2.type;
  c1.htmlImage.src=c2.htmlImage.src;

  c2.type=tmptype;
  c2.htmlImage.src=tmpimage;
    // et on remet les désélectionne
    c1.deselectionnee();
    c2.deselectionnee();
  }

  /** renvoie la distance entre deux cookies */
  static distance(cookie1, cookie2) {
    let l1 = cookie1.ligne;
    let c1 = cookie1.colonne;
    let l2 = cookie2.ligne;
    let c2 = cookie2.colonne;

    const distance = Math.sqrt((c2 - c1) * (c2 - c1) + (l2 - l1) * (l2 - l1));
    console.log("Distance = " + distance);
    return distance;
  }
}
