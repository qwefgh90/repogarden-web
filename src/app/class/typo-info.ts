export interface TypoInfo {
    offsetTuple?: Array<TypoComponent>;
    id?: number;
    body: string;
    treeSha: string;
    path: string;
}
export interface TypoComponent {
    id?: number
    offset: number;
    length: number;
    suggestedList?: Array<string>;
    disabled?: boolean;
}
