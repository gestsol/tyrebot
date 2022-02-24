import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.required, , Validators.pattern(/^.+@.+\..+$/)]],
    password: ['', [Validators.required, Validators.maxLength(8)]]
  });

  loading = false;
  seePassword = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.loading = true
    const email = this.form.get('email')?.value
    const password = this.form.get('password')?.value
    this.sessionService.login(email, password).subscribe(() => {
      this.loading = false;
      this.error = '';
      this.router.navigate(['/'])
    }, (err: string) => {
      this.loading = false;
      this.error = err
    })
  }

}
