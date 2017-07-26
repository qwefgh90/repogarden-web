import { GitNode, NodeType } from '../class/git-node';
import { cve1, cve2, cve3 } from './mock-cve';


export const tree: GitNode = {
    value: '/',
    type: NodeType.TREE,
    children: [
        {
            value: 'library',
            type: NodeType.TREE,
            children: [
                { value: 'require.js', type: NodeType.BLOB, children: [] },
                { value: 'angular.js', type: NodeType.BLOB, children: [] },
                {
                    value: 'rxjs.js <small>(1)</small>',
                    typoInfo: {
                        offsetTuple: [[0, 5]],
                        body: 'Hlleo world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br>'
                    }, type: NodeType.BLOB, children: []
                }
            ]
        },
        {
            value: 'html',
            type: NodeType.TREE,
            children: [
                { value: 'main.html', type: NodeType.BLOB, children: [] },
                { value: 'left.html', type: NodeType.BLOB, children: [] },
                { value: 'commercial.html', type: NodeType.BLOB, children: [] }
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



export const tree2: GitNode = {
    value: '/',
    type: NodeType.TREE,
    children: [
        {
            value: 'pom.xml',
            type: NodeType.BLOB, children: []
        },
        {

            value: 'library',
            type: NodeType.TREE,
            children: [
                {
                    value: 'pom.xml',
                    typoInfo: {
                        offsetTuple: [[0, 5]],
                        body: 'Hlleo world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br>'
                    }, type: NodeType.BLOB, children: []
                    , cves: [cve1, cve2]
                }
            ]
        },
        {
            value: 'html',
            type: NodeType.TREE,
            children: [
                { value: 'main.html', type: NodeType.BLOB, children: [] },
                { value: 'left.html', type: NodeType.BLOB, children: [] },
                { value: 'commercial.html', type: NodeType.BLOB, children: [] }
            ]
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
