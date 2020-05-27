import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonthstatsPage } from './monthstats.page';

describe('MonthstatsPage', () => {
  let component: MonthstatsPage;
  let fixture: ComponentFixture<MonthstatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthstatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonthstatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
