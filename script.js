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

    //creates the ad object, pushes it to the ads array
    function buildAd(text, adStyle) {
        //other attribute will be randomly generated
        function randomColor() {

        }
    }

    //puts ad objects inside the ads array
    function addToAds(adObject) {

    }
    //removes ad object inside ads array
    function removeFromAds(index) {

    }

    //iterates through ads array & creates visuals
    function createAds(adsArray) {

    }

    //will use event delegation to detect buttons
    adContainer.addEventListener('click', (e) => {
        console.log(e.target);
    });

})();



