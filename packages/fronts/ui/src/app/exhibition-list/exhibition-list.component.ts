import { Component, OnInit } from "@angular/core";
import { FormButtonComponent } from "@solenopsys/uimatrix-forms";

@Component({
  selector: "app-exhibition-list",
  templateUrl: "./exhibition-list.component.html",
  styleUrls: ["./exhibition-list.component.css"]
})
export class ExhibitionListComponent implements OnInit {

  demos = [{
    title:"FormButton",
    url:"button",
    component: FormButtonComponent
  }];

  constructor() {
  }

  ngOnInit(): void {
  }

}
