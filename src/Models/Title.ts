export class Title {
    name: string;
    information: string;
    image_url: string;

    constructor(name: string, information: string, image_url: string = "") {
        this.name = name;
        this.information = information;
        this.image_url = image_url;
    }
}