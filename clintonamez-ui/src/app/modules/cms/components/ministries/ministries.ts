import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

/* Data Models */
import { MinistryModel } from '../../../../datamodels/ministryModel';

/* Service */
import { AuthService } from '../../../../services/authServices';
import { CoreService } from '../../../../services/coreServices';

@Component({
  selector: 'cms-ministries',
  templateUrl: './ministries.html',
  styleUrls: ['./ministries.less', '../../cms.styles.less']
})
export class MinistriesComponent implements OnInit {
  public ministryList: MinistryModel[];
  constructor(private authService: AuthService, private coreService: CoreService) { }
  
  ngOnInit() { this.getMinistries();} 

  getMinistries(){

  }
}
