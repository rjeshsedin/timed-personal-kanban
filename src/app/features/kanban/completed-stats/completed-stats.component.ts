import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../core/models/task.model';
import { Column } from '../../../core/models/column.model';
import { TimeFormatPipe } from '../../../shared/pipes/time-format.pipe';

@Component({
  selector: 'app-completed-stats',
  standalone: true,
  imports: [CommonModule, TimeFormatPipe],
  templateUrl: './completed-stats.component.html',
  styleUrl: './completed-stats.component.css'
})
export class CompletedStatsComponent {
  @Input({ required: true }) task!: Task;
  @Input({ required: true }) columns!: Column[];

  readonly rows = computed(() => {
    const byId = new Map(this.columns.map(c => [c.id, c.name] as const));
    const orderedIds = this.columns.map(c => c.id);

    return orderedIds
      .map(columnId => ({
        columnId,
        columnName: byId.get(columnId) ?? 'Unknown',
        ms: this.task.timeSpent[columnId] ?? 0
      }))
      .filter(r => r.ms > 0);
  });
}
