import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {

  constructor(private service: PostService) { }
  date : Date;
    onAddPost(form: NgForm) {
      if (!form.valid)
        return;
        console.log(form.value.date);
      
        this.service.addPost(form.value.title, form.value.content, form.value.date).subscribe();
  
      console.log(form.value);
      form.resetForm();
    }

  ngOnInit() {
  }

}
