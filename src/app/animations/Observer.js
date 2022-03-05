import gsap from 'gsap';

export default class Observer {
    constructor(el) {
        this.el = document.querySelector("[data-scroll='container']");
        this.intersection = this.el.querySelectorAll("[data-scroll='item']");

        this.config = {
            root: null,
            rootMargin: '-1% 0px',
        };

        this.init();
    }

    init() {
        let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                this.figure = entry.target.querySelectorAll('.projects_figure');
                this.title = entry.target.querySelectorAll('.projects_title');
                this.description = entry.target.querySelectorAll('.projects_description');

                const tl = gsap
                    .timeline({ paused: true })
                    .addLabel('start')
                    .fromTo(
                        [this.figure],
                        {
                            autoAlpha: 0,
                            x: '100%',
                        },
                        {
                            duration: 1,
                            x: 0,
                            autoAlpha: 1,
                            stagger: 0.05,
                            ease: 'Power4.easeInOut',
                        }
                    )
                    .fromTo(
                        [this.title, this.description],
                        {
                            autoAlpha: 0,
                            y: '100%',
                        },
                        {
                            duration: 1,
                            y: 0,
                            autoAlpha: 1,
                            stagger: 0.2,
                            ease: 'Power4.easeInOut',
                        },
                        'start+='
                    );

                if (entry.intersectionRatio > 0) {
                    tl.play();
                    observer.unobserve(entry.target);
                } else {
                    // tl.reversed();
                }
            });
        });
        this.intersection.forEach((el) => {
            observer.observe(el);
        });
        // for (let i = 0; i < this.intersection.length; i++) {
        //     console.log(i);
        //     observer.observe(this.intersection[i]);
        // }
    }
}
