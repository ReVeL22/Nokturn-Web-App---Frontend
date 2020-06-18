import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideMenuMobileComponent } from './aside-menu-mobile.component';

describe('AsideMenuMobileComponent', () => {
  let component: AsideMenuMobileComponent;
  let fixture: ComponentFixture<AsideMenuMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsideMenuMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideMenuMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
