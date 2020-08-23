import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersComponent } from './members.component';

import { Router, ActivatedRoute } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { By } from 'protractor';


describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MembersComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        }
        
      ]
    }).compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(MembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.editMemberById(1);
    expect(component.router.navigate).toHaveBeenCalled()
  });

});
