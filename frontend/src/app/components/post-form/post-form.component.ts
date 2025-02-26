import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  post: any = { title: '', content: '' };
  isEditMode = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.apiService.getPost(+id).subscribe({
        next: (response) => {
          this.post = response;
        },
        error: (error) => {
          console.error('Failed to fetch post', error);
        }
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.apiService.updatePost(this.post.id, this.post).subscribe({
        next: () => {
          this.router.navigate(['/posts']);
        },
        error: (error) => {
          console.error('Failed to update post', error);
        }
      });
    } else {
      this.apiService.createPost(this.post).subscribe({
        next: () => {
          this.router.navigate(['/posts']);
        },
        error: (error) => {
          console.error('Failed to create post', error);
        }
      });
    }
  }
}