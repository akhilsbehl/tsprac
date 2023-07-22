import { League, Match, MatchFormatError } from './problem_five';

describe('League', () => {
    let matches: Match[] = [
        {
            teams: ["A", "B"],
            scores: [1, 2]
        },
        {
            teams: ["C", "D"],
            scores: [2, 3]
        }
    ];
    let league = new League(matches);

    test('getScores', () => {
        league.addMatchResult("E 3 - 2 F");
        expect(league.getScores("E")).toEqual([3]);
    });

    test('getRankings', () => {
        league.addMatchResult("E 4 - 2 F");
        console.log(league.getRankings());
        expect(league.getRankings()).toEqual([
            "E 6",
            "B 3",
            "D 3",
            "A 0",
            "C 0",
            "F 0",
        ]);
    });

    test('wrong match result format', () => {
        expect(() => league
            .addMatchResult("foo bar"))
            .toThrow(MatchFormatError);
    });

});
