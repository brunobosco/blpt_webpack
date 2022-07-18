import GSAP from 'gsap';

export default class PageTransition {
    constructor() {
        this.element = document.createElement('canvas');
        this.element.className = 'page-transition';
        this.element.height = window.innerHeight;
        this.element.width = window.innerWidth;

        this.main = document.querySelector('main');
        this.nav = document.querySelector('.nav');

        this.context = this.element.getContext('2d');
        this.progress = 0;

        document.body.appendChild(this.element);
    }

    load() {
        return new Promise((resolve) => {
            GSAP.set(this.element, { rotation: 180 });
            GSAP.from(this, {
                duration: 2,
                ease: 'power4.InOut',
                onUpdate: this.onUpdate.bind(this),
                onComplete: resolve,
                progress: 1,
            });
        });
    }

    show() {
        return new Promise((resolve) => {
            GSAP.set(this.element, { rotation: 0 });
            GSAP.to(this, {
                duration: 1.5,
                ease: 'expo.inOut',
                onUpdate: this.onUpdate.bind(this),
                progress: 1,
                onComplete: resolve,
            });
            GSAP.to([this.main, this.nav], {
                duration: 1.5,
                ease: 'power4.InOut',
                autoAlpha: 0,
            });
        });
    }

    hide() {
        return new Promise((resolve) => {
            GSAP.set(this.element, { rotation: 180 });
            GSAP.to([this.main, this.nav], {
                duration: 1,
                delay: 1,
                ease: 'power4.InOut',
                autoAlpha: 1,
            });
            GSAP.to(this, {
                duration: 1.5,
                ease: 'expo.inOut',
                onUpdate: this.onUpdate.bind(this),
                progress: 0,
                onComplete: resolve,
            });
        });
    }

    onUpdate() {
        this.context.clearRect(0, 0, this.element.width, this.element.height);
        this.context.save();
        this.context.beginPath();

        this.widthSegments = Math.ceil(this.element.width / 4);

        this.context.moveTo(this.element.width, this.element.height);
        this.context.lineTo(0, this.element.height);

        const t = (1 - this.progress) * this.element.height;
        const amplitude = 200 * Math.sin(this.progress * Math.PI);

        this.context.lineTo(0, t);

        for (let index = 0; index <= this.widthSegments; index++) {
            const n = 40 * index;
            const r = t - Math.sin((n / this.element.width) * Math.PI) * amplitude;

            this.context.lineTo(n, r);
        }

        this.context.fillStyle = '#212121';
        this.context.fill();
        this.context.restore();
    }
}
