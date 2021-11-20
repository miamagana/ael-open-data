import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadDataService } from './load-data.service';
import { Measure } from './models/data.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  measures$: Observable<Measure[]> = new Observable<Measure[]>();
  constructor(private readonly loadDataService: LoadDataService) {}

  ngOnInit(): void {
    this.measures$ = this.loadDataService.loadData();
  }
}
