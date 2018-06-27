export class MinistryModel {
    public title: string;
    public defaultMedia: string;
    public sections: string[];

    constructor(myTitle, myMedia){        
        this.title = myTitle;
        this.defaultMedia = myMedia;
    }
}