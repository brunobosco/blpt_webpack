import 'lazysizes';
import normalizeWheel from 'normalize-wheel';

import Time from './utils/Time';
import Preloader from './partials/Preloader';

import PageTransition from './animations/PageTransition';
import SmoothScroll from './animations/SmoothScroll';

import Home from './pages/Home';

class App {
    constructor() {
        this.initPreloader();
        this.initPartials();

        this.initContents();
        this.initPages();
        this.initAnimations();

        this.time = new Time();
        this.time.on('tick', () => {
            this.onUpdate();
        });

        this.addEventListeners();
        this.addLinkListener();
    }

    initPreloader() {
        this.preloader = new Preloader();
        this.preloader.once('completed', this.onPreloaded.bind(this));
    }

    initPartials() {
        this.transition = new PageTransition();
    }

    async onPreloaded() {
        await this.transition.show();

        this.preloader.destroy();

        await this.transition.hide();
    }

    initContents() {
        this.template = document.querySelector('.template');
        this.dataTemplate = this.template.getAttribute('data-template');
    }

    initPages() {
        this.pages = {
            home: new Home(),
        };

        this.page = this.pages[this.dataTemplate];
    }

    initAnimations() {
        this.smoothScroll = new SmoothScroll();
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

            const divContent = div.querySelector('.template');
            this.dataTemplate = divContent.getAttribute('data-template');

            this.template.setAttribute('data-template', this.dataTemplate);
            this.template.innerHTML = divContent.innerHTML;

            this.page = this.pages[this.dataTemplate];

            await this.transition.hide();

            this.addLinkListener();
        } else {
            console.log('Error');
        }
    }

    onOrientationChange() {
        location.reload();
    }

    onWheel(e) {
        const normalized = normalizeWheel(e);

        if (this.smoothScroll && this.smoothScroll.onWheel) this.smoothScroll.onWheel(normalized);
    }

    onUpdate() {
        if (this.smoothScroll) this.smoothScroll.update();
    }

    addEventListeners() {
        window.addEventListener('popstate', this.onPopSate.bind(this));
        window.addEventListener('orientationchange', this.onOrientationChange.bind(this));

        window.addEventListener('mousewheel', this.onWheel.bind(this));
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
