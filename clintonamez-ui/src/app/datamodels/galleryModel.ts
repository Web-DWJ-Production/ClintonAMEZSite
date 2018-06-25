export class GalleryModel {
    public title: string;
    public totalImgs: number;
    public setId: string;
    public previewImg: string;

    constructor(myTitle, myPreviewImg){        
        this.title = myTitle;
        this.previewImg = myPreviewImg;
    }
}