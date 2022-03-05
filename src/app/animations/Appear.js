import gsap from 'gsap/all';

export default class {
    constructor(delay = 0, el) {
        this.delay = delay;
        this.element = el;

        this.aniamateOut();
    }

    animateIn() {
        gsap.to(
            this.el,
            {
                duration: 1.5,
                delay: this.delay,
                ease: 'Power4.easeInOut',
                y: '0%',
            },
            0.1
        );
    }

    animateOut() {
        gsap.set(this.el, {
            autoAlpha: 0,
            y: '100%',
        });
    }
}
