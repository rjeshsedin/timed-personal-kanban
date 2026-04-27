import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDrop]',
  standalone: true
})
export class DropDirective {
  @Output() dropped = new EventEmitter<string>();
  @HostBinding('class.drop-target') isOver = false;

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isOver = true;
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
  }

  @HostListener('dragleave')
  onDragLeave() {
    this.isOver = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isOver = false;
    const data = event.dataTransfer?.getData('text/plain');
    if (data) this.dropped.emit(data);
  }
}
