import { Carousel, Image, List } from "actions-on-google";
import { Title } from "./Models/Title";

export class utils {
    static createCarousel(titles : Title[]) : Carousel {
        let items = {}
        let counter = 0;
        titles.forEach(title => {
            let obj = {}
            let key = 'SELECTION-'+counter.toString();
            obj['title'] = title.name;
            obj['image'] = new Image({
                url: title.image_url,
                alt: title.name
            })
            items[key] = obj;
            counter++;
        })        
        
        const carousel : Carousel = new Carousel({
            items: items
        })

        return carousel;
    }

    static createList(actors : string[]) : List {
        let items = {};
        let counter = 0;
        actors.forEach(actor => {
            let key = 'SELECTION-'+counter.toString();
            items[key] = new Object({title: actor})
            counter++;
        })

        const list : List = new List({
            items: items
        });
        
        return list;
    }
}