import { Component, OnInit, OnChanges } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Member } from '../types';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit, OnChanges {
  members: Observable<Member[]> = of([]);
  loading = false;

  constructor(public appService: AppService, public router: Router) { }

  ngOnInit() {
    this.refreshMembers();
  }

  ngOnChanges() {
    this.refreshMembers();
  }

  private refreshMembers() {
    this.members = this.appService.getMembers()
  }

  editMemberById(id: number) {
    this.router.navigate(['edit-member', { id }])
  }

  deleteMemberById(id: number) {
    this.dbDelete(id);
  }

  dbDelete(id: number) {
    this.appService.deleteMember(id)
      .subscribe(() => {
        this.refreshMembers();
      });
  }
}
