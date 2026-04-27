import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { Project } from "../models/project.model";
import { Column } from "../models/column.model";

@Injectable({ providedIn: 'root' })
export class ProjectService {
  constructor(private storage: StorageService) {}
  getProjects(): Project[] {
    return this.storage.getData().projects || [];
  }
  getProject(projectId: string): Project | undefined {
    return this.getProjects().find(p => p.id === projectId);
  }
  createProject(name: string): Project {
    const data = this.storage.getData();
    const newProject: Project = {
      id: crypto.randomUUID(),
      name,
      columns: this.getDefaultColumns(),
      tasks: []
    };
    data.projects = [...(data.projects || []), newProject];
    this.storage.setData(data);
    return newProject;
  }
  addColumn(projectId: string, columnName: string): Column | undefined {
    const data=this.storage.getData();
    const project = (data.projects as Project[]).find(p => p.id === projectId);
    if(!project) return;
    const newColumn: Column = {
      id: crypto.randomUUID(),
      name: columnName
    };
    const completedIndex = (project.columns as Column[]).findIndex(c => c.name === 'Completed');
    project.columns.splice(completedIndex,0,newColumn);
    this.storage.setData(data);
    return newColumn;
  }
  updateColumn(projectId: string, columnId: string, newName: string) {
    const trimmed = newName.trim();
    if (!trimmed) return;
    const data = this.storage.getData();
    const project = data.projects.find((p: { id: string }) => p.id === projectId);
    if (!project) return;
    const column = project.columns.find((c: { id: string }) => c.id === columnId);
    if (!column || column.name === 'Todo' || column.name === 'Completed') return;
    column.name = trimmed;
    this.storage.setData(data);
  }
  deleteColumn(projectId:string,columnId:string,moveToColumnId:string){
    const data=this.storage.getData();
    const project = (data.projects as Project[]).find(p => p.id === projectId);
    if(!project) return;
    const column = (project.columns as Column[]).find((c: Column) => c.id === columnId);
    if (!column || column.name === 'Todo' || column.name === 'Completed') return;
    project.tasks.forEach((task: { columnId: string; }) => {
    if (task.columnId === columnId) {
      task.columnId = moveToColumnId;
    }
    });
    project.columns=project.columns.filter(((c: { id: string; })=>c.id!==columnId))
    this.storage.setData(data);
  }
  private getDefaultColumns() {
    return [
      'Todo', 'Working', 'Testing', 'Review', 'Actual Testing', 'Completed'
    ].map(name => ({
      id: crypto.randomUUID(),
      name
    }));
  }
}