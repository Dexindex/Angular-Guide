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


























//? Crud Operations With Angular -----------------------------------------------------------------//
1 - In src\app\app.module.ts We Add Those Lines :
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
@NgModule ({
    imports:[
        HttpClientModule,
        FormsModule
    ]
})

2 - Then We Gonna Create A Service :
ng g s services/nameS




///////////  LIST  //////////
// Notes : Click In The :Yellow Bulb To Auto import the modules

3 - In src\app\services\nameS.service.ts We Add This inside the constructor(private http: HttpClient){} :
ListI(){return this.http.get<Task[]>("http://localhost:5000/tasks")}


4 - In src\app\components\nameS\nameS.components.ts We Add This inside the constructor(private taskService: TaskService){} :
tasks: Task[]=[]
getListI(){this.taskService.ListI().subscribe(tasks => this.tasks = tasks)}
ngOnInit(){this.getListI()}

5 - Then We Gonna Create An Interface :
ng g i models/task

we gonna open src\app\models\task.ts
Then We Gonna Write on it those codes :
export interface Task{
    id?:number;
    etc:etc...
}

6 - In Html Component :
<div *ngFor="let task of tasks">{{task.name}}</div>


//? ----------------------------------------------------------------------------------------------//