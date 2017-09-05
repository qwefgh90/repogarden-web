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
        let valueToTest = component.getTypoTupleForAllScope([[2, 5]], 10);
        result.forEach(function(v, index, a) {
            expect(v[0]).toBe(valueToTest[index][0]);
            expect(v[1]).toBe(valueToTest[index][1]);
        });
    });
    it('should be highlight text', () => {
        let body = "himangodoc";
        let formattingTextToTest = component.getForamttingText({ offsetTuple: [[2, 5]], body: body });
        expect(formattingTextToTest).toBe("hi<em>mango</em>doc");
    });
});
