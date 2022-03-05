import gsap from 'gsap';

//! Fix nav changin color and set a TimeOut for pageTransition

export default class Menu {
    constructor(el) {
        this.el = document.querySelector('.menu');
        this.nav = document.querySelectorAll('.nav_flex > div');

        this.menu = this.el;
        this.menuInner = this.el.children[0];

        this.action;

        this.openMenu = document.querySelector('.action--open');
        this.openMenu.addEventListener('click', (event) => {
            event.preventDefault();
            this.toggle(this.action);
            this.menu.classList.toggle('menu--visible');
        });

        this.innerText = this.menuInner.children[1].children;
        this.ease = 'Power4.easeInOut';
        this.animateMenu();
        this.animateIcon();
    }

    toggle(action) {
        if (!action) {
            this.action = true;
            this.open();
        } else {
            this.close();
        }
    }

    animateMenu() {
        this.tl = gsap
            .timeline({ paused: true })
            .addLabel('delay', 0)
            .to(
                this.menuInner,
                {
                    duration: 1,
                    height: '100%',
                    ease: this.ease,
                    // backgroundColor: '#afd8d6',
                },
                'delay+=0.5'
            )
            .from(
                this.innerText,
                {
                    duration: 1,
                    y: '+=100',
                    autoAlpha: 0,
                    ease: this.ease,
                    stagger: 0.1,
                },
                'delay+=1'
            );
    }
    animateIcon() {
        this.tl2 = gsap
            .timeline({ paused: true })
            .addLabel('delay', 0)
            .to(
                this.nav,
                {
                    duration: 1,
                    y: '-=100',
                    autoAlpha: 0,
                    ease: this.ease,
                    stagger: 0.12,
                },
                'delay'
            )
            .to(
                this.nav,
                {
                    duration: 1,
                    y: '0',
                    autoAlpha: 1,
                    ease: this.ease,
                    stagger: 0.12,
                },
                'delay+=1'
            );
    }

    open() {
        this.tl.play();
        this.tl2.play();
        this.action = true;
    }

    close() {
        this.tl.reverse();
        this.tl2.reverse();
        this.action = false;
    }

    // iconOpen(cond) {
    //     if (cond) {
    //         gsap.set(this.openMenu, { pointerEvents: 'none' });
    //         gsap.set(this.closeMenu, { pointerEvents: 'auto' });
    //         // this.colorNav(true);
    //     } else {
    //         gsap.set(this.closeMenu, { pointerEvents: 'none' });
    //         gsap.set(this.openMenu, { pointerEvents: 'auto' });
    //         // this.colorNav(false);
    //     }
    // }

    //     colorNav(cond) {
    //         setTimeout(() => {
    //             // if (cond) {
    //             //     this.nav.forEach((el) => {
    //             //         el.style.color = '$color-secondary';
    //             //     });
    //             // } else {
    //             //     this.nav.forEach((el) => {
    //             //         el.style.color = 'red';
    //             //     });
    //             // }

    //             this.nav.forEach((el) => {
    //                 if (cond) {
    //                     console.log(cond);
    //                     el.style.color = 'red';
    //                 } else {
    //                     console.log('some problem here?');

    //                     el.style.color = 'white';
    //                 }
    //             });
    //         }, 1000);
    //     }
}
