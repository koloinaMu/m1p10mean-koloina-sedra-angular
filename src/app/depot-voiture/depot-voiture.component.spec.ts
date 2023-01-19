import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotVoitureComponent } from './depot-voiture.component';

describe('DepotVoitureComponent', () => {
  let component: DepotVoitureComponent;
  let fixture: ComponentFixture<DepotVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepotVoitureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepotVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
