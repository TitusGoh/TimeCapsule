import { Component, OnInit } from '@angular/core';
import { CapsuleproxyService } from './capsuleproxy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'virtual-time-capsule';

  constructor(
    public capsuleProxyService: CapsuleproxyService,
  ) {}

  ngOnInit() {
    this.capsuleProxyService.checkAuthStatus();
  }

  loginWithGoogle() {
    this.capsuleProxyService.login();
  }

  logout() {
    this.capsuleProxyService.logout();
  }
}
