import { Component } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { SinglecapsuleComponent } from '../singlecapsule/singlecapsule.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  constructor(public dialogRef : MatDialogRef<PopupComponent>){}

  onNoClick(): void{
    this.dialogRef.close();
  }
}

