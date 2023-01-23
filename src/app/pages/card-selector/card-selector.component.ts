import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-card-selector',
  templateUrl: './card-selector.component.html',
  styleUrls: ['./card-selector.component.scss']
})
export class CardSelectorComponent implements OnChanges, OnChanges, OnDestroy {
  @Input() enableSelection!: Boolean;
  @Input() gameId!: String;
  @ViewChild('cardsWrapper') cardsWrapper: ElementRef<HTMLInputElement> | undefined;
  @Output() sendMoveSelection = new EventEmitter<string>();

  clickedElement: Subscription = new Subscription();
  options: String[];

  private cardSelected = 'card-selected';

  constructor() {
    this.options = [
      'rock',
      'scissors',
      'paper',
    ];
  }

  ngOnChanges(): void {
    setTimeout(() => {
      if (this.cardsWrapper) {
        this.clickedElement = fromEvent(this.cardsWrapper.nativeElement, 'click').subscribe((elem) => {
          const attr = <HTMLElement>elem.target;
          const move = attr.getAttribute('alt') || attr.getAttribute('id') || attr.textContent;
          this.changeSelected(move || '');
        });
      }
    }, 500);
  }

  private removeSelectedCards ():void {
    const cards = <HTMLCollection>document.getElementsByClassName('card');
    if (cards) {
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        card.classList.remove(this.cardSelected);
      }
    }
  }

  ngOnDestroy(): void {
    this.clickedElement.unsubscribe();
  }


  changeSelected(value: string) {
    if (value && this.options.includes(value)) {
      this.removeSelectedCards();

      const div = document.getElementById(value);
      if (div) {
        div.classList.add(this.cardSelected);
      }

      this.sendMoveSelection.emit(value);
    }
  }
}

