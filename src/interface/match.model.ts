export interface MatchModel {
  id?: string;
  teamHome: string;
  teamHomeImg: string;
  teamHomeScore?: number;
  teamAway: string;
  teamAwayImg: string;
  teamAwayScore?: number;
  time: string;
  price: number;
  selected?: string;
};
