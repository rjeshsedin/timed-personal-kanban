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
  private getDefaultColumns() {
    return [
      'Todo', 'Working', 'Testing', 'Review', 'Actual Testing', 'Completed'
    ].map(name => ({
      id: crypto.randomUUID(),
      name
    }));
  }
}