import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from  '@angular/forms';
import Swal from 'sweetalert2';
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
        userId: this.userId, file: ['']
      });
    })
  }

  onFileChange(event) {
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.form.get('file').setValue(file);
      document.getElementById('selected-file').innerText = event.target.files[0].name;
    }
  }

  onSubmit() {
    const fileName = document.getElementById('selected-file').innerText;

    if(this.form.get('file').value != [''])
    {
      if(fileName.includes('.zip'))
      {
        Swal.fire({
          title: 'Tải file lên? - Upload the file?',
          html: "Xin hãy kiểm tra lại file ZIP đã theo chuẩn SCORM!<br>(Please make sure your ZIP file follows SCORM standard!)",
          icon: 'question',
          focusCancel: true,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Upload!',
        })
        .then((result) => {
          if (result.value)
          {
            const repoName = fileName.substring(0, fileName.lastIndexOf('.'));
            this.uploadService.checkDuplicateObs(this.userId, repoName).subscribe((queryArr) => {
              if(queryArr.length != 0)
              {
                Swal.fire({
                  title: 'File bị trùng tên! - File with the same name found!',
                  html: "Bạn có muốn xóa file cũ và đăng file mới lên?<br>(Do you wish to overwrite your old file?)",
                  icon: 'warning',
                  focusCancel: true,
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Có! / Yes!',
                })
                .then((result) => {
                  if(result.value)
                  {
                    this.uploadAfterSubmit();
                  }
                });
              }
              else
              {
                this.uploadAfterSubmit();
              }
            });
          }
        });
      }
      else
      {
        Swal.fire({
          title: 'Không phải file ZIP! - Not a ZIP file!',
          html: 'Xin hãy chọn file ZIP trong thiết bị của bạn...<br>(Please select a ZIP file from your device...)',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
    else
    {
      Swal.fire({
        title: 'Chưa có file! - No file!',
        html: 'Xin hãy chọn file ZIP trong thiết bị của bạn...<br>(Please select a ZIP file from your device...)',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  private uploadAfterSubmit() {
    const formData = new FormData();
        
    formData.append('userId', this.form.get('userId').value);
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
