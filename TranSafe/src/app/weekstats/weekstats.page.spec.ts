import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WeekstatsPage } from './weekstats.page';

describe('WeekstatsPage', () => {
  let component: WeekstatsPage;
  let fixture: ComponentFixture<WeekstatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekstatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WeekstatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
