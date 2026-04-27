import { Injectable } from "@angular/core";
import { Task } from "../models/task.model";

@Injectable({ providedIn: 'root' })
export class TimeTrackerService {
  start(task: Task, columnId: string) {
    task.enteredAt = Date.now();
  }
  stop(task: Task) {
    if (!task.enteredAt) return;
    const duration = Date.now() - task.enteredAt;
    task.timeSpent[task.columnId] =
      (task.timeSpent[task.columnId] || 0) + duration;
    task.enteredAt = undefined;
  }
}