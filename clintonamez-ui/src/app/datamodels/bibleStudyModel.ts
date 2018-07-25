export class BibleStudyModel {
    public date: Date;
    public title: string;
    public downloadURL: string;

    constructor(myDate, myTitle, myUrl){
        this.date = myDate;
        this.title = myTitle;
        this.downloadURL = myUrl;
    }
}