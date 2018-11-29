import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import {ShowService} from '../services/show.services'
import {Router, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {


  shows: any = [];

  constructor(private ps: ShowService){}

  ngOnInit(){
   
    this.ps.getPostsData().subscribe(data => {
        this.shows = data;
    });
   }

   onDelete(id:String){
     console.log("Delete called "+ id);
     this.ps.deletePost(id).subscribe(() =>
     {
        this.ngOnInit();
     })
   }
}
