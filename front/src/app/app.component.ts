import { Component, ViewChild } from '@angular/core';
import { LinksService } from './services/links.service';
import { NgForm } from '@angular/forms';
import { Link } from './models/link.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  @ViewChild('f') linkForm!: NgForm;
  link!: Link;

  constructor(private linksService: LinksService) {
  }

  onSubmit() {
    this.linksService.shortenLink(this.linkForm.form.value).subscribe(result => {
      this.link = result;
    });
  }
}
