"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_on_google_1 = require("actions-on-google");
class utils {
    static createCarousel(titles) {
        let items = {};
        let counter = 0;
        titles.forEach(title => {
            let obj = {};
            let key = 'SELECTION-' + counter.toString();
            obj['title'] = title.name;
            obj['image'] = new actions_on_google_1.Image({
                url: title.image_url,
                alt: title.name
            });
            items[key] = obj;
            counter++;
        });
        const carousel = new actions_on_google_1.Carousel({
            items: items
        });
        return carousel;
    }
    static createList(actors) {
        let items = {};
        let counter = 0;
        actors.forEach(actor => {
            let key = 'SELECTION-' + counter.toString();
            items[key] = new Object({ title: actor });
            counter++;
        });
        const list = new actions_on_google_1.List({
            items: items
        });
        return list;
    }
}
exports.utils = utils;
//# sourceMappingURL=utils.js.map