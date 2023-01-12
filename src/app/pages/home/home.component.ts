import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  gameForm: FormGroup;
  invalidForm!: Boolean;
  
  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.checkIsEven = this.checkIsEven.bind(this);
    this.gameForm = this.formBuilder.group({
      nickName: ['Yeni', Validators.required ],
      rounds: [4, [Validators.required, Validators.min(3) , this.checkIsEven ]],
    });
  }


  get f() {
    return this.gameForm.controls;
  }

  newGame(e: any) {
    console.log('newGame triggered', this.gameForm.value);

    if (this.gameForm.invalid) {
      this.invalidForm = true;
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

}
