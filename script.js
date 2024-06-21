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
            this.adStyle = adStyle; //determines length/width, x button size, etc.
            //for location of ads (absolute positioning)
            this.left = x;
            this.top = y;
        }
        clicked() {
            //create an ad when clicked (not x button)

        }
    }

    //ad text options
    const adText = ['Buy Now!', 'Click Me!', 'Free Money', 'Send Help, there is an intruder...', 'Women in the area', 'Dogs in the area', 'Free Ram Upgrades', 'Hotel Travel!!!', '90% Discount', 'Tap Me :) or else...', ':))))))'];

    //ad style option: 5 variations (objects)
    const adStyles = ['normal', 'big', 'small' ,'short', 'long'];
    //necessary to find rem value
    const rootCompStyles = window.getComputedStyle(document.querySelector('html'));
    const rem = rootCompStyles.fontSize.replace(/\D/g, '');
    //necessary to obtain values from css variables
    const adContainerCompStyles = window.getComputedStyle(adContainer);
    //returns computed width and heights of corresponding ad style
    //calculates rem to pixels :)
    //replace(...), removes all non digits like 'px'
    const adWidthStyle = {
        short: adContainerCompStyles.getPropertyValue('--short-width').replace(/\D/g, ''),
        medium: adContainerCompStyles.getPropertyValue('--medium-width').replace(/\D/g, ''),
        long: adContainerCompStyles.getPropertyValue('--long-width').replace(/\D/g, ''),
    }
    function getWidth(style) {
        switch(style) {
            // +4 to account for the borders (2px both sides)
            case 'normal':
            case 'short': 
            case 'long': return adWidthStyle.medium * rem + 4;
            case 'big': return adWidthStyle.long * rem + 4;
            case 'small': return adWidthStyle.short * rem + 4;
            default: console.log('bruh that is not a style');
        }
    }
    const adHeightStyle = {
        short: adContainerCompStyles.getPropertyValue('--short-height').replace(/\D/g, ''),
        medium: adContainerCompStyles.getPropertyValue('--medium-height').replace(/\D/g, ''),
        long: adContainerCompStyles.getPropertyValue('--long-height').replace(/\D/g, ''),
    }
    function getHeight(style) {      
        switch(style) {
            // +4 to account for the borders (2px both sides)
            case 'normal': return adHeightStyle.medium * rem + 4;
            case 'big': 
            case 'long': return adHeightStyle.long * rem + 4;
            case 'small':
            case 'short': return adHeightStyle.short * rem + 4;
            default: console.log('bruh that is not a style');
        }
    }

    //randomly creates the ad object, pushes it to the ads array
    function buildRandomAd() {
        let x = randomAdStyle();
        addToAds(new ad(randomText(), randomColor(), x, randomLeft(x), randomTop(x)));
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
    //will account for different style width & heights to avoid going out of border
    const gameWidth = adContainerCompStyles.width.replace(/\D/g, '');
    const gameHeight = adContainerCompStyles.height.replace(/\D/g, '');
    function randomLeft(style) {
        console.log('width: ' + getWidth(style));
        return Math.max(0, randomMax(gameWidth - getWidth(style)));
    }
    function randomTop(style) {
        console.log('height:' + getWidth(style));
        return Math.max(0, randomMax(gameHeight - getHeight(style)));
    }

    //puts ad objects inside the ads array
    function addToAds(adObject) {
        ads.push(adObject);
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
    buildRandomAd();
    buildRandomAd();
    console.log(ads);
})();



