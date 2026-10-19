import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {  NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  imports: [RouterOutlet, NavbarComponent],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {



}
