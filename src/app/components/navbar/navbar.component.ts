import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false,
})
export class NavbarComponent {
  searchTerm: string = '';

  constructor(private router: Router) {}

  search() {
    if (this.searchTerm.trim().length > 0) {
      this.router.navigate(['/buscar', this.searchTerm]);
    }
  }
}
