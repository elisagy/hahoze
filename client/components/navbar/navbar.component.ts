import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'navbar',
    template: require('./navbar.html'),
    styles: [require('./navbar.scss')]
})
export class NavbarComponent {
    isCollapsed = true;
    menu = [{
        title: 'המסלולים שלנו',
        'link': '/home',
    }, {
        title: 'למה החוזה?',
        'link': '/home',
    }, {
        title: 'שאלות ותשובות',
        'link': '/home',
    }, {
        title: 'צור קשר',
        'link': '/home',
    }];
    Router;
    isAdmin;
    isLoggedIn;
    currentUser = {};
    AuthService;

    static parameters = [AuthService, Router];
    constructor(private authService: AuthService, private router: Router) {
        this.AuthService = authService;

        this.Router = router;

        this.reset();

        this.AuthService.currentUserChanged.subscribe(user => {
            this.currentUser = user;
            this.reset();
        });
    }

    reset() {
        this.AuthService.isLoggedIn().then(is => {
            this.isLoggedIn = is;
        });
        this.AuthService.isAdmin().then(is => {
            this.isAdmin = is;
        });
        this.AuthService.getCurrentUser().then(user => {
            this.currentUser = user;
        });
    }

    logout() {
        return this.AuthService.logout().then(() => {
            this.Router.navigateByUrl('/home');
            this.reset();
        });
    }}
