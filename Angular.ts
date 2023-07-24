// ! Installation --------------------------------------------------------------------------------//
1-1 Global Install : npm i -g @angular/cli
1-2 Local Install : npm i @angular/cli
2 - Generate Project : Project Folder location > ng new project-name
3 - Lunch The Localhost : ng serve -o
4 - Integration : in `src/index.html` we link our framworks and libraries.
// !----------------------------------------------------------------------------------------------//


// *Components------------------------------------------------------------------------------------//
1 - Components are a basics folders includes 3 files (html,css,ts) ,The role of this topic is to make
    a reusable and dynamic code for frequent used elements in web (Navbar,form,buttons...).
2 - Create a Component : ng g c name-of-comp
3 - Components are located in src\app\components\.....
4 - We Write The Code Directly in `src\app\components\nameC` Files.
5 - To use The Created Component We Go To `src\app\app.components.html` and we delete everything
    From it ,Then we write our component tag like That `<app-nameC></app-nameC>`
// *----------------------------------------------------------------------------------------------//


// *Data Linking------------------------------------------------------------------------------------//
1 - To Pass Data From Ts To HTML (Interpolation):
	* - In TS Files We Can Either Create a Simple Variable (n=1) or a function with work flow
	(getname(){if (this.n == 1){return "true"}})
	* - In HTML File We Show Our Variable Like This In any Tag {{n}} ,function like {{getname()}}  
	

2 - To Pass Data From HTML To Ts (Property Binding):
	* - In TS Files We Can Create  a function with work flow(alertShow(){if (1== "1"){alert("true")}})
	* - In HTML File We Write This As A proprety inside TAG  (click)="alertShow()" this will triger
		The alertShow() Function And Run It.
		
		
3 - Two Way Binding :
	1 - First Way :
		* - In app.module.ts we add this `FormsModule` Inside Imports .
		* - Then In input We Add This As a Property `   [(ngModel)]="Message"  `
		* - Anything We Going To Write It Will Store Inside {{Message}} 
	2 - Second Way :
		* - Then In input We Add Those As a Property ` #Message  (keyup)="0" `
		* - Anything We Going To Write It Will Store Inside {{Message.value}} 
		
// *----------------------------------------------------------------------------------------------//



// *Navigation (Routing)-------------------------------------------------------------------------//
1 - In app-routing-module.ts ,inside const routes: Routes = []; We Write Our Pages Location Like :
	{path : "Watever-You-Want" , component :NameOfCompenantComponent}
2 - In app-component.html We Delete EveryThing Then We Write This `<router-outlet></router-outlet>`
3 - To Make The Default Page like ` 1 - ` insted of "Watever-You-Want" We Write "" To Make This
	Page The Default One.
4 - In Each Component Page We Want To Go To it We Add Those Lines :
	1 - //In TS File After Class :
	constructor(private router : Router){}
	LinkP(){
      this.router.navigate(["/page"])
    }
	//In HTML File In each Button Link :
	Add This as Argument : (click)="LinkP()"
	
	2 - //This Way Is Better In TS File We Dont need to write a function :

    }
	//In HTML File In each Button Link :
	Add This as Argument : routerLink="/page"
// *----------------------------------------------------------------------------------------------//








// *ngIf  ----------------------------------------------------------------------------//
1 - Basic usage:
    <div *ngIf="condition">
      Content to show when condition is true Including This Current Tag With Its Style etc.
    </div>

2 - Else If :
	// IF 
    <div *ngIf="condition1; else template1">
      Content to show when condition1 is true.
    </div>
	// Else If
    <ng-template #template1>
      <div *ngIf="condition2; else template2">
        Content to show when condition2 is true.
      </div>
	// Else
      <ng-template #template2>
        Content to show when condition2 is false.
      </ng-template>
    </ng-template>
	
// *----------------------------------------------------------------------------------------------//



// *ngFor  --------------------------------------------------------------------------------------//
Used For Showing Dynamicly Content located In Object,db or json file :

1 - IN Compenant TS File:
	We Write Our Json File Inside export class


2 - In Html Compenant File We Add This As Attribut In Specific Tag We Want To Display it Foreach
	And The Its Elements Inside : *ngFor="let item of jsonData"

3 - Inside This Tag We Gonna Display Each Of Data's In json object : {{item.title}}
// *----------------------------------------------------------------------------------------------//





// ngSwitch  --------------------------------------------------------------------------------------//
Used For Showing Result Based On Certain Creteria :
// TS File -> Age = 18

<div [ngSwitch]="Age">
	<div *ngSwitchCase="'18'">Allowed </div>
	<div *ngSwitchCase="'5'">To Young </div>
	<div *ngSwitchCase="'94'">To Old </div>
</div>

The Result Should Be : Allowed
// *----------------------------------------------------------------------------------------------//



// ngClass  --------------------------------------------------------------------------------------//
Used For Adding Class Based On Certain Creteria :
// HTML File -> 
We add Something Like This :
<span 
[ngClass]="{
   'bg-info':item.stat,     // If `stat` key in jsonObject is True is add this class 
   'bg-danger':!item.stat   // Else If `stat` key in jsonObject is false is add this class instead
}" 
class="badge">
// *----------------------------------------------------------------------------------------------//





// Services  -------------------------------------------------------------------------------------------------//
-Services Is Used For Dynamic Data Manipulation , is Flexible So it can Be Used in any Compenant
-Services Used For Https Request (get-post...),For CRUD Operations , Database Manipulation etc ...

1 - Generate A Service : ng g s nameService
2 - Calling A Service : In Specific Compenant We Add This Inside constructor(private nameService: nameService)
3 - Basic Usage :
	- In The Service TS File We Write Our Code(create object, call http request, crud functions ...)
	- We Create an empty array(arr:any) after export class line
	- We Write Our Function,Example Filling the empty array with object written inside service :
		getList() {
			this.arr = this.nameService.objectVariable;
		}
	- Inside ngOnInit We Call This Method : ngOnInit(): void {this.getList();}
	- In Compenant HTML File We Show Result : *ngFor="let item of arr" {{ item.title }}


// *---------------------------------------------------------------------------------------------------------//


// Observable  -------------------------------------------------------------------------------------------------//
Observable is like a stream of data that you can subscribe to, and it will notify you whenever new data 
arrives or when an error occurs.

1 - Create a new service to get data from api url : // This Will get The encoded data from the php file and 
													// store them whithing the getUsers() function .
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// inside class :
  private apiUrl = 'https://localhost/FB/users.php'; 

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }


2 - Create a new Compenant To Show data :
// After Class We Create An Empty Array To Store Those Data's
users: any[] = [];

// Then We Call The Service Inside constructor 
  constructor(private userService: UserService) { }

  ngOnInit() {
// Here We subscribe to the service function and store those Data's inside users Array
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
3 - In The Same Last Created Compenant HTML We Show Our Results :
<div *ngFor="let user of users">{{ user.name }}</div>
// *---------------------------------------------------------------------------------------------------------//


//? Pipe --------------------------------------------------------------------------------------------------------------//
* - Pipes Is A Display Function Used To Manipulate Data To A Specific Format : // Syntax : {{var | pipe}}
1 - String Pipes :

var = "Hello world"
{{var | lowercase}}                           -> hello world
{{var | uppercase}}                           -> HELLO WORLD
{{var | titlecase}}                           -> Hello World
{{var | slice:s inc:e}} - {{var | slice:5:9}} -> wor

2 - Json Pipe :
var = {name:"hello",age:21}
{{var | json}}  ->  {name:"hello",age:21}

3 - Date Pipes (short-medium-long):
var = new Date()
{{var | date }}  ->  July 23,2023
{{var | date:'short' }}  ->  7/23/23, 18:42 PM
{{var | date:'shortTime' }}  -> 18:42 PM
{{var | date:'shortDate' }}  ->  7/23/23

4 - Number Pipe :
number:'Integer char-lenght.Decimal char-lenght min-max'
{{2.1574 | number:'2.2-3' }}  ->  02.15

5 - Percentage Pipe :
{{0.2 | percent }}  ->  20%

6 - Currency Pipe :
{{28 | currency }}  ->  $28
{{20 | currency:'EUR' }}  ->  €20
{{18 | currency:'EUR':'code' }}  ->  EUR18
// *-------------------------------------------------------------------------------------------------------------------//



//? Form Validation ---------------------------------------------------------------------------------------------------//
* - Form Validation Used To Filter And Sanitize And Control The Users Input Values :
1 - We Create Our Form Normaly With HTML.
2 - In Each Input We Add Those As A Attributs `ngModel name='Example' #Example="ngModel"`
3 - We Add The Validation Attributs Like `required minlength="" maxlength="" pattern="" `
4 - After Input We Add The Field That Will Appear If Any Error Occured : {
	<div class="style for error" *ngIf="Example.touched && !Example.valid"></div>
}
5 - Inside That Field We Add For Each Error A Block With The Message : {
	<div *ngIf="Example.errors.required">This Field Is Required</div>
	<div *ngIf="Example.errors.minlength">Minimum length Is 8 Charachters</div>
	<div *ngIf="Example.errors.maxlength">Maximum length Is 24 Charachters</div>
	<div *ngIf="Example.errors.pattern">The Password Should Contain A-Z a-z 1-9</div>
}

6 - To Add A Specific Styling Error To The Input In Both Invalid And Valid We Write Some Styling To The Main css File :
// Assuming We Add `form-control` class to each input :

Invalid :
.form-control.ng-touched.ng-invalid{
	border-bottom:2px solid red;
}

Valid :
.form-control.ng-valid{
	border-bottom:2px solid green;
}

// *-------------------------------------------------------------------------------------------------------------------//



//? Binding Form Data To A Model --------------------------------------------------------------------------------------//
* - Binding Form Data To A Model Allowing Form To Sent The Input Values After Submitting To Save it 
Or Whatever You Gonna use it.

1 - Create A New class inside models Folder:
ng g class models/classN
// Inside This classN.ts
export class classN{
	id:number;email:string; .....
}

2 - Initialising The Class In Form Component TS File :
// After Export class ...
public classN = ClassNModel;
// Inside constructor 
this.classN=new ClassNModel()

3 - Setting The HTML File To Send Datas :
// Inside Form Tag:
#form="ngForm" (submit)="SubmitFunction(form)"

// Make Sure That The Form Has A submit Button


4 - Inside Each Input Tag :
[(ngModel)]="classN.email"

5 - Making The Capture Function In Form Component TS File To Procces The Values :
// Inside constructor After ngOnInit
SubmitFunction(form:NgForm){
	console.log(this.classN)
// Other Proccessing Like Sending Those Values To Database
}
// *-------------------------------------------------------------------------------------------------------------------//



//? Password Confirmation ---------------------------------------------------------------------------------------------//
* - Password Confirmation Used To Compare The Both Password To Achieve User Password Memoration:
1 - Assuming That We Have Already Made A Password input Like Those Exapmles We Make Before .
1 - In Confirm Password Input We Add Those As A Attributs `#pwCon="ngModel" [(ngModel)]="conPw" pattern={{classN.password}} required`
3 - We Add The Validation Attributs Like `required minlength="" maxlength="" pattern="" `
4 - After Input We Add The Field That Will Appear If Any Error Occured Like(Form Validation - 5)
}


// *-------------------------------------------------------------------------------------------------------------------//




//? Http Get Data From API ---------------------------------------------------------------------------------------------//
* - We Use Http Get Request To Fetch Data From An api or A Database To Show Them In Our Page.
1 - Create A New Service : ng g s services/nameS
2 - In app.module.ts We Add HttpClientModule in Imports 
3 - Inside This Service TS File We instantiate And Inject HttpClientModule :
	constructor(private http : HttpClient){}
4 - We Set Our api (json-file,php list page encoded with json,json placeholder,web scraped Object...)
5 - Inside constructor we Gonna Create a Function to Get those fetched datas :
	// After constructor(...){}
	public getDataHttp(){
		let datas = this.http.get<any>("Link Of api ,Example : https://www.localhost.com/users/list.php")
		return datas
	}
6 - In Component We Gonna Show The Results In It :
// After export class { ,We create A Empty Variable To Store Those Datas :
	public datasTable = []

// Inject and instantiate Our Created Service inside constructor:
	,private nameS : NameSService

// Inside Export Class ,We create The Function That subscribe to http Request and store its Datas to datasTable[] :
getApiData(){
	this.nameS.getDataHttp().subscribe(
	result => {this.datasTable = result;console.log(result)}
	)
}

// Inside ngOnInit(){ We Call This Function :
this.getApiData()

7 - Show The Results In Compenent HTML File :
<div *ngFor="let data of datasTable">{{data.name}}</div>

// *-------------------------------------------------------------------------------------------------------------------//




//? Behavior Subject (Data from Component to Component) ------------------------------------------------------//
Used for sharing data between components, and it can be particularly useful for scenarios like searching.
1 - Create Two Components: SenderComponent and ReceiverComponent.
2 - In the SenderComponent, create a form to send data. You can add form validation as needed.
3 - Add the submit event to the form tag to trigger the sendValue(form) function. Also,
add the reference #form="ngForm" to the form tag.
4 - Add the name="inputValue" and [(ngModel)]="inputValue" attributes to the input field(s) in the SenderComponent.
 This will bind the input value to the inputValue variable in the component.
5 - Create a new service to return and store the value using BehaviorSubject:
// Create a new variable to instantiate the BehaviorSubject before the constructor:
inputValueSubject = new BehaviorSubject<string>("");
// Create a function to set the value after the constructor:
setValue(inputValue: string) {
this.inputValueSubject.next(inputValue);
}
6 - In the SenderComponent's TS file, process the values submitted by the form:
// After constructor import your service
import { YourService } from '../services/your-service';
// Inside the constructor, inject the service:
constructor(private yourService: YourService) {}
sendValue(form: NgForm) {
  this.yourService.setValue(this.inputValue);
}
7 - In the ReceiverComponent, subscribe to the BehaviorSubject to receive the data sent from the SenderComponent:
// After constructor import your service
import { YourService } from '../services/your-service';
// Inside the constructor, inject the service:
constructor(private yourService: YourService) {}
// Inside ngOnInit, subscribe to the BehaviorSubject:
ngOnInit() {
  this.yourService.inputValueSubject.subscribe((value) => {
    // Do something with the received value in the ReceiverComponent
    console.log('Received value:', value);
  });
}
Now, when you submit the form in the SenderComponent, the inputValue will be sent to the ReceiverComponent through the BehaviorSubject, and the ReceiverComponent will receive and log the value.

This way, you have established communication between components using BehaviorSubject, allowing you to share data between them efficiently.
//----------------------------------------------------------------------------------------------------------------------------//









//? Vocabulary --------------------------------------------------------------------------------------------------------------//

1 - Injection : When We Create a Method inside constructor we call it Injection -- constructor(private %userService%)
2 - Instantiation : When We Inject A Service Inside Class VScode Automaticly show the service name this Called Instantiation
3 - Interface : Is Those (any,number...) , So If We Want To get some infos from server we make an Interface.
	Example : ng g i models/nameInter -> export interface nameInter {id?:number..} -> arr: nameInter[] = [];



// *-----------------------------------------------------------------------------------------------------------------------//








