import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TodaystatsPage } from './todaystats.page';

describe('TodaystatsPage', () => {
  let component: TodaystatsPage;
  let fixture: ComponentFixture<TodaystatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaystatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TodaystatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
