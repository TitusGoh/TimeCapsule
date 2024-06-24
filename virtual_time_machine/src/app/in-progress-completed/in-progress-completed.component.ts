import { Component, OnInit } from '@angular/core';
import { CapsuleproxyService } from '../capsuleproxy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-in-progress-completed',
  templateUrl: './in-progress-completed.component.html',
  styleUrl: './in-progress-completed.component.css'
})
export class InProgressCompletedComponent implements OnInit {
  inProgressCapsules: any[] = [];
  completedCapsules: any[] = [];
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
        this.inProgressCapsules = lists.filter(capsule => !capsule.capsule.completed);
        this.completedCapsules = lists.filter(capsule => capsule.capsule.completed && this.isOpenDateBeforeToday(capsule.capsule.openDate));
      }, (error) => {
        console.error('Error fetching lists:', error);
      });
  }

  isOpenDateBeforeToday(openDate: string): boolean {
    const today = new Date();
    const openDateObj = new Date(openDate);
    return openDateObj > today;
  }

  viewCapsule(capsuleID: string) {
    this.router.navigate(['/view', capsuleID]);
  }
}