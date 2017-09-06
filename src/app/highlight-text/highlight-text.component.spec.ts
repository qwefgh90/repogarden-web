import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightTextComponent } from './highlight-text.component';

describe('HighlightTextComponent', () => {
    let component: HighlightTextComponent;
    let fixture: ComponentFixture<HighlightTextComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HighlightTextComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HighlightTextComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should fill a list with tuples', () => {
        let result = [[0, 2], [2, 5], [7, 3]];
        let valueToTest = component.getTypoTupleForAllScope([{ id: 2, offset: 2, length: 5, suggestedList: ["..."], disabled: false }], 10);
        result.forEach(function(v, index, a) {
            expect(v[0]).toBe(valueToTest[index].offset);
            expect(v[1]).toBe(valueToTest[index].length);
        });
    });
    it('should be highlight text', () => {
        let body = "himangodoc";
        let formattingTextToTest = component.getForamttingText({ offsetTuple: [{ id: 2, offset: 2, length: 5, suggestedList: ["..."], disabled: false }], body: body });
        expect(formattingTextToTest).toBe("hi<strong>mango</strong>doc");
    });
});
