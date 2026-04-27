import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { TimeTrackerService } from "./time-tracker.service";
import { Task } from "../models/task.model";

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(
    private storage: StorageService,
    private timeTracker: TimeTrackerService
  ){}
  addTask(projectId: string, columnId: string, title: string) {
    const data = this.storage.getData();
    const project = data.projects.find((p: { id: string; }) => p.id === projectId);
    if (!project) return;
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      columnId,
      timeSpent: {},
      enteredAt: Date.now()
    };
    project.tasks.push(task);
    this.storage.setData(data);
  }
  moveTask(projectId: string, taskId: string, toColumnId: string) {
    const data = this.storage.getData();
    const project = data.projects.find((p: { id: string; }) => p.id === projectId);
    if (!project) return;
    const task = project.tasks.find((t: { id: string; }) => t.id === taskId);
    if (!task) return;
    this.timeTracker.stop(task);
    task.columnId = toColumnId;
    this.timeTracker.start(task, toColumnId);
    this.storage.setData(data);
  }
  deleteTask(projectId: string, taskId: string) {
    const data = this.storage.getData();
    const project = data.projects.find((p: { id: string; }) => p.id === projectId);
    if (!project) return;
    project.tasks = project.tasks.filter((t: { id: string; }) => t.id !== taskId);
    this.storage.setData(data);
  }
}