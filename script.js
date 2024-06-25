const game = (() => {
    //reference to ad container
    const adContainer = document.querySelector('.ad-container');
    //array that holds all ad objects
    const ads = [];
    //tracks objectives completed
    let score = 0;
    //default interval of ad creation in milliseconds
    const defaultInterval = 5000;
    //tracks difficulty multiplier (less time per ad creation)
    //do not let value go equal/higher than defaultInterval if you do not want to create lag
    let difficulty = 0;

    //ad logic

    class ad {
        constructor(text, color, adStyle, x, y) {
            this.text = text;
            this.color = color;
            this.adStyle = adStyle; //determines length/width, x button size, etc.
            //for location of ads (absolute positioning)
            this.left = x;
            this.top = y;
        }
    }

    //ad text options
    const adText = ['Buy Now!', 'Click Me!', 'Free Money', 'Send Help, intruder...', 'Women in the area', 'Dogs in the area', 'Free Ram Upgrades', 'Hotel Travel!!!', '90% Discount', 'Tap Me :) or else...', ':))))))'];

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
            default: return 0;
        }
    }

    //randomly creates the ad object, pushes it to the ads array
    function buildRandomAd() {
        const x = randomAdStyle();
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
    const gameWidth = window.innerWidth;
    const gameHeight = window.innerHeight;
    function randomLeft(style) {
        return randomMax(gameWidth - getWidth(style));
    }
    function randomTop(style) {
        return randomMax(gameHeight - getHeight(style));
    }

    //puts ad objects inside the ads array
    function addToAds(adObject) {
        if(ads.length > 50) {
            console.log('max ad quantity reached');
            return 0;
        }
        ads.push(adObject);
    }
    //removes ad object inside ads array
    function removeFromAds(index) {
        ads.splice(index, 1);
    }

    //objective logic

    //array that holds all objectives objects
    const objectives = [];

    class objective {
        constructor(color, top, left) {
            this.color = color;
            this.top = top;
            this.left = left;
        }
    }

    function addToObjectives(objectiveObject) {
        objectives.push(objectiveObject);
    }

    function buildRandomObjective() {
        addToObjectives(new objective())
    }

    function clearGame() {
        adContainer.innerHTML = ''; //remove existing generated html
    }
    //iterates through ads and objectives arrays to creates visuals
    function renderAll() {
        clearGame();
        for(let i = 0; i < ads.length; i++) {
            const currentAd = ads[i];
            const container = document.createElement('div');
            container.classList.add('ad', currentAd.adStyle);
            container.dataset.index = i; //note: i is represented as a string in the html
            container.style.backgroundColor = currentAd.color;
            container.style.left = `${currentAd.left}px`;
            container.style.top = `${currentAd.top}px`;

            const top = document.createElement('div');
            const middle = document.createElement('div');
            const bottom = document.createElement('div');
            top.classList.add('top');
            middle.classList.add('middle');  
            bottom.classList.add('bottom');

            const xBtn = document.createElement('button');
            xBtn.textContent = 'X';
            xBtn.classList.add('x-btn');
            const text = document.createElement('p');
            text.textContent = `${ads[i].text}`
            const moreBtn = document.createElement('button');
            moreBtn.textContent = 'CLICK NOW';

            adContainer.appendChild(container);
            container.append(top, middle, bottom);
            top.appendChild(xBtn);
            middle.appendChild(text);
            bottom.appendChild(moreBtn);
        }
        //remove later
        console.log(ads);
    }

    //event delegation to detect buttons
    adContainer.addEventListener('click', (e) => {
        const clicked = e.target;
        //if the x button is clicked
        if(clicked.nodeName == 'BUTTON' && clicked.classList.contains('x-btn')) {
            const index = clicked.parentNode.parentNode.dataset.index;
            removeFromAds(index);
            renderAll();
        //if anything within the ad other than x is clicked
        } else if(clicked.closest('.ad')) {
            buildRandomAd();
            buildRandomAd();
            renderAll();
        }
    });

    //interval used to control ad intervals
    let interval = null;
    function startInterval() {
        interval = setInterval(function() {
            buildRandomAd();
            renderAll();
        }, defaultInterval - difficulty);
    }
    //stops interval
    function endInterval() {
        clearInterval(interval);
        interval = null;
    }

    buildRandomAd();
    buildRandomAd();
    buildRandomAd();
    renderAll();
    startInterval();
    console.log(ads);

})();

//To do: add gameplay loop, maybe a health bar / ad generation timer / score interface
