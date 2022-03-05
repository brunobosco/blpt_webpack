import Page from './Page';

export default class Home extends Page {
    constructor() {
        super({
            id: 'home',

            element: '.hero',
            elements: {
                nav: document.querySelector('.nav'),
                nav_links: document.querySelectorAll('.nav_flex-links > a'),

                image: '.hero_media',
                title: '.hero_title h1',
                parag: '.hero_description p',
            },
        });
    }

    create() {
        super.create();
    }
}
