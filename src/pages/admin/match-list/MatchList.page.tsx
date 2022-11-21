import { Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Match from "../../../components/match/Match.component";
import { appSelectors } from "../../../redux/app";
import { deleteMatch, getMatches } from "../../../services/match.service";
import { vote } from "../../../services/vote.service";

const MatchList = () => {
  const naviagte = useNavigate();
  const user = useSelector(appSelectors.getUser);
  const [matches, setMatches] = useState([]);

  const fetchMatches = async () => {
    const response = await getMatches(user.id);
    setMatches(response.sort((a, b) => {
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

  const handleAddMatch = () => {
    naviagte('/admin/add-match');
  }

  const handleRemoveMatch = async (id: string) => {
    try {
      await deleteMatch(id);
      toast.success('Delete successfully');
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="u-scroll">
      <Container maxWidth="md" sx={{ marginBottom: "2rem" }}>
        <div className="u-margin-top">
          <Button
            onClick={handleAddMatch}
            color="primary"
            variant="contained">
            Add Match
          </Button>
        </div>
        {matches.map(match => <Match
          isEdit
          isRemove
          isOnlyResult
          key={match.id}
          data={match}
          handleVote={handleVote}
          handleRemove={handleRemoveMatch} />)}
      </Container>
    </div>
  )
}

export default MatchList;