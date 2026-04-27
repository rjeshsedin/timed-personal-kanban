import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDrag]',
  standalone: true
})
export class DragDirective {
  @Input('appDrag') dragData = '';

  constructor(private el: ElementRef<HTMLElement>) {
    this.el.nativeElement.draggable = true;
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent) {
    if (!event.dataTransfer) return;
    event.dataTransfer.setData('text/plain', this.dragData);
    event.dataTransfer.effectAllowed = 'move';
  }
}
