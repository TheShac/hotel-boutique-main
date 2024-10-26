import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoHabitacionesComponent } from './catalogo-habitaciones.component';

describe('CatalogoHabitacionesComponent', () => {
  let component: CatalogoHabitacionesComponent;
  let fixture: ComponentFixture<CatalogoHabitacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoHabitacionesComponent ],
      imports: [ CommonModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoHabitacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});