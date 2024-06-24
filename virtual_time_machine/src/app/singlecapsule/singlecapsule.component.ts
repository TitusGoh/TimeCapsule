import { Component, OnInit } from '@angular/core';
import { CapsuleproxyService } from '../capsuleproxy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-singlecapsule',
  templateUrl: './singlecapsule.component.html',
  styleUrl: './singlecapsule.component.css'
})
export class SinglecapsuleComponent implements OnInit {
  capsule: any = {};
  files: any[] = [];
  newFiles: File[] = [];
  updated = false;

  constructor(
    private capsuleProxyService: CapsuleproxyService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }

  openDialog(): void{
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result=> {
      console.log("popup closed");
    });

  }

  ngOnInit(): void {
    this.getCapsuleInfo();
  }

  getCapsuleInfo(): void {
    const id = this.route.snapshot.paramMap.get('capsuleID');
    console.log(id);
    if (id) {
      this.capsuleProxyService.getCapsule(id)
      .subscribe((data: any) => {
        this.capsule = data.capsule;
        this.files = data.files.map((file: any) => {
          const thumbnailUrl = this.getThumbnailUrl(file.fileId);
          return {
            ...file,
            thumbnailUrl
          };
        });
      }, (error) => {
        console.error('Error fetching capsule details:', error);
      });
    }
  }

  getThumbnailUrl(fileId: string): string {
    return `https://timecapsuleww2.azurewebsites.net/file/${fileId}`;
  }

  updateCapsule(): void {
    const id = this.route.snapshot.paramMap.get('capsuleID');
    console.log("ID: ", id);
    if(id) {
      this.capsuleProxyService.updateCapsule(id, this.capsule).subscribe({
        next: response => {
          console.log('Capsule updated successfully:', response);
          //this.router.navigate(['/view']);
        },
        error: err => {
          console.error('Error updating capsule:', err);
        }
      });
    }
    this.updated = true;
  }

  deleteCapsule(): void {
    const id = this.route.snapshot.paramMap.get('capsuleID');
    console.log("Deleting capsule with ID: ", id);
    if (id) {
      this.capsuleProxyService.deleteCapsule(id).subscribe({
        next: response => {
          console.log('Capsule deleted successfully:', response);
          alert('Capsule deleted successfully');
          this.router.navigate(['/view']);
        },
        error: err => {
          console.error('Error deleting capsule:', err);
        }
      });
    }
  }

  deleteFile(index: number): void {
    const fileToDelete = this.files[index];
    console.log("FILE ID: ", fileToDelete);
    this.capsuleProxyService.deleteFile(fileToDelete.fileId).subscribe({
      next: response => {
        this.files.splice(index, 1);
        alert('File deleted successfully');
      },
      error: err => {
        console.error('Error deleting file:', err);
      }
    });
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.newFiles.push(files[i]);
    }
  }

  uploadFiles(): void {
    if (this.newFiles.length === 0) {
      alert('No files selected for upload');
      return;
    }

    const id = this.route.snapshot.paramMap.get('capsuleID');
    if (id) {
      const formData = new FormData();
      for (let i = 0; i < this.newFiles.length; i++) {
        formData.append('file', this.newFiles[i]);
      }

      this.capsuleProxyService.addFilesToCapsule(id, formData).subscribe({
        next: response => {
          alert('Files uploaded successfully');
          this.getCapsuleInfo(); // Refresh the capsule
          this.newFiles = []; // Clear the new files array
        },
        error: err => {
          console.error('Error uploading files:', err);
        }
      });
    }
  }

  goHome() {
    this.router.navigate(['/view']);
  }

  capsuleLocked() {
    if (!this.capsule.openDate) {
      alert('The capsule cannot be locked without an open date.');
      return;
    }
    const id = this.route.snapshot.paramMap.get('capsuleID');
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
