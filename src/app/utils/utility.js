import map from 'lodash/map';

export function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

export function lerp2(p1, p2, t) {
    return p1 + (p2 - p1) * t;
}

export function mapEach(element, callback) {
    if (element instanceof window.HTMLElement) {
        return [callback(element)];
    }

    return map(element, callback);
}
