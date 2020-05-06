import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Scorm } from './scorm';
import { ListService } from './list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private routeSub: Subscription;
  userId: number;
  scorms: Scorm[];

  constructor(private route: ActivatedRoute, private listService: ListService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.pipe(
      mergeMap(params => {
        this.userId = params['id'];
        return this.listService.getScorms();
      })
    )
    .subscribe(res => {this.scorms = res});
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}
