import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryMasterComponent } from './repository-master.component';

describe('RepositoryMasterComponent', () => {
  let component: RepositoryMasterComponent;
  let fixture: ComponentFixture<RepositoryMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositoryMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
