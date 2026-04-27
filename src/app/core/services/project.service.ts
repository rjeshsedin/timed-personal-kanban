import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { Project } from "../models/project.model";

@Injectable({ providedIn: 'root' })
export class ProjectService {
  constructor(private storage: StorageService) {}
  getProjects(): Project[] {
    return this.storage.getData().projects || [];
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
  addColumn(projectId:string,columnName:string){
    const data=this.storage.getData();
    const project=data.projects.find((p:{id:string;})=>p.id===projectId);
    if(!project) return;
    const newColumn = {
      id: crypto.randomUUID(),
      name: columnName
    };
    const completedIndex=project.columns.findIndex((c:{name:string;})=>c.name==='Completed'); 
    project.columns.splice(completedIndex,0,newColumn);
    this.storage.setData(data);
  }
  deleteColumn(projectId:string,columnId:string,moveToColumnId:string){
    const data=this.storage.getData();
    const project=data.projects.find((p:{id:string;})=>p.id===projectId);
    if(!project) return;
    const column =project.columns.find(c => c.id === columnId);
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