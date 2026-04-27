import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-project-card',
	standalone: true,
	templateUrl: './project-card.component.html'
})
export class ProjectCardComponent {
	@Input() project: any;
}