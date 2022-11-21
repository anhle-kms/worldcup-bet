import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Match from "../../../components/match/Match.component";
import { appSelectors } from '../../../redux/app';
import { isNil } from  'lodash';
import { getMatches } from '../../../services/match.service';
import { vote } from '../../../services/vote.service';

const MatchesPage = () => {
  var user = useSelector(appSelectors.getUser);
  const [matches, setMatches] = useState([]);

  const fetchMatches = async () => {
    const response = await getMatches(user.id);
    setMatches(response.filter(match => isNil(match.teamHomeScore) || isNil(match.teamAwayScore)).sort((a, b) => {
      return (new Date(a.time)).getTime() - (new Date(b.time)).getTime();
    }));
  }

  const handleVote = async (matchId: string, type: string) => {
    await vote(user.id, matchId, type);
    setMatches(prevValue => prevValue.map(match => {
      if (match.id === matchId) {
        return { ...match, type };
      }
      return type;
    }))
  }

  useEffect(() => {
    if (user && user.id) {
      fetchMatches();
    }
  }, [user]);

  return (
    <div className="u-scroll">
      <Container maxWidth="md" sx={{ marginBottom: "2rem" }}>
        {matches.map(match => <Match isVote key={match.id} data={match} handleVote={handleVote} />)}
      </Container>
    </div>
  )
}

export default MatchesPage;