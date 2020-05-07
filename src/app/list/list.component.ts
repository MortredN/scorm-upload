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

  linkScorm(repoName, repoUrlName, userId): void {
    this.userIdService.passScormUrl(`http://localhost:3000/play-scorm/${userId}/${repoUrlName}/${repoName}`);
    this.userIdService.passUserId(this.userId);
    this.router.navigate(['/link']);
  }

  navToUpload(): void {
    this.userIdService.passUserId(this.userId);
    this.router.navigate(['/upload']);
  }

  scormSearch(): void {
    const input = document.getElementById("scormSearchInput") as HTMLInputElement;
    var filter, table, tr, td, txtValue;
    filter = input.value.toUpperCase();
    table = document.getElementById("scormList");
    tr = table.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

}
