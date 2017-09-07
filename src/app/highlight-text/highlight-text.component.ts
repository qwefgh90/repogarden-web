import { Component, OnInit, OnChanges, Input, Output, QueryList, ViewChildren, ElementRef, Renderer, EventEmitter } from '@angular/core';
import { TypoInfo, TypoComponent } from '../class/typo-info';
import { GitNode, NodeType } from '../class/git-node';
import { TooltipDirective } from 'ngx-bootstrap/tooltip';

declare var jQuery: any;
declare const alertify: any;

@Component({
    selector: 'app-highlight-text',
    templateUrl: './highlight-text.component.html',
    styleUrls: ['./highlight-text.component.css']
})
export class HighlightTextComponent implements OnInit, OnChanges {
    @Input() node: GitNode;
    @Output() onTypoCompRemoved = new EventEmitter<number>();
    formattingText: string;
    elementRef: ElementRef;
    renderer: Renderer;
    handlerToRemoveListener: Array<Function> = [];
    @ViewChildren(TooltipDirective) tooltips: QueryList<TooltipDirective>;

    constructor(elementRef: ElementRef, renderer: Renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
    }

    handler(): void {
        console.log(this);
        console.log(this.formattingText);
        alertify.message("hello world");
    }

    ngOnChanges() {
        if (this.node == undefined || this.node.type == NodeType.TREE) {
            this.formattingText = "";
        } else {
            if (this.node.typoInfo.offsetTuple == undefined || this.node.typoInfo.offsetTuple.length == 0)
                this.formattingText = "Typos are not found.";
            else {
                this.formattingText = this.getFormattingText(this.node.typoInfo);
                setTimeout(() => {
                    this.handlerToRemoveListener.forEach(remover => remover());
                    this.handlerToRemoveListener = [];
                    this.elementRef.nativeElement.querySelectorAll('.tooltiptext span').forEach(e => {
                        let remove = this.renderer.listen(e, 'click', () => {
                            //                            alertify.message('component id: ' + e.title);
                            this.onTypoCompRemoved.emit(parseInt(e.title));
                        });
                        this.handlerToRemoveListener.push(remove);
                    });
                }, 500);
            }
        }
    }

    getTypoTupleForAllScope(offsetTuple: Array<TypoComponent>, length: number): Array<TypoComponent> {
        return offsetTuple.reduce(function(prev, v, index, arr) {
            if (index == 0) {
                if (v.offset != 0) {
                    prev.push({ offset: 0, length: v.offset });
                }
            } else {
                let lastPushedElement = prev[prev.length - 1];
                let nextPredictedOffset = lastPushedElement.offset + lastPushedElement.length;
                if (nextPredictedOffset < v.offset) {
                    prev.push({
                        offset: nextPredictedOffset
                        , length: (v.offset - nextPredictedOffset)
                    });
                }
            }

            prev.push(v);
            if (index == arr.length - 1)
                prev.push({ offset: v.offset + v.length, length: (length - (v.offset + v.length)) });
            return prev;
        }, new Array<TypoComponent>());
    }

    getFormattingText(typoInfo: TypoInfo): string {
        let tupleArray = this.getTypoTupleForAllScope(typoInfo.offsetTuple, typoInfo.body.length);
        let body = typoInfo.body;
        let formattingArray = tupleArray.map((v, index, a) => {
            if (v.id == undefined)
                return this.encodeHtml(body.substr(v.offset, v.length));
            else
                return this.applyFormat(this.encodeHtml(body.substr(v.offset, v.length)), v.id.toString());
        });
        let formattingText = formattingArray.reduce(function(p, c, index, arr) { return p + c; }, "").replace(/\n/g,'<br>');
        console.log(formattingText);
        return formattingText;
    }

    applyFormat(str: string, title: string): string {
        return '<div class="tooltip-src"><b>' + str
            + `</b><div class="tooltiptext">title <button class="sm"><span title="${title}" class="glyphicon glyphicon-trash"></span></button><br>description<br></div></div>`;
    }

    encodeHtml(value: string): string {
        return jQuery('<div/>').text(value).html();
    }

    ngOnInit() {

    }

}
