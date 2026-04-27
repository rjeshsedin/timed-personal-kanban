import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../core/services/project.service';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {
  @Output() created = new EventEmitter<void>();
  name = '';

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {}

  submit() {
    const trimmed = this.name.trim();
    if (!trimmed) return;
    const project = this.projectService.createProject(trimmed);
    this.name = '';
    this.created.emit();
    void this.router.navigate(['/projects', project.id]);
  }
}
