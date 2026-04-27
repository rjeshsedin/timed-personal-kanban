import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.css'
})
export class OnboardingComponent {
  name = '';

  constructor(
    private user: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    const existing = this.user.getName();
    if (existing) {
      void this.router.navigateByUrl('/projects');
    }
  }

  submit() {
    const trimmed = this.name.trim();
    if (!trimmed) return;
    this.user.setName(trimmed);
    void this.router.navigateByUrl('/projects');
  }
}

