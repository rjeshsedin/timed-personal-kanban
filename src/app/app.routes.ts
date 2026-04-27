import { Routes } from '@angular/router';
import { onboardedGuard } from './core/guards/onboarded.guard';
import { OnboardingComponent } from './features/onboarding/onboarding.component';
import { ProjectListComponent } from './features/projects/project-list.component';
import { KanbanBoardComponent } from './features/kanban/kanban-board.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'projects' },

  { path: 'onboarding', component: OnboardingComponent },

  { path: 'projects', canActivate: [onboardedGuard], component: ProjectListComponent },
  { path: 'projects/:projectId', canActivate: [onboardedGuard], component: KanbanBoardComponent },

  { path: '**', redirectTo: 'projects' }
];
