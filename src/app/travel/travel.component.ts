import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ShowService } from '../services/show.services';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {

  constructor(private service: ShowService) { }
    onAddPost(form: NgForm) {
      if (!form.valid)
        return;
        console.log(form.value.date);
      
        this.service.addPost(form.value.show, form.value.info, form.value.snum, form.value.epnum ).subscribe();
  
      console.log(form.value);
      form.resetForm();

      
    }

  ngOnInit() {
  }

}
