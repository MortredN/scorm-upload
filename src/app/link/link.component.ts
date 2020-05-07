import { Component, OnInit } from '@angular/core';
import copy from 'copy-to-clipboard';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  copyToClipboard(): void {
    copy((document.getElementById('copy-url') as HTMLInputElement).value);
  }

}
