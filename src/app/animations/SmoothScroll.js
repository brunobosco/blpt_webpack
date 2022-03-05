import { lerp } from 'utils/utility';

export default class SmoothScroll {
    constructor() {
        this.el = document.querySelector("[data-smoothscroll='content']");

        this.current = 0;
        this.target = 0;
        this.ease = 0.06;

        this.init();
    }

    init() {
        this.containerHeight = this.el.getBoundingClientRect().height;
        document.body.style.height = `${this.containerHeight}px`;

        this.scroll();
        this.addEventListeners();
    }

    scroll() {
        this.current = lerp(this.current, this.target, this.ease);
        this.current = parseFloat(this.current.toFixed(2));
        this.target = window.scrollY;

        this.el.style.transform = `translateY(${-this.current}px)`;

        requestAnimationFrame(() => this.scroll());
    }

    onResize() {
        this.containerHeight = this.el.getBoundingClientRect().height;
        document.body.style.height = `${this.containerHeight}px`;
    }

    addEventListeners() {
        window.addEventListener('resize', this.onResize.bind(this));
    }
}
