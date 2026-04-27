import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-column-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-column.dialog.html',
  styleUrl: './add-column.dialog.css'
})
export class AddColumnDialogComponent {
  @Input() open = false;
  @Input() title = 'Add column';
  @Input() initialName = '';

  @Output() cancelled = new EventEmitter<void>();
  @Output() saved = new EventEmitter<string>();

  name = '';

  ngOnChanges() {
    this.name = this.initialName || '';
  }

  cancel() {
    this.cancelled.emit();
  }

  save() {
    const trimmed = this.name.trim();
    if (!trimmed) return;
    this.saved.emit(trimmed);
  }
}
