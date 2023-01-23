import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import notify from 'devextreme/ui/notify';
import { FireService } from './../../services/fire.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  gameForm: FormGroup;
  gameId: String;
  
  constructor(
    private formBuilder: FormBuilder,
    private fire: FireService,
  ) {
    this.gameId = '';
    this.checkIsEven = this.checkIsEven.bind(this);
    this.gameForm = this.formBuilder.group({
      nickName: ['Yeni', Validators.required ],
      rounds: [3, [Validators.required, Validators.min(3) , this.checkIsEven ]],
    });
  }


  get f() {
    return this.gameForm.controls;
  }

  newGame(e: any) {
    console.log('newGame triggered', this.gameForm.value);

    if (!this.gameForm.invalid) {
      this.f['nickName'].disable();
      this.f['rounds'].disable();

      // search for open games in 'match-making' path if one open patch player2 else
      // create a new game as follows:

      const game = {
        dateTime: new Date().getTime(),
        rounds: this.f['rounds'].value,
        player1: this.f['nickName'].value,
      };

      this.fire.save('match', game).then((key: String) => {
        if (key) {
          this.gameId = key;
        }
      })
    }
  }

  checkRounds(e: any) {    
    if (this.f['rounds'].value % 2 === 0) {
      notify({
        message: `Please select an odd number`,
        shading: true,
        position:'top', 
      }, 'warning');
    }
  }

  checkIsEven(control: AbstractControl) {
    if (!control.value) {
      return null;
    }
    if ((control.value % 2 === 0)) {
      return { isEven: true };
    }
    return null;
  }

  receiveMoveSelected(value: any) {
    if(value) {
      console.log('Move selected received:', value);
    }
  }

}
