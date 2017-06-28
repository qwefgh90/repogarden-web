import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryTypoDetailComponent } from './repository-typo-detail.component';

describe('RepositoryTypoDetailComponent', () => {
  let component: RepositoryTypoDetailComponent;
  let fixture: ComponentFixture<RepositoryTypoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositoryTypoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryTypoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
