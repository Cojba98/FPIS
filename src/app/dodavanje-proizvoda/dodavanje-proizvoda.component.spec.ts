import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DodavanjeProizvodaComponent } from './dodavanje-proizvoda.component';

describe('DodavanjeProizvodaComponent', () => {
  let component: DodavanjeProizvodaComponent;
  let fixture: ComponentFixture<DodavanjeProizvodaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DodavanjeProizvodaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DodavanjeProizvodaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
