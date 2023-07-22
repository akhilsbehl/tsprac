export type Match = {
    teams: [string, string];
    scores: [number, number];
}

export class MatchFormatError extends Error {
    constructor(message: string) {
        super(`Message string not in expected format: ${message}.`);
        this.name = "MatchFormatError";
    }
}

export class League {

    matches: Match[];
    scores: Map<string, number[]>;
    points: Map<string, number>;

    constructor(startingMatches: Match[]) {
        this.scores = new Map<string, number[]>();
        this.points = new Map<string, number>();
        this.matches = new Array<Match>();
        for (const match of startingMatches) {
            this.addMatch(match);
        }
    }

    addMatchResult(newMatchResult: string): void {
        const newMatch: Match = this.parseMatchResult(newMatchResult);
        this.addMatch(newMatch);
    }

    addMatch(newMatch: Match): void {
        this.matches.push(newMatch);
        this.updateScores(newMatch);
        this.updatePoints(newMatch);
    }

    getScores(team: string): number[] {
        return this.scores.get(team);
    }

    getRankings(): string[] {
        const result: string[] = [...this.points.entries()]
            .sort(this.rankingComparator)
            .map((p: [string, number]) => `${p[0]} ${p[1]}`)
        return result;
    }

    private parseMatchResult(matchResult: string): Match {
        try {

            // Match results should be of the format "A 1 - 2 B"
            const pairs: string[] = matchResult.split(' - ');
            pairs[1] = pairs[1].split("").reverse().join("");

            const teams: string[] = pairs.map(
                (p: string) => p.split(' ')[0]
            );
            const scores: number[] = pairs.map(
                (p: string) => parseInt(p.split(' ')[1])
            );

            return {
                teams: [teams[0], teams[1]],
                scores: [scores[0], scores[1]],
            };

        } catch (e) {
            throw new MatchFormatError(matchResult);
        }

    }

    private updateScores(match: Match): void {

        for (let i = 0; i < match.teams.length; i++) {

            const team: string = match.teams[i]
            const score: number = match.scores[i]

            if (!this.scores.has(team)) {
                this.scores.set(team, new Array<number>());
                this.points.set(team, 0);
            }

            this.scores.get(team)?.push(score);

        }
    }

    private updatePoints(match: Match): void {

        const difference: number = match.scores[0] - match.scores[1];
        const s1: number = this.points.get(match.teams[0]);
        const s2: number = this.points.get(match.teams[1]);

        switch (Math.sign(difference)) {

            case 0:
                this.points.set(match.teams[0], s1 + 1);
                this.points.set(match.teams[1], s2 + 1);
                break;

            case -1:
                this.points.set(match.teams[0], s1 + 0);
                this.points.set(match.teams[1], s2 + 3);
                break;

            case 1:
                this.points.set(match.teams[0], s1 + 3);
                this.points.set(match.teams[1], s2 + 0);
                break;

        }

    }

    private rankingComparator(
        a: [string, number], b: [string, number]
    ): number {
        if (a[1] > b[1]) {
            return -1;
        } else if (a[1] < b[1]) {
            return 1;
        } else {
            if (a[0] > b[0]) {
                return 1;
            } else {
                return -1;
            }
        }
    }

}
