import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Column } from '../../../core/models/column.model';
import { Task } from '../../../core/models/task.model';
import { DropDirective } from '../../../shared/directives/drop.directive';
import { TaskCardComponent } from '../task/task-card.component';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [CommonModule, FormsModule, DropDirective, TaskCardComponent],
  templateUrl: './column.component.html',
  styleUrl: './column.component.css'
})
export class ColumnComponent {
  @Input({ required: true }) column!: Column;
  @Input({ required: true }) tasks!: Task[];
  @Input({ required: true }) columns!: Column[];
  @Input() completedColumnId: string | null = null;

  @Output() taskDropped = new EventEmitter<{ taskId: string; toColumnId: string }>();
  @Output() taskDeleted = new EventEmitter<string>();
  @Output() taskAdded = new EventEmitter<{ columnId: string; title: string }>();
  @Output() editColumn = new EventEmitter<Column>();
  @Output() deleteColumn = new EventEmitter<Column>();

  newTitle = '';

  get locked() {
    return this.column.name === 'Todo' || this.column.name === 'Completed';
  }

  submitTask() {
    const trimmed = this.newTitle.trim();
    if (!trimmed) return;
    this.taskAdded.emit({ columnId: this.column.id, title: trimmed });
    this.newTitle = '';
  }

  onDropped(taskId: string) {
    this.taskDropped.emit({ taskId, toColumnId: this.column.id });
  }
}
