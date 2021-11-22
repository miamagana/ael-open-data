import { Component, OnInit } from '@angular/core';
import { LoadDataService } from './load-data.service';
import { Measures } from './models/data.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  measures!: Measures;
  constructor(private readonly loadDataService: LoadDataService) {}

  ngOnInit(): void {
    this.loadDataService.loadData().subscribe((data) => {
      this.measures = data;
    });
  }
}
