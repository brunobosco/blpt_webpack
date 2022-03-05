import gsap from 'gsap';

//! Fix nav changin color and set a TimeOut for pageTransition

export default class BgTransition {
    constructor() {
        this.element = document.createElement('canvas');
        document.body.appendChild(this.element);

        this.element.className = 'transition';
        this.element.height = window.innerHeight * window.devicePixelRatio;
        this.element.width = window.innerWidth * window.devicePixelRatio;

        this.context = this.element.getContext('2d');
        this.progress = 0;
        this.n = 0;
        this.t = 0;

        this.body = document.querySelector('body');
        this.nav = document.querySelectorAll('a');
        this.figure = document.querySelectorAll('figure');
        this.svg = document.querySelectorAll('svg path');
    }

    show() {
        gsap.set(this.element, { rotation: 0 });
        gsap.to(this, {
            duration: 1.5,
            ease: 'expo.inOut',
            onUpdate: this.onUpdate.bind(this),
            onComplete: () => {
                this.hide();
                this.changeColor();
            },
            progress: 1,
        });
    }

    hide() {
        gsap.set(this.element, { rotation: 180 });
        gsap.to(this, {
            duration: 1.5,
            ease: 'expo.inOut',
            onUpdate: this.onUpdate.bind(this),
            progress: 0,
        });
    }

    text() {
        this.context.fillStyle = '#fff';
        this.context.font = '120px Scandium';
        this.context.fillText('Changing Color!', this.element.width / 4, this.element.width / 4);
        this.context.fill();
        this.context.restore();
    }

    onUpdate() {
        this.context.clearRect(0, 0, this.element.width, this.element.height);
        this.context.save();
        this.context.beginPath();

        this.widthSegments = Math.ceil(this.element.height / 40);

        this.context.moveTo(this.element.width, this.element.height);
        this.context.lineTo(this.element.width, 0);

        const t = (1 - this.progress) * this.element.width;
        const amplitude = 300 * Math.sin(this.progress * Math.PI);

        this.context.lineTo(t, 0);

        for (let index = 0; index <= this.widthSegments; index++) {
            const n = 40 * index;
            const r = t - Math.sin((n / this.element.height) * Math.PI) * amplitude;

            this.context.lineTo(r, n);
        }

        this.context.fillStyle = '#515258';

        // this.psychoMod();
        this.context.fill();
        this.context.restore();
    }

    changeColor() {
        this.n++;
        switch (this.n) {
            case 1:
                gsap.to(this.body, {
                    backgroundColor: '#d4d7f7',
                    color: '#313131',
                });
                // gsap.to(this.figure, {
                //     background: '#313131',
                // });
                // gsap.to(this.nav, {
                //     color: '#313131',
                // });
                gsap.to(this.svg, {
                    fill: '#313131',
                });
                break;
            case 2:
                gsap.to(this.body, {
                    backgroundColor: '#313131',
                    color: '#d4d7f7',
                });
                // gsap.to(this.figure, {
                //     background: '#d4d7f7',
                // });
                // gsap.to(this.nav, {
                //     color: '#d4d7f7',
                // });
                gsap.to(this.svg, {
                    fill: '#d4d7f7',
                });
                this.n = 0;
                break;
        }
    }

    psychoMod() {
        this.t++;
        switch (this.t) {
            case 1:
                this.context.fillStyle = '#212121';
                break;
            case 2:
                this.context.fillStyle = '#212121';
                break;
            case 3:
                this.context.fillStyle = '#d4d7f7';
                break;
            case 4:
                this.context.fillStyle = '#b9eae9';
                break;
            case 5:
                this.context.fillStyle = '#97dac3';
                break;
            case 6:
                this.context.fillStyle = '#d4d7f7';
                break;
            case 7:
                this.context.fillStyle = '#212121';
                break;
            case 8:
                this.context.fillStyle = '#fff';
                this.t = 0;
                break;
        }
    }
}
