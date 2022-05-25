import GSAP from 'gsap';

import { eases } from '../utils/easing';
import each from 'lodash/each';

export default class Observer {
    constructor() {
        this.el = document.querySelector("[data-smoothscroll='container']");
        this.observerElements = this.el.querySelectorAll('[data-scroll-animation]');

        this.options = {
            root: null,
            treshold: 0.5,
            rootMargin: '-100px',
        };

        this.init();
    }

    init() {
        this.observer = new IntersectionObserver(this.callback, this.options);

        each(this.observerElements, (el) => {
            const image = el.querySelectorAll('img');

            this.tl = GSAP.timeline({ paused: true });

            this.tl.from(
                image,
                {
                    duration: 2,
                    y: '-101%',
                    stagger: 0.15,
                    ease: eases.expoInOut,
                },
                0
            );

            el.timeline = this.tl;
        });

        Array.prototype.forEach.call(this.observerElements, (el) => {
            this.observer.observe(el);
        });
    }

    callback(entries, observer) {
        each(entries, (entry) => {
            if (entry.isIntersecting) {
                entry.target.timeline.play();
            } else {
                entry.target.timeline.reverse();
            }
        });
    }
}
