import { GitNode, NodeType } from '../class/git-node';
import { cve1, cve2, cve3 } from './mock-cve';
/*

export const tree: GitNode = {
    value: '/',
    type: NodeType.TREE,
    settings: {
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
    },
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
                        offsetTuple: [[15, 20]],
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
    ]
};

*/

export const tree2: GitNode = {
    value: '/', path: 'test/path',
    type: NodeType.TREE,
    children: [
        {
            value: 'pom.xml', path: 'test/path',
            type: NodeType.BLOB, children: []
        },
        {

            value: 'library', path: 'test/path',
            type: NodeType.TREE,
            children: [
                {
                    value: 'pom.xml', path: 'test/path',
                    typoInfo: {
                        id: 123,
                        offsetTuple: [{ id: 1, offset: 5, length: 10, suggestedList: ["..."], disabled: false }],
                        body: 'Hlleo world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br> world<br>'
                    }, type: NodeType.BLOB, children: []
                    , cves: [cve1, cve2]
                }
            ]
        },
        {
            value: 'html', path: 'test/path',
            type: NodeType.TREE,
            children: [
                { value: 'main.html', path: 'test/path', type: NodeType.BLOB, children: [] },
                { value: 'left.html', path: 'test/path', type: NodeType.BLOB, children: [] },
                { value: 'commercial.html', path: 'test/path', type: NodeType.BLOB, children: [] }
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
