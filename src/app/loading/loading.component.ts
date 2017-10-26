import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements AfterViewInit {

  constructor(private router: Router) { }

  ngAfterViewInit() {
    this.router.navigate(['../home']);
  }
}
