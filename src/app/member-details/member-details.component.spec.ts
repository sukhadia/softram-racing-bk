import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailsComponent } from './member-details.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { AppService } from '../app.service';
import { Member } from '../types';

class MockAppService {
  getTeams() {
    return of([{ id: '1', teamName: 'Team 1' }, { id: '2', teamName: 'Team 2' }])
  }

  addMember(formData: Member) {
    return of([{ id: 1 }])
  }

  editMember(formData: Member) {
    return of([{}])
  }
}

let comp: MemberDetailsComponent;
let service: AppService;

// Bonus points!
describe('MemberDetailsComponent', () => {
  let component: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;
  // create new instance of FormBuilder
  const formBuilder: FormBuilder = new FormBuilder();
  const mockSubscribe = { subscribe: () => { } }
  const appServiceMock = {
    addMember: () => ({ ...mockSubscribe }),
    editMember: () => ({ ...mockSubscribe }),
    getTeams: () => ({ ...mockSubscribe }),
    getMembers: () => ({ ...mockSubscribe })
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberDetailsComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule
      ],
      providers: [
        HttpClient,
        { provide: FormBuilder, useValue: formBuilder },
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: { get: (key) => '' }
            }
          }
        }
      ]
    }).compileComponents();
  }));

  let memberForm: FormGroup;
  beforeEach(() => {
    memberForm = formBuilder.group({
      firstName: 'Jon',
      lastName: 'Smith',
      jobTitle: 'Manager',
      team: 'Team USA',
      status: 'Active'
    });

    fixture = TestBed.createComponent(MemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = fixture.debugElement.injector.get(AppService);
    component.appService = service
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dbUpdate when member ID is available', () => {
    // spyOn(component, 'updateDb').and.returnValue({ subscribe: () => { } });
    spyOn(component, 'dbUpdate');
    component.editMemberId = 123;
    component.onSubmit(memberForm);
    expect(component.dbUpdate).toHaveBeenCalled()

  });

  it('should call dbInsert when member ID is not available', () => {
    spyOn(component, 'dbInsert');
    component.editMemberId = undefined;
    component.onSubmit(memberForm);
    expect(component.dbInsert).toHaveBeenCalled();
  });


});
