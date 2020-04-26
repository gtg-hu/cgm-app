import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainFrameComponent } from './main-frame/main-frame.component';
import { ContractFormComponent } from './contract-form/contract-form.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { HttpService } from './http-client/http-service';

@NgModule({
  declarations: [
    AppComponent,
    MainFrameComponent,
    ContractFormComponent,
    ContractListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	MatExpansionModule,
	BrowserAnimationsModule,
	[ReactiveFormsModule, FormsModule], 
	MatFormFieldModule,
	MatGridListModule,
	MatButtonModule,
	HttpClientModule,
	MatTooltipModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
