import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-card-selector',
  templateUrl: './card-selector.component.html',
  styleUrls: ['./card-selector.component.scss']
})
export class CardSelectorComponent implements OnChanges, OnChanges, OnDestroy {
  @Input() enableSelection!: Boolean;
  @Input() gameId!: Number;
  @ViewChild('cardsWrapper') cardsWrapper: ElementRef<HTMLInputElement> | undefined;
  @Output() sendMoveSelection = new EventEmitter<string>();

  clickedElement: Subscription = new Subscription();
  options: String[];

  constructor() {
    this.options = [
      'rock',
      'scissors',
      'paper',
    ];
  }

  ngOnChanges(): void {
    setTimeout(() => {
      if (this.enableSelection === true && this.cardsWrapper) {
        this.clickedElement = fromEvent(this.cardsWrapper.nativeElement, 'click').subscribe((elem) => {
          const attr = <HTMLElement>elem.target;
          const move = attr.getAttribute('alt') || attr.getAttribute('data-move') /* || attr.textContent */;
          this.moveSelected(move || '');
        });
      }
    }, 500);
  }

  ngOnDestroy(): void {
    this.clickedElement.unsubscribe();
  }


  moveSelected(value: string) {
    if (value) {
      this.sendMoveSelection.emit(value);
    }
  }
}

