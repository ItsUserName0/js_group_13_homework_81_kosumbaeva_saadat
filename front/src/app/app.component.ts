import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LinksService } from './services/links.service';
import { NgForm } from '@angular/forms';
import { Link } from './models/link.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('f') linkForm!: NgForm;
  link!: Link;
  linkUploadingSubscription!: Subscription;
  isUploading = false;

  constructor(private linksService: LinksService) {
  }

  ngOnInit(): void {
    this.linkUploadingSubscription = this.linksService.linkUploading.subscribe(isUploading => {
      this.isUploading = isUploading;
    });
  }

  onSubmit() {
    this.linksService.shortenLink(this.linkForm.form.value).subscribe({
      next: (result) => {
        this.link = result;
        this.isUploading = false;
      },
      error: () => {
        this.isUploading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.linkUploadingSubscription.unsubscribe();
  }
}
