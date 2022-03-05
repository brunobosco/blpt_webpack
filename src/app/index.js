import 'lazysizes';

import Preloader from './partials/Preloader';

import PageTransition from './animations/PageTransition';
import SmoothScroll from './animations/SmoothScroll';

import Home from './pages/Home';

class App {
    constructor() {
        this.initPartials();
        this.checkAnimations();

        this.initPreloader();

        this.initContents();
        this.initPages();

        this.addEventListeners();
        this.addLinkListener();
    }

    initPartials() {
        this.transition = new PageTransition();
    }

    checkAnimations() {
        const isMobile = window.matchMedia('(max-width: 769px)');
        const checkIsMobile = isMobile.matches;

        if (!checkIsMobile) {
            this.initAnimations();
        }
    }

    initAnimations() {
        new SmoothScroll();
    }

    initPreloader() {
        this.preloader = new Preloader();

        this.preloader.show();
        this.preloader.once('completed', this.onPreloaded.bind(this));
    }

    async onPreloaded() {
        await this.transition.show();

        this.preloader.destroy();

        await this.transition.hide();
    }

    initContents() {
        this.content = document.querySelector('.content');
        this.template = this.content.getAttribute('data-template');
    }

    initPages() {
        this.pages = {
            home: new Home(),
        };

        this.page = this.pages[this.template];
    }

    onPopSate() {
        this.onChange({
            url: window.location.pathname,
            push: false,
        });
    }

    async onChange({ url, push = true }) {
        await this.transition.show();

        const request = await window.fetch(url);

        if (request.status === 200) {
            window.scrollTo(0, 0);

            const html = await request.text();
            const div = document.createElement('div');

            if (push) {
                window.history.pushState({}, '', url);
            }

            div.innerHTML = html;

            const divContent = div.querySelector('.content');
            this.template = divContent.getAttribute('data-template');

            this.content.setAttribute('data-template', this.template);
            this.content.innerHTML = divContent.innerHTML;

            this.page = this.pages[this.template];

            await this.transition.hide();

            this.checkAnimations();

            this.addLinkListener();
        } else {
            console.log('Error');
        }
    }

    onOrientationChange() {
        location.reload();
    }

    addEventListeners() {
        window.addEventListener('popstate', this.onPopSate.bind(this));
        window.addEventListener('orientationchange', this.onOrientationChange.bind(this));
    }

    addLinkListener() {
        const navLinks = document.querySelectorAll('.nav_flex-links > a');

        for (let link of navLinks) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const footer = document.querySelector('.footer');
                footer.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
            });
        }

        // const openExtra = document.querySelector('.color-me');
        // openExtra.addEventListener('click', (e) => {
        //     e.preventDefault();
        //     this.crazy.show();
        // });

        const linkProject = document.querySelectorAll('.project_link');
        linkProject.forEach((link) => {
            link.onclick = (e) => {
                e.preventDefault();

                const { href } = link;
                this.onChange({ url: href });
            };
        });
    }
}

new App();
window.scrollTo(0, 0);
