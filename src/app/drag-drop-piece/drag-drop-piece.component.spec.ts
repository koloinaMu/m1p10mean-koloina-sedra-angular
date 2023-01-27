import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropPieceComponent } from './drag-drop-piece.component';

describe('DragDropPieceComponent', () => {
  let component: DragDropPieceComponent;
  let fixture: ComponentFixture<DragDropPieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDropPieceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
