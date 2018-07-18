export class MinistryModel {
    public title: string;
    public defaultMedia: string;
    public logo: string;
    public mission: string;
    public populationsServed: string[];
    public activities: {name:string, description:string}[];
    public leadership: {name: string, title:string, email: string}[];
    public images: string[];
    public section: string;
    public subSections: string[];
    public siblings: {name:string, defaultMedia:string, subSections: string[], logo:string}[];

    constructor(myTitle, myMedia){        
        this.title = myTitle;
        this.defaultMedia = myMedia;
    }
}