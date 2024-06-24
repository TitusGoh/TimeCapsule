import { Component } from '@angular/core';
import { CapsuleproxyService } from '../capsuleproxy.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-opencapsule',
  templateUrl: './opencapsule.component.html',
  styleUrl: './opencapsule.component.css'
})
export class OpencapsuleComponent {
  capsule: any = {};
  files: any[] = [];

  constructor(
    private capsuleProxyService: CapsuleproxyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

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
}
