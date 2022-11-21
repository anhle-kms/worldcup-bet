import { Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { isNil } from "lodash";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Match from "../../../components/match/Match.component";
import { MatchModel } from "../../../interface/match.model";
import { getMatch } from "../../../services/match.service";
import { getUsersReportByMatch } from "../../../services/user.service";
import { MatchType } from "../../../constants/match.constants";

const MatchReportPage = () => {
  const naviagte = useNavigate();
  const { matchId } = useParams();
  const [match, setMatch] = useState<MatchModel>();
  const [users, setUsers] = useState<any>([]);
  const [costPerPerson, setCostPerPerson] = useState<number>();

  const getResultMatchType = () => {
    if (isNil(match.teamAwayScore) || isNil(match.teamHomeScore)) {
      return;
    }

    if (match.teamHomeScore > match.teamAwayScore) {
      return MatchType.Win;
    }

    if (match.teamHomeScore < match.teamAwayScore) {
      return MatchType.Lose;
    }
    return MatchType.Equal;
  }

  const caculatorCost = () => {
    let numberCorrects = 0;
    const result = getResultMatchType();
    if (!result) {
      return;
    }
    users.forEach(user => {
      if (!user.selected || user.selected.toUpperCase() === result.toUpperCase()) {
        numberCorrects++;
      }
    });
    setCostPerPerson((numberCorrects * match.price * 0.5) / numberCorrects);
  }

  const fetchMatch = async () => {
    try {
      const result = await getMatch(matchId);
      setMatch(result);
    } catch (error) {
      toast.error(error.message);
    }
  }
  const fetchVoteReport = async () => {
    try {
      const result = await getUsersReportByMatch(matchId);
      setUsers(result);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchMatch();
    fetchVoteReport();
  }, []);

  useEffect(() => {
    if (users.length > 0 && match) {
      caculatorCost();
    }
  }, [users, match]);

  const renderCost = (user) => {
    const result = getResultMatchType();
    if (!result) {
      return '';
    }
    if (!user.selected || (result && result.toUpperCase() !== user.selected.toUpperCase())) {
      return `-${match.price}k VNĐ`;
    }
    return `${costPerPerson}k VNĐ`;
  }

  return (
    <div className="wc-match-report u-scroll">
      <Container maxWidth="md" sx={{ marginBottom: "2rem" }}>
        <Button
          sx={{ marginTop: "1rem" }}
          onClick={() => naviagte('/home/history')}
          color="primary"
          variant="contained">
          Back
        </Button>
        {match && <Match data={match} isVote={!!getResultMatchType()} />}
        <TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
          <Table aria-label="selected">
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Selected</TableCell>
                <TableCell>Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.selected && row.selected.toUpperCase()}</TableCell>
                  <TableCell>{renderCost(row)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default MatchReportPage;
