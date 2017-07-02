import { Component, OnInit, Input } from '@angular/core';
import { Repository } from '../class/repository';
import { Ng2TreeSettings, NodeSelectedEvent } from 'ng2-tree';
import { GitNode, NodeType } from '../class/git-node';
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
        type: NodeType.TREE,
        children: [
            {
                value: 'library',
                type: NodeType.TREE,
                children: [
                    { value: 'require.js', type: NodeType.BLOB },
                    { value: 'angular.js', type: NodeType.BLOB },
                    {
                        value: 'rxjs.js <small>(1)</small>',
                        typoInfo: {
                            offsetTuple: [[0, 5]],
                            body: 'Hlleo world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br>'
                        }, type: NodeType.BLOB
                    }
                ]
            },
            {
                value: 'html',
                type: NodeType.TREE,
                children: [
                    { value: 'main.html', type: NodeType.BLOB },
                    { value: 'left.html', type: NodeType.BLOB },
                    { value: 'commercial.html', type: NodeType.BLOB }
                ]
            },
            {
                value: 'css',
                type: NodeType.TREE,
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
        this.formattingText = this.getFormattingText(this.typoInfo);
    }

    getFormattingText(typoInfo: TypoInfo): string {
        if (typoInfo == undefined || typoInfo == null) {
            return "";
        } else {
            let sortedTypoList = typoInfo.offsetTuple.sort((a, b) => { return a[0] > b[0] ? 1 : 0 });
            let typoStartOffsetMap = typoInfo.offsetTuple.reduce(function(a, b) {
                a[b[0]] = true;
                return a;
            }, {});
            let typoEndOffsetMap = typoInfo.offsetTuple.reduce(function(a, b) {
                a[b[0] + b[1]] = true;
                return a;
            }, {});
            let resultString: Array<string> = [];
            let body = <String>typoInfo.body;
            for (let idx in body) {
                if (typoEndOffsetMap[idx] == true) {
                    resultString.push('</mark>');
                }
                if (typoStartOffsetMap[idx] == true) {
                    resultString.push('<mark>');
                }
                resultString.push(body[idx]);
            }
            return resultString.join("");
        }
    }
}
