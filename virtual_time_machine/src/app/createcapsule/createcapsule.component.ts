import { Component } from '@angular/core';
import { CapsuleproxyService } from '../capsuleproxy.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-createcapsule',
  templateUrl: './createcapsule.component.html',
  styleUrls: ['./createcapsule.component.css']
})
export class CreatecapsuleComponent {
  capsule = {
    name: '',
    description: '',
    capsuleID: '',
    createdDate: new Date().toISOString().split('T')[0],
    openDate: '',
    completed: false,
    userID: ''
  };
  files: File[] = [];
  uploadedFiles: string[] = [];
  submitted = false;
  createdCapsuleID: string | null = null;
  openDate: string | null = null;

  isCreatingCapsule = false;
  errorMessage = '';

  constructor(
    private capsuleProxyService: CapsuleproxyService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  generateCapsuleID() {
    const array = new Uint8Array(12);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  createCapsule() {
    this.errorMessage = '';
    this.capsule.capsuleID = this.generateCapsuleID();
    this.createdCapsuleID = this.capsule.capsuleID;
    this.openDate = this.capsule.openDate;

    const formData = new FormData();
    formData.append('name', this.capsule.name);
    formData.append('description', this.capsule.description);
    formData.append('capsuleID', this.capsule.capsuleID);
    formData.append('createdDate', this.capsule.createdDate);
    formData.append('openDate', this.capsule.openDate);
    formData.append('completed', this.capsule.completed.toString());
    this.files.forEach(file => formData.append('file', file));
      this.capsuleProxyService.createCapsule(formData)
      .subscribe(
        (response) => {
          console.log("CREATEDCAPSULE: ", this.createdCapsuleID);
          console.log('Capsule created successfully:', response);
          this.resetForm();
        },
        (error) => {
          console.error('Error creating capsule:', error);
          this.errorMessage = 'Error creating capsule. Please try again.';
        }
      );
      this.submitted = true;
  }

  //add files to the file array when the user adds more than one file
  onFileChange(event: any) {
    const newFiles: File[] = Array.from(event.target.files);
    this.files = this.files.concat(newFiles);
    this.uploadedFiles = this.files.map(file => file.name);
  }

  //delete the file if the user mistakenly uploads a file
  deleteFile(index: number) {
    this.files.splice(index, 1);
    this.uploadedFiles = this.files.map(file => file.name);
  }  

  //resets the form back to empty after submitting the capsule
  resetForm() {
    this.capsule = {
      name: '',
      description: '',
      capsuleID: '',
      createdDate: new Date().toISOString().split('T')[0],
      openDate: '',
      completed: false,
      userID: ''
    };
    this.files = [];
    this.uploadedFiles = [];
  }

  goHome() {
    this.router.navigate(['/']);
  }

  capsuleLocked() {
    const id = this.createdCapsuleID;
    if (!this.openDate) {
      alert('The capsule cannot be locked without an open date.');
      this.router.navigate([`/view/${id}`]);
      return;
    }
    console.log("ID: ", this.capsule.capsuleID);
    if(id) {
      this.capsuleProxyService.updateCapsule(id, { completed: true }).subscribe({
        next: response => {
          console.log('Capsule locked successfully:', response);
          this.router.navigate(['/view']);
        },
        error: err => {
          console.error('Error locking capsule:', err);
        }
      });
    }
  }
}
