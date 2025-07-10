import { ComponentFixture, TestBed } from "@angular/core/testing";
import { assignedAssetsComponent } from "./assignedAssets.component";

describe("ManageRequestsComponent", () => {
  let component: assignedAssetsComponent;
  let fixture: ComponentFixture<assignedAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [assignedAssetsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(assignedAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
