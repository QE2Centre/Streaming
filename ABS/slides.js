/*global SLIDES*/
/*global document*/

(function () {

    'use strict';

    var slideContainer = document.querySelector('.slides'),
        player = document.querySelector('audio'),
        viewer = document.querySelector('.main_slide'),
        currentSlide = 0,
        index,
        createElement;

    createElement = function (time, index) {
        var newElement = document.createElement('li');
        newElement.style.backgroundImage = 'url("slides/slide' + (index + 1) + '.JPG")';
        newElement.className = 'thumbnail';
        newElement.innerHTML = index + 1;
        newElement.onclick = function () {
            var seconds = (time.match(/[0-9]*:/)[0].replace(':', '') * 60) + (parseInt(time.match(/:[0-9]*/)[0].replace(':', ''), 10));
            player.currentTime = seconds;
            player.play();
        };
        slideContainer.appendChild(newElement);
    };

    for (index = 0; index < SLIDES.length; index = index + 1) {
        createElement(SLIDES[index], index);
    }

    player.ontimeupdate = function (event) {

        var seconds,
            match = 0;

        for (index = 0; index < SLIDES.length; index = index + 1) {
            seconds = (SLIDES[index].match(/[0-9]*:/)[0].replace(':', '') * 60) + (parseInt(SLIDES[index].match(/:[0-9]*/)[0].replace(':', ''), 10));
            if (seconds <= event.target.currentTime) {
                match = index;
            }
        }

        if (match !== currentSlide) {
            currentSlide = match;
            viewer.src = 'slides/slide' + (match + 1) + '.jpg';
        }

    };

}());
