import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

/* Data Models */
import { AnnouncementModel } from '../../../../datamodels/announcementModel';

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

  public isActive(loc) {
    var self = this;
    return (self.selectedLoc == loc ? 'active' : '');
  }
}
