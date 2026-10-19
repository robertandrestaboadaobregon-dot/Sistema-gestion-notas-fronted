import { Component } from '@angular/core';
import { RouterLinkActive, RouterOutlet,RouterLinkWithHref } from '@angular/router';
import { ToastContainerComponent } from '../toast/toast-container.component/toast-container.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLinkActive, RouterOutlet, RouterLinkWithHref, ToastContainerComponent],
  templateUrl: './navbar.component.html',

})
export class NavbarComponent {}
