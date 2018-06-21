export class GalleryModel {
    public title: string;
    public images: string[];

    constructor(myTitle, myImages){        
        this.title = myTitle;
        this.images = myImages;
    }
}