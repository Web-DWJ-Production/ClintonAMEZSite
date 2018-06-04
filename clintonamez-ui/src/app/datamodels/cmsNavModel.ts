export class CmsNavModel {
    public title: string;
    public icon: string;
    public page: string;
    public subPages: CmsNavModel[];
    public external: Boolean;    

    constructor(myTitle, myIcon, myPage, mySubpages, myExternal){
        this.title = myTitle;
        this.icon = myIcon;
        this.page = myPage;
        this.subPages = mySubpages;
        this.external = myExternal;
    }
}