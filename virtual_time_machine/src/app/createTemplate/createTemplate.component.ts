import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-createTemplate',
  templateUrl: './createTemplate.component.html',
  styleUrl: './createTemplate.component.css'
})
export class createTemplateComponent {
  constructor(private router: Router) {}
  navigateToCreateCapsule() {
    this.router.navigate(['/createCapsule']);
  }

  ngOnInit() {
  }

  clickEvent(): void {
    this.router.navigate(['']);
  }
}
