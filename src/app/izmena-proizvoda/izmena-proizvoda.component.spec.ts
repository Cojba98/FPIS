import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IzmenaProizvodaComponent } from './izmena-proizvoda.component';

describe('IzmenaProizvodaComponent', () => {
  let component: IzmenaProizvodaComponent;
  let fixture: ComponentFixture<IzmenaProizvodaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IzmenaProizvodaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IzmenaProizvodaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
