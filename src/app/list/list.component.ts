import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Scorm } from './scorm';
import { ListService } from './list.service';
import { UserIdService } from '../user-id.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private routeSub: Subscription;
  userId: string;
  scorms: Scorm[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listService: ListService,
    private userIdService: UserIdService
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.pipe(
      mergeMap(params => {
        this.userId = params['user_id'];
        return this.listService.getScorms(this.userId);
      })
    ).subscribe(res => {this.scorms = res});
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  navToUpload(): void {
    this.userIdService.passUserId(this.userId);
    this.router.navigate(['/upload']);
  }

}
