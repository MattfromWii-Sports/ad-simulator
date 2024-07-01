const game = (() => {
    //reference to ad container
    const adContainer = document.querySelector('.ad-container');
    //array that holds all ad objects
    let ads = [];
    //tracks objectives completed
    let score = 0;
    const scoreDiv = document.querySelector('.score');
    //tracks difficulty multiplier (lower value = less time per ad creation)
    //in milliseconds
    let difficulty = 2000;
    //for viewport width and height
    const gameWidth = window.innerWidth;
    const gameHeight = window.innerHeight;
    //to signify the game start
    let gameStart = false;

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
            case 'objective' : return objective.width + 4; //its already in pixels
            default: 0;
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
            case 'objective' : return objective.height + 4; //its already in pixels
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
            showEndScreen('YOU LOST!');
            return 0;
        }
        ads.push(adObject);
    }
    //removes ad object inside ads array
    function removeFromAds(index) {
        ads.splice(index, 1);
    }

    //objective logic

    const objective = {
        top: 150,
        left: 70,
        width: 0,
        height: 0,
    }
    function updateObjWidthHeight() {
        const objBtn = window.getComputedStyle(document.querySelector('.objective'));
        objective.width = parseInt(objBtn.width.replace(/\D/g, ''));
        objective.height = parseInt(objBtn.height.replace(/\D/g, ''));
    }
    //resets objective to default
    function resetObjective() {
        objective.top = 150;
        objective.left = 70;
    }

    //sets starting game elements
    function setGame() {
        renderAll();
        endInterval(); //just to be safe
        const p = document.createElement('p');
        p.classList.add('start');
        p.textContent = 'REACH 30 POINTS TO WIN';
        adContainer.appendChild(p);
    }
    //starts game
    function startGame() {
        //to get objective width & height for calculations
        updateObjWidthHeight(); //must be before renderAll to work
        startInterval();
    }
    function clearGame() {
        adContainer.innerHTML = ''; //remove existing generated html
    }
    //iterates through ads and objectives arrays to creates visuals
    function renderAll() {
        clearGame();
        //render ads
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
        console.log(ads, objective, score, difficulty);
        //render objective
        const obj = document.createElement('button');
        obj.classList.add('objective');
        obj.textContent = 'CONTINUE';
        obj.style.top = `${objective.top}px`;
        obj.style.left = `${objective.left}px`;
        adContainer.appendChild(obj);
    }

    //to update the difficulty
    function updateDifficulty(score) {
        if(score === 5) {
            difficulty = 1500;
            //end current interval, start new one with updated variables
            endInterval();
            startInterval();
        } else if(score === 10) {
            difficulty = 1000;
            endInterval();
            startInterval();
        } else if(score === 15) {
            difficulty = 500;
            endInterval();
            startInterval();
        } else if(score === 20) {
            difficulty = 0;
            endInterval();
            startInterval();
        }
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
        //if an objective is clicked
        } else if(clicked.nodeName == 'BUTTON' && clicked.classList.contains('objective')) {
            if(gameStart === false) {
                gameStart = true;
                startGame();
            }
            updateScore(++score); //increment by 1 first then update
            updateDifficulty(score);
            objective.top = randomTop('objective');
            objective.left = randomLeft('objective');
            buildRandomAd();
            renderAll();
            //check if they win
            if(score >= 30) {
                showEndScreen('YOU WIN!');
            }
        }
    });

    //interval used to control ad intervals
    let interval = null;
    function startInterval() {
        interval = setInterval(function() {
            buildRandomAd();
            renderAll();
        }, difficulty + 1500);
    }
    //stops interval
    function endInterval() {
        clearInterval(interval);
        interval = null;
    }


    //updates score
    function updateScore(score) {
        scoreDiv.textContent = score;
    }

    //reference to modal
    const modal = document.querySelector('.modal');
    const resultElem = document.querySelector('.result');
    const endScoreElem = document.querySelector('.end-score');
    //shows end screen
    function showEndScreen(text) {
        endInterval();
        modal.classList.add('open');
        resultElem.textContent = text;
        endScoreElem.textContent = `SCORE: ${score}`;
    }

    //restart button
    const restartBtn = document.querySelector('.restart');
    restartBtn.addEventListener('click', resetGame);

    //reset game
    function resetGame() {
        //remove all elements on board
        clearGame();
        //reset variables
        score = 0;
        difficulty = 2000;
        gameStart = false;
        ads = []; //ads array

        endInterval();
        resetObjective(); //for the top/left positioning
        scoreDiv.textContent = 0;

        //reset modal
        modal.classList.remove('open');

        setGame(); //must be last
    }

    setGame();
})();