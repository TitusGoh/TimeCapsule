import { Component, OnInit } from '@angular/core';
import { CapsuleproxyService } from '../capsuleproxy.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-openpage',
  templateUrl: './openpage.component.html',
  styleUrl: './openpage.component.css'
})
export class OpenpageComponent implements OnInit{
  openCapsules: any[] = [];
  displayedColumns: string[] = ['capsuleID', 'name', 'description', 'createdDate', 'openDate'];

  constructor(
    private capsuleProxyService: CapsuleproxyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCapsules();
  }

  getCapsules(): void {
    this.capsuleProxyService.getCapsuleList()
      .subscribe((lists: any[]) => {
        this.openCapsules = lists.filter(capsule => capsule.capsule.completed && this.isOpenDateAfterToday(capsule.capsule.openDate));
      }, (error) => {
        console.error('Error fetching lists:', error);
      });
  }

  isOpenDateAfterToday(openDate: string): boolean {
    const today = new Date();
    const openDateObj = new Date(openDate);
    return openDateObj <= today;
  }

  viewCapsuleFiles(capsuleID: string) {
    this.router.navigate(['/openCapsulePage', capsuleID]);
  }
}
