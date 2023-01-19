import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Match } from './form';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder) { }

  registerForm: any;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        dob: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\$@$!%*?&].{5,30}')]],
        confirmPassword: ['', [Validators.required, Validators.minLength(5), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\$@$!%*?&].{5,30}')]]
      },
      {
        validators: Match('password', 'confirmPassword')
      }
    );
  }

  //Image

  listOfFiles: any[] = [];

  onFileChanged(event: any) {
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      if (this.listOfFiles.indexOf(selectedFile.name) === -1) {
        this.listOfFiles.push(selectedFile.name);
      }
    }
  }
  removeSelectedFile(index: number) {
    this.listOfFiles.splice(index, 1);
    alert('Did you want to delete the file?')
  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    alert("Registered Successfully!!")
    console.log(this.registerForm.value, this.listOfFiles);
  }
}


