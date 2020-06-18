import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AijoComponent } from './aijo.component';

describe('AijoComponent', () => {
  let component: AijoComponent;
  let fixture: ComponentFixture<AijoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AijoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
