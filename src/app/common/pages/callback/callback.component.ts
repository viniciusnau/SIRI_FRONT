import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.handleCallback();
  }

  handleCallback() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const apiToken = paramMap.get('apiToken');

      if (apiToken) {
        sessionStorage.setItem('apiToken', apiToken);
      } else {
        console.log('apiToken not found in paramMap.');
      }

      this.router.navigate(['/admin']);
    });
  }
}
