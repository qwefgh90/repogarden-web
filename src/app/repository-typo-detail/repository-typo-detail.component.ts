import { Component, OnInit, Input } from '@angular/core';
import { Repository } from '../class/repository';
import { Ng2TreeSettings, NodeSelectedEvent } from 'ng2-tree';
import { GitNode } from '../class/git-node';
import { TypoInfo } from '../class/typo-info';


@Component({
    selector: 'app-repository-typo-detail',
    templateUrl: './repository-typo-detail.component.html',
    styleUrls: ['./repository-typo-detail.component.css']
})
export class RepositoryTypoDetailComponent implements OnInit {

    @Input('repository') selectedRepository: Repository;

    dummy: string = 'Template <script>alert("0wned")</script> <b>Syntax</b> and <mark>marked text</mark><br>next line';

    typoInfo: TypoInfo;
    formattingText: string;

    treeSettings: Ng2TreeSettings = {
        rootIsVisible: false
    }

    tree: GitNode = {
        value: '/',
        children: [
            {
                value: 'library',
                children: [
                    { value: 'require.js' },
                    { value: 'angular.js' },
                    {
                        value: 'rxjs.js',
                        typoInfo: {
                            offsetTuple: [[0, 5]],
                            body: 'Hlleo world'
                        }
                    }
                ]
            },
            {
                value: 'html',
                children: [
                    { value: 'main.html <small>(1)</small>' },
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
                node: '<i class="fa fa-folder-o left-content-box"></i>',
                leaf: '<i class="fa fa-file-o"></i>'
            }
        }
    };

    constructor() { }

    ngOnInit() {
    }

    select($event: NodeSelectedEvent) {
        let node = <GitNode>$event.node.node;
        this.typoInfo = node.typoInfo;
        console.info($event);
    }

    getFormattingText(typoInfo: TypoInfo): string {
        let sortedTypoList = typoInfo.offsetTuple.sort((a, b) => { return a[0] > b[0] ? 1 : 0 });
        let arr: Array<string> = [];
        //        typoInfo.body.
        return "";
    }
}
