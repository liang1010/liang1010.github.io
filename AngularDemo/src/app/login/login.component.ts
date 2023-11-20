import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { ConfigService } from '../shared/services/config.service';
import { DependenciesService } from '../shared/services/dependencies.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private dependenciesService: DependenciesService
  ) { }
  test;
  ngOnInit(): void {
    if (this.authService.token)
      this.dependenciesService.navigateByUrl('admin/dashboard');
    this.test = this.configService.configValue.apiUrl
  }
  fg: FormGroup = this.createForm();

  createForm(): FormGroup {
    let fg = new FormGroup({});
    fg.addControl('username', new FormControl('string', Validators.required));
    fg.addControl('password', new FormControl('Password@1', Validators.required));
    return fg;
  }

  onSubmit() {
    this.fg.markAllAsTouched();
    if (this.fg.valid) {
      // Here, you can implement your login logic, such as making an API request to authenticate the user.
      // For this example, let's just display the form values.
      console.log('Form values:', this.fg.value);
      this.authService.login(this.fg.get('username').value, this.fg.get('password').value).subscribe();
    }
  }
}
