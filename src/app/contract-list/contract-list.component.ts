import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface Record {
	item: number;
	name: string;
	surname: string;
	contractNumber: string;
	city: string;
}

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss']
})

export class ContractListComponent implements OnInit {  
  @Input() records: Record[];
  @Output() contractSelect = new EventEmitter<Record>();
  
  constructor() { }

  ngOnInit() {
  }
  
  onSelectedRow(rec:Record) {
	  this.contractSelect.emit(rec);
  }

}
