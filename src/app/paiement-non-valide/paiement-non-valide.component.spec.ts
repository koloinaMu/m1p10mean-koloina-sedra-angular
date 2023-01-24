import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementNonValideComponent } from './paiement-non-valide.component';

describe('PaiementNonValideComponent', () => {
  let component: PaiementNonValideComponent;
  let fixture: ComponentFixture<PaiementNonValideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaiementNonValideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaiementNonValideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
