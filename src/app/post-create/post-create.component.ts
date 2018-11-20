import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(private service: PostService) { }
date : Date;
  onAddPost(form: NgForm) {
    if (!form.valid)
      return;
      console.log(form.value.date);

      this.date = new Date(form.value.date);
      console.log(this.date.toDateString());
    
      this.service.addPost(form.value.title, form.value.content).subscribe();

    console.log(form.value);
    form.resetForm();
  }


  ngOnInit() {



  }

}
