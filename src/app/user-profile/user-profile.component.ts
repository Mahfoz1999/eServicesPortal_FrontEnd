
import {UserModel} from "../models/user-model";
import {Component, Inject, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {apiBaseUrl} from "../api-config";
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profileData!: UserModel;
  constructor(private http: HttpClient, @Inject(apiBaseUrl) private apiBaseUrl: string,)
  {
  }
  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    const token = localStorage.getItem('authToken'); // Retrieve the authorization token from local storage

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get(`${apiBaseUrl}/User/GetCurrentUser`, { headers })
      .subscribe((response: any) => {
        this.profileData = response;
      });
  }
}
