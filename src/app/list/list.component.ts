import { Component, OnInit } from '@angular/core';
import { Scorm } from './scorm';
import { ListService } from './list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  scorms: Scorm[];

  constructor(private listService: ListService) { }

  ngOnInit(): void {
    this.listService.getScorms().subscribe(res => {this.scorms = res; console.log(res, this.scorms)})
  }

  pathClick(repoName, repoUrlName): void {
    this.listService.accessScorm(repoName, repoUrlName);
  }

}
