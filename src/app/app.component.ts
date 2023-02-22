import {Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {AppService} from "./app.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
  items$: Observable<any[]> = this.appService.items$;

  constructor(private appService: AppService) {
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
    this.appService.send(user, description);
    this.appService.loadItems();
  }
}
