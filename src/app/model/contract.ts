export class Contract {
  constructor(
	public contractNumber: string,
	public name: string,
	public surname: string,
	public birthday: string,
	public street: string,
	public houseNumber: string,
	public city: string,
	public plc: number) { }
	
	public static getShortBirthday(birthday: string): string {
	  let date = new Date(birthday);
	  let year = date.getFullYear();
	  let m = date.getMonth();
	  let month = m < 10? "0" + m : ""+m;
	  let d = date.getDay();
	  let day = d < 10? "0" + d : ""+d;
	  
	  return "" + year + "-" + month + "-" + day;
  }
}
