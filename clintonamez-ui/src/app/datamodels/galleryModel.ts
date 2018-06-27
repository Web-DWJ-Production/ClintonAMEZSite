export class GalleryModel {
    public title: string;
    public totalImgs: number;
    public setId: string;
    public previewImg: string;
    public images: string[];

    constructor(myTitle, myPreviewImg){        
        this.title = myTitle;
        this.previewImg = myPreviewImg;
    }
}