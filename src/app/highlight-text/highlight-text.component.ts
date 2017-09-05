import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { TypoInfo, TypoComponent } from '../class/typo-info';

declare var jQuery: any;

@Component({
    selector: 'app-highlight-text',
    templateUrl: './highlight-text.component.html',
    styleUrls: ['./highlight-text.component.css']
})
export class HighlightTextComponent implements OnInit, OnChanges {
    @Input() typoInfo: TypoInfo;
    @Input() className: string;
    formattingText: string;

    constructor() {

    }

    ngOnChanges() {
        if (this.typoInfo != null)
            this.formattingText = this.getForamttingText(this.typoInfo);
        else
            this.formattingText = "";
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

    getForamttingText(typoInfo: TypoInfo): string {
        let tupleArray = this.getTypoTupleForAllScope(typoInfo.offsetTuple, typoInfo.body.length);
        let body = typoInfo.body;
        let outer = this;
        let formattingArray = tupleArray.map(function(v, index, a) {
            if (v.id == undefined)
                return outer.encodeHtml(body.substr(v.offset, v.length));
            else
                return outer.applyFormat(outer.encodeHtml(body.substr(v.offset, v.length)), outer.className);
        });
        return formattingArray.reduce(function(p, c, index, arr) { return p + c; }, "");
    }

    applyFormat(str: string, className: string): string {
        return '<strong>' + str + '</strong>';
    }

    encodeHtml(value: string): string {
        return jQuery('<div/>').text(value).html();
    }

    ngOnInit() {

    }

}
