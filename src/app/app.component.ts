import {Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {AppService} from "./app.service";
import {Observable} from "rxjs";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
  items$: Observable<any[]> = this.appService.items$;

  constructor(private appService: AppService, private _snackBar: MatSnackBar) {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  title = 'Zerobyte';

  ngOnInit() {
    this.appService.loadItems();
    console.log(this.items$)
  }

  public log() {
    this.appService.items$.subscribe((text: any) => console.log(text));
  }


  public send(user: any, description: any) {

    if(user.length < 5||description.length < 8 )
    {
      this.openSnackBar("Error was occured", "Hide");
    }
    else
    {
      this.openSnackBar("Succesfully sent!", "Hide");
      this.appService.send(user, description);
      this.appService.loadItems();
    }

  }
}
