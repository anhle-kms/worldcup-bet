import { useEffect, useState } from "react";
import { isNil, orderBy } from 'lodash';
import { getAllMatches } from "../../../services/match.service";
import { getAllUsers, getUsersReportByMatch } from "../../../services/user.service";
import { toast } from "react-toastify";
import { Avatar, Container } from "@mui/material";
import { MatchType } from "../../../constants/match.constants";

const ResultPage = () => {
  const [users, setUsers] = useState([]);

  const getResultMatchType = (match) => {
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

  const caculatorCost = (match, userVotes) => {
    let numberCorrects = 0;
    const result = getResultMatchType(match);
    if (!result) {
      return;
    }
    userVotes.forEach(user => {
      if (!user.selected || user.selected.toUpperCase() === result.toUpperCase()) {
        numberCorrects++;
      }
    });
    return (numberCorrects * match.price * 0.5) / numberCorrects;
  }

  const getUserCostByMath = (user, match, failedCost) => {
    const result = getResultMatchType(match);
    if (!result) {
      return '';
    }
    if (!user.selected || (result && result.toUpperCase() !== user.selected.toUpperCase())) {
      return match.price * -1;
    }
    return failedCost;
  }

  const getCostPerStudent = async (matches) => {
    const userCost = {};
    const allVotesPromise = matches.map(async match => {
      return await getUsersReportByMatch(match.id);
    });

    const allVotes = await Promise.all(allVotesPromise);
    matches.map((match, index) => {
      const userVotes: any = allVotes[index];
      if (userVotes && userVotes.length > 0) {
        const failedCost = caculatorCost(match, userVotes);
        userVotes.map(u => {
          const cost = getUserCostByMath(u, match, failedCost);
          if (userCost[u.uid]) {
            userCost[u.uid] = userCost[u.uid] + cost;
          } else {
            userCost[u.uid] = cost;
          }
        });
      }
    });
    return userCost;
  }

  const getUsers = async (userCost) => {
    try {
      const res = await getAllUsers();
      const values = res.map(u => ({ ...u, cost: userCost[u.uid] || 0 }));
      setUsers(orderBy(values, 'cost', 'asc'));
    } catch (error) {
      toast.error(error.message);
    }
  }

  const getMatches = async () => {
    try {
      const matches = await getAllMatches();
      let userCost = {};
      if (matches.length > 0) {
        userCost = await getCostPerStudent(matches);
      }
      getUsers(userCost);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getMatches();
  }, []);


  return (
    <div className="wc-dinamond-sponsor u-scroll">
      <Container maxWidth="md" sx={{ marginBottom: "2rem" }}>
        {users.map(user => (
          <div className="wc-dinamond-sponsor--item" key={user.uid}>
            <Avatar src={user && user.photoURL} sx={{ width: 32, height: 32 }} />
            <span className="wc-dinamond-sponsor--item-name">{user.name}</span>
            <span className="wc-dinamond-sponsor--item-cost">{user.cost}k</span>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default ResultPage;
