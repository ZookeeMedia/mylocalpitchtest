import { Component, OnInit } from '@angular/core';
import { MLPDataService } from './mlpdata.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form = new FormGroup({
    pitchID: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required)
   });
   allItems: any;
   pager: any = {};
   pagedItems: any[];
    constructor(public rest:MLPDataService,) { }

    ngOnInit() {
    }
  
    onSubmit(){
      console.log(JSON.stringify(this.form.value));
      let id = this.form.value.pitchID;
      let startDate = this.form.value.startDate;
      let endDate = this.form.value.endDate;
      this.rest.getSlot(id, startDate, endDate).subscribe((data: {}) => {
        console.log(data['data']);
        this.allItems = data['data'];
        this.setPage(1);
      });
    }
    setPage(page: number) {
      if (page < 1 || page > this.pager.totalPages) {
          return;
      }

      // get pager object from service
      this.pager = this.rest.getPager(this.allItems.length, page);

      // get current page of items
      this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}