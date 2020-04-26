import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Contract } from '../model/contract';
import { HttpService } from '../http-client/http-service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Methods, CurEvent } from '../events/cur-event';

export interface Record {
	item: number;
	name: string;
	surname: string;
	contractNumber: string;
	city: string;
}

@Component({
  selector: 'main-frame',
  templateUrl: './main-frame.component.html',
  styleUrls: ['./main-frame.component.scss']
})

export class MainFrameComponent implements OnInit {
  term = new FormControl('');
  showResults = false;
  panelOpenState = false;
  isFormCleand = false;
  
  contracts: Contract[];
  records: Record[];
  
  selectedContract:Contract;
  btnDisable = true;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
	  this.resetSelectedContract();
  }
  
  search() {
	  this.showResults = true;
	  
	  console.log("search: ", this.term.value);
	  if (this.term.value) {
		  this.httpService.get(this.term.value).subscribe( 
			response => {
			  console.log("response received!");
			  //this.contracts = response;
			  this.loadContracts(response);
			  this.loadRecords();
			},
			error => {
				console.log("request failed with error!", error);
				this.showResults = false;
			});
	  } else {
		  this.httpService.getAll().subscribe( 
			response => {
				console.log("response received!");
				//this.contracts = response;
				this.loadContracts(response);
				this.loadRecords();
			},
			error => {
				console.log("request failed with error!", error);
				this.showResults = false;
			});
	  }
  }
  
  updateForm(rec:Record) {
	  console.log("record:", rec);
	  console.log("contracts.length", this.contracts.length);
	  this.selectedContract = this.contracts.find(item => 
		  item.contractNumber == rec.contractNumber);
	  
	  //The formPanel will be opened, when it is closed
	  this.openContractListPanel();
	  this.btnDisable = false;
  }
  
  updateContracts(evt: CurEvent) {
	  let method = evt.method;
	  let contract = evt.contract;
	  if (this.records) {
		  if (Methods.U == method) {
			  let rec = this.records.find(item => item.contractNumber == contract.contractNumber);
			  if (rec) {
				  console.log("update record: ", rec)
				  rec.name = contract.name;
				  rec.surname = contract.surname;
				  rec.city = contract.city;
			  }
			  return;
		  }
		  if (Methods.R == method) {
			  this.records.forEach( (item, index) => {
				  if(item.contractNumber == contract.contractNumber) {
					  console.log("remove record: ", index)
					  this.records.splice(index,1);}
			});
			return;
		  }
	  } else {
		  this.contracts = [];
		  this.records = [];
		  this.showResults = true;
	  }
	  this.contracts.push(contract);
	  let i = this.records.length + 1;
	  let rec = this.createNewRecord(i, contract);
	  this.records.push(rec);
  }
  
  formCleaned(isCleaned: boolean) {
	  if (isCleaned) {
		  this.isFormCleand = isCleaned;
		  this.resetSelectedContract();
		  this.btnDisable = true;
	  }
  }
  
  private loadContracts(response: any) {
	  this.contracts = [];
	  response.forEach( res => {
		  let contract = res;
		  contract.birthday = Contract.getShortBirthday(res.birthday);
		  this.contracts.push(contract);
	  } );
  }
  
  private openContractListPanel() {
	  if (!this.panelOpenState) {
		  let elem = document.getElementById("edit");
		  if (elem) elem.click();
	  }
  }
  
  private loadRecords() {
	  this.records = [];
	  for (let i = 0; i < this.contracts.length; i++) {
		  let rec = this.createNewRecord(i+1, this.contracts[i]);
		  this.records.push(rec);
	  }
  }
  
  private createNewRecord(item: number, contract: Contract): Record {
	  return {item: item, 
			name: contract.name, 
			surname: contract.surname, 
			contractNumber: contract.contractNumber, 
			city: contract.city};
  }
  
  private resetSelectedContract() {
	  this.selectedContract = new Contract(null, null, null, null, null, null, null, null);
  }
  
}
