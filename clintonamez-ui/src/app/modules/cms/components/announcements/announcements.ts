import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

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
  public uploader:FileUploader = new FileUploader({url: this.coreService.getUploadUrl('announcements')});
  public initialCards: AnnouncementModel[];
  public editCards: AnnouncementModel[];
  public selectedCard: AnnouncementModel;
  public selectedLoc: number;
  public cardMax = 5;

  constructor(private authService: AuthService, private coreService: CoreService) { }

  ngOnInit() {
    this.loadAnnouncements();
  }

  public loadAnnouncements() {
    var self = this;
    this.coreService.getAnnouncements(function (res) {
      if (res.errorMessage == null) {
        self.initialCards = res.results;
        self.editCards = res.results;

        self.selectedCard = (self.editCards && self.editCards.length > 0 ? self.editCards[0] : null);
        self.selectedLoc = 0;
      }
    });
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
