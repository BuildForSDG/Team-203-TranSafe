import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomenavPage } from './homenav.page';

describe('HomenavPage', () => {
  let component: HomenavPage;
  let fixture: ComponentFixture<HomenavPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomenavPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomenavPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
