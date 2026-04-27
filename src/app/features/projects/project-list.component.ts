import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Use an inline shape for projects to avoid runtime import issues with type-only files

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent implements OnInit {
  projects: { id: string; name: string }[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.projects = JSON.parse(localStorage.getItem('projects') || '[]');
  }

  openProject(id: string) {
    this.router.navigate(['/board', id]);
  }
}