import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationsCourantesComponent } from './reparations-courantes.component';

describe('ReparationsCourantesComponent', () => {
  let component: ReparationsCourantesComponent;
  let fixture: ComponentFixture<ReparationsCourantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReparationsCourantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparationsCourantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
