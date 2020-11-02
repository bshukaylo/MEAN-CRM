import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MaterialService} from "../shared/classes/material.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: FormGroup
  subscription: Subscription

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe(
      (params: Params) => {
        if (params['registered']) {
          MaterialService.toast('Теперь вы можете войти в систему')
        } else if (params['accessDenied']) {
          MaterialService.toast('Для начала авторизуйтесь')
        } else if (params['sessionExpired']) {
          MaterialService.toast('Пожалуйста войдите в систему заново.')
        }
      }
    )
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  onSubmit(): void {
    this.form.disable()
    //т.к. в this.form.value всего 2 компонента password и email - это и есть требуемый для логина юзер:
    this.subscription = this.auth.login(this.form.value).subscribe(
      () => {
        this.router.navigate(['overview/'])
      },
      (error) => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )
  }

}
