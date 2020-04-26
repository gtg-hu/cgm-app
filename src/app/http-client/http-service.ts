import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { from, Observable, throwError} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Contract } from '../model/contract';

const baseUrl = "http://localhost:3000"; //"http://localhost:8080";
const options = {headers: new HttpHeaders({
	'Content-Type': 'application/x-www-form-urlencoded',
	'Accept': 'application/json'})};


@Injectable()
export class HttpService {
	contracts: Contract[];
	
	constructor(private http: HttpClient) {}
	
	public getAll(): Observable<any> {
		return this.http.get(baseUrl + "/api/contracts", options).pipe(
			catchError(err => 
			{
				console.log("error:", err);
				return throwError('error by get all!');
			})
		);
	}
	
	public get(term: string): Observable<any> {
		return this.http.get(baseUrl + "/api/contract/" + term, options).pipe(
			catchError(err => 
			{
				console.log("error:", err);
				return throwError('error by get!');
			})
		);
	}
	
	public put(contract: Contract): Observable<any> {
		return this.http.put(baseUrl + "/api/contract/" + contract.contractNumber, JSON.stringify(contract), options).pipe(
			catchError(err => 
			{
				console.log("error:", err);
				return throwError('error by put!');
			})
		);
	}
	
	public delete(contract: Contract): Observable<any> {
		return this.http.delete(baseUrl + "/api/contract/" + contract.contractNumber, options).pipe(
			catchError(err => 
			{
				console.log("error:", err);
				return throwError('error by delete!');
			})
		);
	}
	
	public post(contract: Contract): Observable<any> {
		return this.http.post<Contract>(baseUrl + "/api/contract", JSON.stringify(contract), options).pipe(
			catchError(err => 
			{
				console.log("error:", err);
				return throwError('error by save!');
				
			})
		);
	}
}
