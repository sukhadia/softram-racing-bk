import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Member } from '../types';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  editMemberId: number;
  memberModel: Member;
  memberForm: FormGroup;
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams = [];

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router, private route: ActivatedRoute) {
    this.memberForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      jobTitle: [''],
      team: [''],
      status: ['Active']
    });
  }

  ngOnInit() {
    this.populateTeamsDropdown();
    const memberId = this.route.snapshot.paramMap.get('id');
    if (memberId) {
      this.editMemberId = parseInt(memberId)
      this.appService.getMemberById(this.editMemberId).subscribe(data => {
        if (data) {
          this.memberModel = data;
          this.memberForm.patchValue(data)
        }
      });
    }
  }

  private populateTeamsDropdown() {
    this.appService.getTeams().subscribe(data => {
      if (data) {
        this.teams = data;
      }
    });
  }

  ngOnChanges() {}

  onSubmit(form: FormGroup) {
    this.memberModel = form.value;
    if (this.editMemberId) {
      this.memberModel.id = this.editMemberId
      this.appService.editMember(this.memberModel)
        .subscribe(data => {
          this.router.navigate(['members'])
        });
    } else {
      this.appService.addMember(this.memberModel)
        .subscribe(data => {
          this.router.navigate(['members'])
        });
    }
    
  }
}
