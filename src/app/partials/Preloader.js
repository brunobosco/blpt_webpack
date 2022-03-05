import GSAP from 'gsap';
import Component from '../partials/Component';

import { each } from 'lodash';

import { eases } from '../utils/easing';

export default class Preload extends Component {
    constructor() {
        super({
            element: '.loader',
            elements: {
                wrapper: '.loader_wrapper',
                desc: '.loader_title > h3',
                perc: '.loader_perc > p',
                images: document.querySelectorAll('img'),
            },
        });
        this.length = 0;
    }

    show() {
        setTimeout(() => {
            this.initLoader();
        }, 1000);
    }

    initLoader() {
        each(this.elements.images, (element) => {
            element.onload = () => {
                this.onAssetLoaded();
            };
            element.onerror = (error) => {
                console.log(error);
            };
            element.src = element.getAttribute('data-src');
        });

        this.onAssetLoaded();
    }

    onAssetLoaded() {
        this.length += 1;

        let percent = (this.length / this.elements.images.length) * 100;
        this.elements.perc.innerText = `${percent}%`;

        setTimeout(() => {
            this.emit('completed');
        }, 1000);
    }

    destroy() {
        GSAP.to(this.elements.wrapper, {
            duration: 0.5,
            autoAlpha: 0,
            ease: eases.circOut,
            onComplete: () => {
                this.element.remove();
            },
        });
    }
}
