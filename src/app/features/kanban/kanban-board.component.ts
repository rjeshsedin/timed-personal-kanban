import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from './column/column.component';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, ColumnComponent],
  templateUrl: './kanban-board.component.html'
})
export class KanbanBoardComponent implements OnInit {
  columns = [
    { id: '1', name: 'Todo' },
    { id: '2', name: 'Working' },
    { id: '3', name: 'Completed' }
  ];

  ngOnInit() {}
}