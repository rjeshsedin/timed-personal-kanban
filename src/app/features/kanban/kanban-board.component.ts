import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../core/services/project.service';
import { TaskService } from '../../core/services/task.service';
import { ColumnComponent } from './column/column.component';
import { AddColumnDialogComponent } from './dialogs/add-column.dialog';
import { MoveTasksDialogComponent, MoveTasksResult } from './dialogs/move-tasks.dialog';
import { Column } from '../../core/models/column.model';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [
    CommonModule,
    ColumnComponent,
    AddColumnDialogComponent,
    MoveTasksDialogComponent
  ],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css'
})
export class KanbanBoardComponent {
  private readonly _tick = signal(0);
  readonly projectId = signal<string | null>(null);

  readonly project = computed(() => {
    this._tick();
    const id = this.projectId();
    if (!id) return null;
    return this.projectService.getProject(id) ?? null;
  });

  readonly columns = computed(() => this.project()?.columns ?? []);
  readonly tasks = computed(() => this.project()?.tasks ?? []);
  readonly completedColumnId = computed(
    () => this.columns().find(c => c.name === 'Completed')?.id ?? null
  );

  // dialogs
  addDialogOpen = false;
  addDialogTitle = 'Add column';
  addDialogInitialName = '';
  private _editingColumn: Column | null = null;

  moveDialogOpen = false;
  moveFromColumn: Column | null = null;
  moveTargets: Column[] = [];
  moveTaskCount = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.projectId.set(params.get('projectId'));
      this.refresh();
    });
  }

  refresh() {
    this._tick.update(v => v + 1);
  }

  tasksFor(columnId: string) {
    return this.tasks().filter(t => t.columnId === columnId);
  }

  addTask(payload: { columnId: string; title: string }) {
    const projectId = this.projectId();
    if (!projectId) return;
    this.taskService.addTask(projectId, payload.columnId, payload.title);
    this.refresh();
  }

  deleteTask(taskId: string) {
    const projectId = this.projectId();
    if (!projectId) return;
    this.taskService.deleteTask(projectId, taskId);
    this.refresh();
  }

  moveTask(payload: { taskId: string; toColumnId: string }) {
    const projectId = this.projectId();
    if (!projectId) return;
    this.taskService.moveTask(projectId, payload.taskId, payload.toColumnId);
    this.refresh();
  }

  openAddColumn() {
    this._editingColumn = null;
    this.addDialogTitle = 'Add column';
    this.addDialogInitialName = '';
    this.addDialogOpen = true;
  }

  openEditColumn(column: Column) {
    this._editingColumn = column;
    this.addDialogTitle = 'Edit column';
    this.addDialogInitialName = column.name;
    this.addDialogOpen = true;
  }

  closeAddDialog() {
    this.addDialogOpen = false;
  }

  saveColumn(name: string) {
    const projectId = this.projectId();
    if (!projectId) return;

    if (this._editingColumn) {
      this.projectService.updateColumn(projectId, this._editingColumn.id, name);
    } else {
      this.projectService.addColumn(projectId, name);
    }

    this.addDialogOpen = false;
    this.refresh();
  }

  requestDeleteColumn(column: Column) {
    const projectId = this.projectId();
    if (!projectId) return;

    const tasksInColumn = this.tasksFor(column.id);
    const targets = this.columns().filter(c => c.id !== column.id);

    if (tasksInColumn.length === 0) {
      const fallback = targets[0]?.id ?? '';
      if (!fallback) return;
      this.projectService.deleteColumn(projectId, column.id, fallback);
      this.refresh();
      return;
    }

    this.moveFromColumn = column;
    this.moveTargets = targets;
    this.moveTaskCount = tasksInColumn.length;
    this.moveDialogOpen = true;
  }

  cancelMoveDialog() {
    this.moveDialogOpen = false;
    this.moveFromColumn = null;
    this.moveTargets = [];
    this.moveTaskCount = 0;
  }

  confirmMoveDialog(result: MoveTasksResult) {
    const projectId = this.projectId();
    if (!projectId || !this.moveFromColumn) return;

    let moveToColumnId = '';
    if (result.kind === 'existing') {
      moveToColumnId = result.moveToColumnId;
    } else {
      const newCol = this.projectService.addColumn(projectId, result.newColumnName);
      moveToColumnId = newCol?.id ?? '';
    }

    if (!moveToColumnId) return;
    this.projectService.deleteColumn(projectId, this.moveFromColumn.id, moveToColumnId);
    this.cancelMoveDialog();
    this.refresh();
  }

  backToProjects() {
    void this.router.navigateByUrl('/projects');
  }
}
