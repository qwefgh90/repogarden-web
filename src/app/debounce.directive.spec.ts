import { DebounceDirective } from './debounce.directive';

describe('DebounceDirective', () => {
    it('should create an instance', () => {
        const directive = new DebounceDirective(undefined);
        expect(directive).toBeTruthy();
    });
});
