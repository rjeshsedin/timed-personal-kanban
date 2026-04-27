import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './onboarding.component.html'
})
export class OnboardingComponent {
  name: string = '';

  constructor(private router: Router) {}

  startApp() {
    if (this.name.trim()) {
      localStorage.setItem('username', this.name);
      this.router.navigate(['/projects']);
    }
  }
}