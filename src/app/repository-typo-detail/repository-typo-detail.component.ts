import { Component, OnInit, Input } from '@angular/core';
import { Repository } from '../class/repository';

@Component({
    selector: 'app-repository-typo-detail',
    templateUrl: './repository-typo-detail.component.html',
    styleUrls: ['./repository-typo-detail.component.css']
})
export class RepositoryTypoDetailComponent implements OnInit {
    
    @Input('repository') selectedRepository: Repository;

    dummy: string = 'Template <script>alert("0wned")</script> <b>Syntax</b> and <mark>marked text</mark><br>next line';


    constructor() { }

    ngOnInit() {
    }

}
