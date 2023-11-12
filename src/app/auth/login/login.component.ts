import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userdata: any;

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {
    sessionStorage.clear();
  }

  loginForm = this.fb.group({
    username: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required),
  })

  login() {
    if (this.loginForm.valid) {
    //   this.authService.register(this.loginForm.value).subscribe(
    //     res => {
    //       this.toast.success('enregistrement complet, contactez le support pour les accès');
    //       this.router.navigate(['']);
    //     }
    //   );
    // } else {
    //   this.toast.warning('données incorrectes');
      
      this.authService.getById(this.loginForm.value.username).subscribe(
        res => {
          this.userdata = res;
          console.log(this.userdata);
          if(this.userdata.password === this.loginForm.value.password) {
            if(this.userdata.isActive) {
              sessionStorage.setItem('username', this.userdata.id);
              sessionStorage.setItem('userrole', this.userdata.role);
              this.router.navigate(['admin']);
            }else{
              this.toast.error('contactez le support','cette utilisateur est pas actif')
            }

          }else{
            this.toast.error('Mot de passe ou nom utilisation invalide');
          }
        }
      )

    }
  }
}
