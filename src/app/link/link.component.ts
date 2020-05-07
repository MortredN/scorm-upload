import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import copy from 'copy-to-clipboard';
import Swal from 'sweetalert2';
import { UserIdService } from '../user-id.service';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {

  userId: string;

  constructor(
    private router: Router,
    private userIdService: UserIdService
    ) { }

  ngOnInit(): void {
    this.userIdService.scormURLObs.pipe(
      mergeMap((scormUrl) => {
        (document.getElementById('copy-url') as HTMLInputElement).value = scormUrl;
        return this.userIdService.userIdObs;
      })
    ).subscribe((userId) => {
      this.userId = userId;
    });
  }

  copyToClipboard(): void {
    copy((document.getElementById('copy-url') as HTMLInputElement).value);
    Swal.fire({
      title: 'Đã copy! - Copied!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  navToList(): void {
    this.router.navigate(['/list', this.userId]);
  }

}
