import { Component, OnInit, OnChanges } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Member } from '../types';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members = [];
  loading = false;

  constructor(public appService: AppService, public router: Router) {}

  ngOnInit() {
    this.refreshMembers();
  }

  private refreshMembers() {
    this.loading = true
    this.appService.getMembers().subscribe(members => {
      this.members = members;
      this.loading = false;
    });
  }

  editMemberById(id: number) {
    this.router.navigate(['edit-member', { id }])
  }

  deleteMemberById(id: number) {
    this.appService.deleteMember(id)
      .subscribe((data: Member[]) => {
        if (data) {
          this.refreshMembers()
        }
      });
  }
}
