import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchMasterComponent } from './branch-master.component';

describe('BranchMasterComponent', () => {
  let component: BranchMasterComponent;
  let fixture: ComponentFixture<BranchMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
