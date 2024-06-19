const game = (() => {
    //reference to ad container
    const adContainer = document.querySelector('.ad-container');
    //array that holds all ad objects
    const ads = [];
    //tracks ads removed
    let score = 0;

    class ad {
        constructor(text, color, adStyle, x, y) {
            this.text = text;
            this.color = color;
            this.adStyle = adStyle; //like length/width, x button size, etc.
            //for location of ads (absolute positioning)
            this.left = x;
            this.top = y;
        }
        clicked() {
            //create more ads when clicked (not x button)

        }
    }

    //ad text options: 10 variations
    const adText = ['Buy Now!', 'Click Me!', 'Free Money', 'Send Help pls, there is an armed intruder...', 'Women in the area', 'Dogs in the area', 'Free Ram Upgrades', 'Hotel Travel!!!', '90% Discount', 'Tap Me :) or else...'];
    //ad style option: 5 variations
    const adStyles = ['normal'];

    //randomly creates the ad object, pushes it to the ads array
    function buildRandomAd() {
        console.log(randomText());
        console.log(randomColor());
        console.log(randomAdStyle());
    }

    //randomly chooses attributes
    //picks a random number within the given max value
    function randomMax(max) {
        return Math.floor(Math.random() * max);
    }
    function randomText() {
        //based on adText array length, automatically updates range
        return adText[randomMax(adText.length)];
    }
    function randomColor() {
        //return rgb values
        return `rgb(${randomMax(255)}, ${randomMax(255)}, ${randomMax(255)})`;
    }
    function randomAdStyle() {
        return adStyles[randomMax(adStyles.length)];
    }
    //for top and left properties (position: absolute)
    function randomLeft() {

    }
    function randomTop() {

    }

    //puts ad objects inside the ads array
    function addToAds(adObject) {

    }
    //removes ad object inside ads array
    function removeFromAds(index) {

    }

    //iterates through ads array & creates visuals
    function renderAds(adsArray) {

    }

    //will use event delegation to detect buttons
    adContainer.addEventListener('click', (e) => {
        console.log(e.target);
    });

    buildRandomAd();

})();



