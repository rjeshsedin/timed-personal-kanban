import { Component, EventEmitter, Input, Output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Column } from '../../../core/models/column.model';

export type MoveTasksResult =
  | { kind: 'existing'; moveToColumnId: string }
  | { kind: 'new'; newColumnName: string };

@Component({
  selector: 'app-move-tasks-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './move-tasks.dialog.html',
  styleUrl: './move-tasks.dialog.css'
})
export class MoveTasksDialogComponent {
  @Input() open = false;
  @Input({ required: true }) fromColumn!: Column;
  @Input({ required: true }) availableTargets!: Column[];
  @Input() taskCount = 0;

  @Output() cancelled = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<MoveTasksResult>();

  mode: 'existing' | 'new' = 'existing';
  selectedTargetId = '';
  newColumnName = '';

  readonly canConfirm = computed(() => {
    if (this.mode === 'existing') return !!this.selectedTargetId;
    return !!this.newColumnName.trim();
  });

  ngOnChanges() {
    this.selectedTargetId = this.availableTargets?.[0]?.id ?? '';
    this.newColumnName = '';
    this.mode = 'existing';
  }

  cancel() {
    this.cancelled.emit();
  }

  confirm() {
    if (this.mode === 'existing') {
      if (!this.selectedTargetId) return;
      this.confirmed.emit({ kind: 'existing', moveToColumnId: this.selectedTargetId });
      return;
    }
    const trimmed = this.newColumnName.trim();
    if (!trimmed) return;
    this.confirmed.emit({ kind: 'new', newColumnName: trimmed });
  }
}
