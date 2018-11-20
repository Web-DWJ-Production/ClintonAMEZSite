import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';

/* Models */
import { BibleStudyModel } from '../../../../datamodels/bibleStudyModel';
/* Services */
import { CoreService } from '../../../../services/coreServices';

@Component({
  selector: 'pg-getConnected',
  templateUrl: './getConnected.html',
  styleUrls: ['./getConnected.less']
})
export class GetConnectedComponent implements OnInit {
  public bibleStudyInfo: BibleStudyModel[] = [];
  public displayedColumns: string[] = ['date', 'title', 'download'];
  public dataSource;

  @ViewChild(MatSort) sort: MatSort;
  constructor(private coreService: CoreService) { }
  
  ngOnInit() { 
      this.loadBibleStudy();
  }   

  public loadBibleStudy(){
      var self = this;
      
    self.coreService.getBibleStudy( function(res){
        self.bibleStudyInfo = res.results;
        self.dataSource = new MatTableDataSource(self.bibleStudyInfo);
        self.dataSource.sort = self.sort;
    });
  }
}
