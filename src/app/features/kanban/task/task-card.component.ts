import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../core/models/task.model';
import { Column } from '../../../core/models/column.model';
import { DragDirective } from '../../../shared/directives/drag.directive';
import { CompletedStatsComponent } from '../completed-stats/completed-stats.component';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, DragDirective, CompletedStatsComponent],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  @Input({ required: true }) columns!: Column[];
  @Input() completedColumnId: string | null = null;

  @Output() delete = new EventEmitter<string>();

  get isCompleted() {
    return !!this.completedColumnId && this.task.columnId === this.completedColumnId;
  }
}
