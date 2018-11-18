import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

/* Data Models */
import { AnnouncementModel } from '../../../../datamodels/announcementModel';
import { LineTypeModel } from '../../../../datamodels/lineTypeModel';

/* Service */
import { AuthService } from '../../../../services/authServices';
import { CoreService } from '../../../../services/coreServices';

@Component({
  selector: 'cms-announcements',
  templateUrl: './announcements.html',
  styleUrls: ['./announcements.less', '../../cms.styles.less']
})
export class AnnouncementsComponent implements OnInit {
  public initialCards: AnnouncementModel[];
  public editCards: AnnouncementModel[];
  public selectedCard: AnnouncementModel;
  public selectedLoc: number;
  public cardMax = 5;

  constructor(private authService: AuthService, private coreService: CoreService, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loadAnnouncements();
  }

  public loadAnnouncements() {
    var self = this;
    this.coreService.getAnnouncements().subscribe(res => {
      if(!res.errorMessage){
        self.initialCards= res.results.slice();
        self.editCards = res.results.slice();

        self.selectedCard = (self.editCards && self.editCards.length > 0 ? self.editCards[0] : null);
        self.selectedLoc = 0;
      }
    });
  }

  public getJSONString(obj){
    return JSON.stringify(obj.mediaArray);
  }

  public textAreaAdjust(obj, ret){
    obj.style.height = "1px";
    var objHeight = (2+obj.scrollHeight)+"px";
    obj.style.height = objHeight;
    
    if(ret) return objHeight;
  }

  /* Convert base64 */
  public onFileChange(event) {
    var self = this;

    let reader = new FileReader();

    try {
      if(event.target.files && event.target.files.length > 0) {
        let file = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
          //self.selectedCard.media = reader.result;
          self.selectedCard.mediaArray = self.splitBase64Media(reader.result);
        };
      }
    }
    catch(ex){
      console.log("Error with new img file: ", ex);
    }
  
  }

  public buildMedia(list){
    var self = this;
    var url = null;
    try {
      var str = (list.length > 0 ? list.join('') : null);
      url = self._sanitizer.bypassSecurityTrustResourceUrl(str);
    }
    catch(ex){
      console.log("Error cleaning Url: ", ex);
    }

    return url;
  }
  
  public splitBase64Media(str){
    var ret = [];
    var sliceLgth = 25000;
    try {
      while(str.length > 0){
        var tmp = str.slice(0, sliceLgth);
        ret.push(tmp);

        str = str.slice(sliceLgth);
      }
    }
    catch(ex){
      console.log("error splitting base64: ", ex);
    }
    return ret;
  }

  public readyForUpdate(){
    var self = this;
    var ret = false;

    try {
      ret = (self.initialCards !== self.editCards);
    }
    catch(ex){
      console.log("Error checking for update: ", ex);
    }

    return ret;
  }

  public updateCarousel(){
    var self = this;
    try {
      var list = {"list": self.editCards};

      this.coreService.updateAnnouncements(list).subscribe(res => {
        if(res) { /* Error Message*/ }
        else { /* Send Message */} 
      }); 
    }
    catch(ex){
      console.log("error updating carousel: ",ex);
    }
  }

  public isBold(bold) {
    return (bold == true ? 'bold' : '');
  }
  public isDisabled(btnName) {
    var self = this;
    if (btnName == 'prev') {
      return (self.selectedLoc <= 0 ? 'disabled' : '');      
    }
    else {
      return (self.selectedLoc + 1 >= self.editCards.length || self.selectedLoc + 1 >= self.cardMax ? 'disabled' : '');
    }
  }

  public changeSelected(dir, loc) {
    var self = this;
    
    if (dir == "jump") {
      self.selectedLoc = loc;
    }
    else if (dir == "next") {
      self.selectedLoc = (self.selectedLoc + 1 >= self.editCards.length || self.selectedLoc + 1 >= self.cardMax ? self.selectedLoc : self.selectedLoc + 1);
    }
    else if (dir == "prev") {
      self.selectedLoc = (self.selectedLoc <= 0 ? self.selectedLoc : self.selectedLoc - 1);
    }

    self.selectedCard = self.editCards[self.selectedLoc];
  }

  public addCardList() {
    var self = this;
    var lgth = (self.cardMax - self.editCards.length);

    return new Array(lgth);
  }

  public addCard(){
    var self = this;
    var blankLines = [new LineTypeModel("", "p",false)];
    var blankCard = new AnnouncementModel(-1,null,'card-img','', blankLines);

    self.editCards.unshift(blankCard);
    self.changeSelected('jump', 0);
  }
  public isActive(loc) {
    var self = this;
    return (self.selectedLoc == loc ? 'active' : '');
  }

 public addLine(){
  var self = this;
  self.selectedCard.lines.push(new LineTypeModel("", "p",false));
 }

 public removeLine(index){
   var self = this;
   self.selectedCard.lines.splice(index,1);
 }

 public szChange(index){
  
  var szChart = ["p","h2","h1"];
  var szIndex = szChart.indexOf(this.selectedCard.lines[index].size);

  if(szIndex+1 == szChart.length){
    this.selectedCard.lines[index].size = szChart[0];
  }
  else {
    this.selectedCard.lines[index].size = szChart[szIndex+1];
  }
 }

 public boldChange(index){
  this.selectedCard.lines[index].bold = (this.selectedCard.lines[index].bold == false ? true : false);
 }
}
