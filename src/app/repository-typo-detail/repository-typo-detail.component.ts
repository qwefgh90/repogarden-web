import { Component, OnInit, Input } from '@angular/core';
import { Repository } from '../class/repository';
import { TreeModel, Ng2TreeSettings } from 'ng2-tree';

@Component({
    selector: 'app-repository-typo-detail',
    templateUrl: './repository-typo-detail.component.html',
    styleUrls: ['./repository-typo-detail.component.css']
})
export class RepositoryTypoDetailComponent implements OnInit {

    @Input('repository') selectedRepository: Repository;

    dummy: string = 'Template <script>alert("0wned")</script> <b>Syntax</b> and <mark>marked text</mark><br>next line';

    treeSettings: Ng2TreeSettings = {
        rootIsVisible: false
    }
    tree: TreeModel = {
        value: '/',
        children: [
            {
                value: 'library',
                children: [
                    { value: 'require.js' },
                    { value: 'angular.js' },
                    { value: 'rxjs.js' }
                ]
            },
            {
                value: 'html',
                children: [
                    { value: 'main.html' },
                    { value: 'left.html' },
                    { value: 'commercial.html' }
                ]
            },
            {
                value: 'css',
                children: [
                ],
            }
        ],
        settings: {
            'static': true,
            cssClasses: {
                expanded: 'fa fa-caret-down',
                collapsed: 'fa fa-caret-right',
                empty: 'fa fa-caret-right disabled',
                leaf: 'fa'
            },
            templates: {
                node: '<i class="fa fa-folder-o"></i>',
                leaf: '<i class="fa fa-file-o"></i>'
            }
        }
    };

    constructor() { }

    ngOnInit() {
    }

    select($event) {
        console.info($event);
    }

}
