import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './create-project.component.html'
})
export class CreateProjectComponent {
  name: string = '';

  constructor(private router: Router) {}

  create() {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');

    projects.push({
      id: Date.now().toString(),
      name: this.name
    });

    localStorage.setItem('projects', JSON.stringify(projects));
    this.router.navigate(['/projects']);
  }
}