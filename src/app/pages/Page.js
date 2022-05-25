import each from 'lodash/each';
import GSAP from 'gsap';
import { eases } from '../utils/easing';

export default class Page {
    constructor({ element, elements, id }) {
        this.selector = element;
        this.selectorChildren = { ...elements };

        this.id = id;

        this.create();
    }

    create() {
        this.element = document.querySelector(this.selector);
        this.elements = {};

        each(this.selectorChildren, (element, key) => {
            if (element instanceof window.HTMLElement || element instanceof window.NodeList || Array.isArray()) {
                this.elements[key] = element;
            } else {
                this.elements[key] = document.querySelectorAll(element);
                if (this.elements[key].length === 0) {
                    this.elements[key] = null;
                } else if (this.elements[key].length === 1) {
                    this.elements[key] = document.querySelector(element);
                }
            }
        });
    }

    initIntroAnimation() {
        console.log(this.selectorChildren);
        this.intro = GSAP.timeline({ paused: true })
            .addLabel('start')
            .from(
                this.selectorChildren.image,
                {
                    duration: 1.5,
                    autoAlpha: 0,
                    scale: 0.5,
                    ease: eases.circOut,
                },
                'start+=0'
            )
            .from(
                [this.selectorChildren.title, this.selectorChildren.parag],
                {
                    duration: 1.5,
                    autoAlpha: 0,
                    y: '101%',
                    rotate: 2,
                    stagger: 0.05,
                    ease: eases.power2Out,
                },
                'start+=1'
            );
    }
    showIntroAnimation() {
        this.intro.play();
    }
    hideIntroAnimation() {
        this.intro.reverse();
    }
}
