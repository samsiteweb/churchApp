import { Component, OnInit } from '@angular/core';
import { TopLoaderService } from 'src/app/services/top-loader.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  constructor(private loaderService: TopLoaderService) { }

  ngOnInit(): void {
  }

}
