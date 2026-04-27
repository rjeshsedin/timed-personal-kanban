import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../core/services/project.service';
import { UserService } from '../../core/services/user.service';
import { CreateProjectComponent } from './create-project.component';
import { ProjectCardComponent } from './project-card.component';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, CreateProjectComponent, ProjectCardComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {
  private readonly _tick = signal(0);
  readonly userName = computed(() => this.user.getName());
  readonly projects = computed(() => {
    this._tick();
    return this.projectService.getProjects();
  });

  constructor(
    private projectService: ProjectService,
    private user: UserService
  ) {}

  refresh() {
    this._tick.update(v => v + 1);
  }
}
