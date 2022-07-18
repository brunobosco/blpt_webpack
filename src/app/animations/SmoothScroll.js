import { lerp2, clamp } from 'utils/utility';

export default class SmoothScroll {
    constructor() {
        this.el = document.querySelector('[data-smoothscroll]');
        this.containerHeight = this.el.getBoundingClientRect().height;

        this.isMobile = window.matchMedia('(max-width: 769px)').matches;

        this.scroll = {
            enable: false,

            start: 0,
            current: 0,
            target: 0,
            progress: 0,
            ease: !this.isMobile ? 0.04 : 0.05,
            speed: 0.25,

            limit: this.containerHeight - window.innerHeight,
        };

        this.init();
        this.addEventListeners();
    }

    init() {}

    onResize() {
        this.containerHeight = this.el.getBoundingClientRect().height;
        this.scroll.limit = this.containerHeight - window.innerHeight;
    }

    onTouchDown(e) {
        if (!this.isMobile) return;

        this.scroll.enable = true;
        this.scroll.position = this.scroll.current;
        this.start = e.touches ? e.touches[0].clientY : e.clientY;
    }

    onTouchMove(e) {
        if (!this.isMobile && !this.scroll.enable) return;

        const y = e.touches ? e.touches[0].clientY : e.clientY;
        const distance = (this.start - y) * 3;

        this.scroll.target = this.scroll.position + distance;
    }

    onTouchUp() {
        if (!this.isMobile) return;

        this.scroll.enable = false;
    }

    onWheel(target) {
        const speed = target.pixelY;

        this.scroll.target += speed * this.scroll.speed;
        return speed;
    }

    update() {
        this.scroll.target = clamp(0, this.scroll.limit, this.scroll.target);

        this.scroll.current = lerp2(this.scroll.current, this.scroll.target, this.scroll.ease);
        this.scroll.current = parseFloat(this.scroll.current.toFixed(2));

        if (this.scroll.current <= 0.2) this.scroll.current = 0;

        this.el.style.transform = `translate3d(0, ${-this.scroll.current}px, 0)`;
    }

    addEventListeners() {
        window.addEventListener('resize', this.onResize.bind(this));
    }
}
