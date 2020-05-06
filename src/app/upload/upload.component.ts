import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from  '@angular/forms';
import { UploadService } from  './upload.service';
import { UserIdService } from '../user-id.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  userId: string

  form: FormGroup;
  error: string;
  uploadResponse = { status: '', message: '', filePath: '' };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    private userIdService: UserIdService
  ) { }

  ngOnInit(): void {
    this.userIdService.userIdObs.subscribe(userId => {
      this.userId = userId;

      this.form = this.formBuilder.group({
        userId: this.userId, tutor: '', file: ['']
      });
    })
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('file').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();

    this.form.get('tutor').setValue((document.getElementsByName('tutor')[0] as HTMLInputElement).value);
    
    formData.append('userId', this.form.get('userId').value);
    formData.append('tutor', this.form.get('tutor').value);
    formData.append('file', this.form.get('file').value);

    this.uploadService.upload(formData).subscribe(
      (res) => this.uploadResponse = res,
      (err) => this.error = err
    );
  }

  navToList(): void {
    this.router.navigate(['/list', this.userId]);
  }

}
