export enum Clue {
    Absent,
    Elsewhere,
    Correct
}
export interface CluedLetter {
    letter: string
    clue?: Clue
}

export function getClues(word: string, target: string): CluedLetter[] {
    return new Array;
}