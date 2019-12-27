import { Carousel, Image } from "actions-on-google";
import { Title } from "./Models/Title";

export class utils {
    static createCarousel(titles : Title[]) : Carousel {
        let items = {}
        let counter = 0;
        titles.forEach(title => {
            let obj = {}
            obj['title'] = title.name;
            obj['image'] = new Image({
                url: title.image_url,
                alt: title.name
            })
            let key = 'SELECTION-'+counter.toString();
            items[key] = obj;
            counter++;
        })        
        
        const carousel : Carousel = new Carousel({
            items: items
        })

        return carousel;
    }
}