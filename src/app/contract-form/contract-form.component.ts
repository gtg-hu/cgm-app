import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Contract } from '../model/contract';
import { HttpService } from '../http-client/http-service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Methods, CurEvent } from '../events/cur-event';

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.scss']
})

export class ContractFormComponent implements OnInit {
  @Input() model:Contract;
  @Input() disDeleteBtn;
  @Output() contractChange = new EventEmitter<CurEvent>();
  @Output() formClean = new EventEmitter<boolean>();
  
  label = {
	contractNumber: 'Vertragsnummer:',
    name: 'Vorname:',
	surname:'Nachname:',
	birthday: 'Geburtstag:',
	street: "Straße:",
	houseNumber: "Nummer:",
	city: "Stadt:",
	plc: "PLZ:"
  }
  
  disSaveBtn = true;
  
  constructor(private httpService: HttpService) { }

  ngOnInit() {
	  this.initModel();
  }
  
  save(event) {
	  if (this.model.contractNumber) {
		  console.log("to update the contract!");
		  this.update();
	  } else {
		  console.log("to create a new contract!");
		  this.create();
	  }
  }
  
  delete(event) {
	  console.log("to delete the contract!");
	  this.remove();
  }
  
  formCleaned() {	  
	  this.disSaveBtn = true;
	  this.disDeleteBtn = true;
	  this.initModel();
	  this.resetAllInvalid();
	  this.formClean.emit(true);
  }
  
  dataChanged() {
	  this.disSaveBtn = false;
	  this.disDeleteBtn = true;
	  //input a new contract, without a contract number yet, should not emit the event
	  if (this.model.contractNumber) {
		  let evt:CurEvent = {method: Methods.U, contract: this.model};
		  this.contractChange.emit(evt);
	  }
  }
  
  private initModel() {
	  this.model = new Contract(null, null, null, null, null, null, null, null);
  }
  
  private resetAllInvalid() {
	  let elems = document.getElementsByTagName("form");
	  elems[0].reset();
  }
  
  //put
  private update() {
	  this.httpService.put(this.model).subscribe( 
	    response => {
		  console.log("update succed!");
		  this.model = response;
		  this.model.birthday = Contract.getShortBirthday(response.birthday)
		  
		  this.disSaveBtn = true;
		  this.disDeleteBtn = false;
		  let evt:CurEvent = {method: Methods.U, contract: this.model};
		  this.contractChange.emit(evt);
	    },
		error => {
			console.log("update request failed with error!", error);
		});
  }
  
  //post
  private create() {
	  let valid = this.isInputValid();
	  
	  if (valid) {
		  this.httpService.post(this.model).subscribe( 
			response => {
				console.log("create succed!");
				this.model = response;
				this.model.birthday = Contract.getShortBirthday(response.birthday);
				
				this.disSaveBtn = true;
				this.disDeleteBtn = false;
				let evt:CurEvent = {method: Methods.C, contract: this.model};
				this.contractChange.emit(evt);
			},
			error => {
				console.log("create request failed with error!", error);
			});
	  }
  }
  
  private isInputValid(): boolean {
	  let formElem = document.getElementsByTagName("form").item(0);
	  
	  if ( formElem.fname.validity.valueMissing 
		|| formElem.fname.validity.patternMismatch 
		|| formElem.fname.validity.tooLong ) return false;
		
	  if ( formElem.surname.validity.valueMissing 
		|| formElem.surname.validity.patternMismatch 
		|| formElem.surname.validity.tooLong ) return false;
	  
	  if ( formElem.birthday.validity.valueMissing 
		|| formElem.birthday.validity.patternMismatch ) return false;
	
	  if ( formElem.street.validity.valueMissing  
		|| formElem.street.validity.tooLong ) return false;
	  
	  if ( formElem.houseNo.validity.valueMissing  
		|| formElem.houseNo.validity.tooLong ) return false;
		
	  if ( formElem.city.validity.valueMissing  
		|| formElem.city.validity.tooLong ) return false;
		
	  if ( formElem.plc.validity.valueMissing 
		|| formElem.plc.validity.patternMismatch ) return false;
	  
	  return true;
  }
 
  //delete
  private remove() {
	  this.httpService.delete(this.model).subscribe( 
	    response => {
		  console.log("remove succed!");
		  let evt:CurEvent = {method: Methods.R, contract: this.model};
		  this.contractChange.emit(evt);
		  this.formCleaned();
	    },
		error => {
			console.log("remove request failed with error!", error);
		});
  }

}
