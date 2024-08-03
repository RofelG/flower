document.addEventListener('DOMContentLoaded', function() {
    const template = document.getElementById('flower-wrapper-template').content;
    const glass = document.getElementById('flower-glass-template').content;
    const flowers = document.querySelectorAll('.flower');

    const colors = ['pink', 'purple', 'yellow', 'deep-pink', 'blue', 'orange', 'red', 'turquoise', 'pastel-pink', 'violet'];
    const bends = ['left', 'right'];

    flowers.forEach(flower => {
        const count = flower.getAttribute('data-count');
        // create an array the length of flowers and fill it with all 0s but one random index with 1
        const flowerBend = [];
        const flowerSize = generateUniqueArray(count, 35, 70);
        const flowerAnimationStart = generateUniqueArray(count, 0, 1000);

        //for every 3rd flower, bend it
        for (let i = 0; i < count; i ++) {
            flowerBend[i] = rand(0, 2);
        }

        for (let i = 0; i < count; i++) {
            const clone = template.cloneNode(true);
            const random = rand(0, colors.length);
            const bend = bends[rand(0, 2)];

            //modify the clone adding the class
            clone.querySelector('.f-wrapper').classList.add(`f-wrapper--${i + 1}`);

            if (flowerBend[i] === 1) {
                clone.querySelector('.f-wrapper').classList.add('flower-bend', `bend-${bend}`);
            }

            //add the color to the flower
            clone.querySelectorAll('.flower__leaf').forEach(leaf => {
                leaf.style.backgroundImage = `var(--color-leaf-${colors[random]})`;
            })

            //add the color to the falling leaf
            clone.querySelector('.flower__leaf:last-child').classList.add(`flower__hide`);
            // clone.querySelector('.flower__leaf:last-child').classList.add(`flower__fall-down--${ colors[random]}`);

            //Adjust height of the stem
            clone.querySelector('.flower__line').style.height = `${flowerSize[i]}vmin`;

            //Rotate the stem
            let rotation, translate = 0;
            if (bend == 'left') {
                rotation = rand(-10, 0);
            } else if (bend == 'right') {
                rotation = rand(0, 10);
            } else {
                rotation = rand(-10, 10);
            }
            clone.querySelector('.f-wrapper').style.rotate = `${rotation}deg`;
            if (rotation < -4) {
                translate = rand(-8, 0);
            } else if (rotation > 4) {
                translate = rand(0, 8);
            } else {
                translate = rand(-6, 6);
            }
            clone.querySelector('.f-wrapper').style.translate = `${translate}vmin`;

            clone.querySelectorAll('.flower__leaf').forEach(leaf => {
                leaf.style.animationDelay = `${flowerAnimationStart[i]}ms`;
            });

            flower.appendChild(clone);
        }

        const glassClone = glass.cloneNode(true);
        flower.appendChild(glassClone);
    });
});

function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateUniqueArray(count, min, max) {
    const uniqueValues = new Set();
    while (uniqueValues.size < count) {
        uniqueValues.add(rand(min, max));
    }
    return Array.from(uniqueValues);
}