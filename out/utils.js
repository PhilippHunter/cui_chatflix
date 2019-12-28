"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_on_google_1 = require("actions-on-google");
class utils {
    static createCarousel(titles) {
        let items = {};
        let counter = 0;
        titles.forEach(title => {
            let obj = {};
            obj['title'] = title.name;
            obj['image'] = new actions_on_google_1.Image({
                url: title.image_url,
                alt: title.name
            });
            let key = 'SELECTION-' + counter.toString();
            items[key] = obj;
            counter++;
        });
        const carousel = new actions_on_google_1.Carousel({
            items: items
        });
        return carousel;
    }
}
exports.utils = utils;
//# sourceMappingURL=utils.js.map