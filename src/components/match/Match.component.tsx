import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, IconButton } from "@mui/material";
import { ArrowForward, Edit, Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { isNil } from 'lodash';
import { MatchType } from "../../constants/match.constants";
import { MatchModel } from "../../interface/match.model";

interface MatchProps {
  data: MatchModel;
  isReport?: boolean;
  isEdit?: boolean;
  isRemove?: boolean;
  isVote?: boolean;
  isOnlyResult?: boolean;
  handleVote?: (matchId: string, type: string) => void;
  handleRemove?: (matchId: string) => void;
}

const Match = (props: MatchProps) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>(props.data.selected);
  const [result, setResult] = useState<string>();

  useEffect(() => {
    if (isNil(props.data.teamHomeScore) || isNil(props.data.teamAwayScore)) {
      return;
    }

    if (props.data.teamHomeScore === props.data.teamAwayScore) {
      setResult(MatchType.Equal);
    }

    if (props.data.teamHomeScore > props.data.teamAwayScore) {
      setResult(MatchType.Win);
    }

    if (props.data.teamHomeScore < props.data.teamAwayScore) {
      setResult(MatchType.Lose);
    }
  }, [props.data]);
  const handleVote = (type: string) => {
    if (!result) {
      props.handleVote(props.data.id, type);
      setSelected(type);
    }
  }

  const handleReport = () => {
    navigate('/home/match-report/' + props.data.id);
  }

  const handleEdit = () => {
    navigate('/admin/edit-match/' + props.data.id);
  }

  const getBtnColor = (type: string) => {
    const color = type === result ? 'success' : 'primary';
    if (type === result || props.isOnlyResult) {
      return color;
    }

    if (selected === type && result && selected !== result) {
      return 'error';
    }

    return 'primary';
  }

  const getBtnVariant = (type: string) => {
    if (type === result) {
      return 'contained';
    }
    if (props.isOnlyResult) {
      return 'outlined';
    }

    return type === selected ? 'contained' : 'outlined';
  }

  return (
    <div className="wc-matches">
      <div className="wc-matches__item">
        <div className="wc-matches__item-header">
          <div>
            <span>{moment(props.data.time).format('dddd, MM/DD/YYYY')}</span>
            {moment(props.data.time).isSame(new Date(), 'day') ? <div className="wc-matches__item--today">hôm nay</div> : ''}
          </div>

          <div className="wc-matches__item-header-icons">
            {props.isReport && (<IconButton
              onClick={handleReport}
              aria-label="report"
              size="small">
              <ArrowForward fontSize="inherit" />
            </IconButton>)}

            {props.isEdit && (<IconButton
              onClick={handleEdit}
              aria-label="edit product"
              size="small">
              <Edit fontSize="inherit" />
            </IconButton>)}

            {props.isRemove && (<IconButton
              onClick={() => props.handleRemove(props.data.id)}
              aria-label="edit product"
              size="small">
              <Delete fontSize="inherit" />
            </IconButton>)}
          </div>
        </div>
        <div className="wc-matches__item-info">
          <div className="wc-matches__team-home">
            <Avatar src={props.data.teamHomeImg} />
            {props.data.teamHome}
          </div>
          <div className="wc-matches__score">
            {result && <h2>{props.data.teamHomeScore} - {props.data.teamAwayScore}</h2>}
            {!result && <h2>{moment(props.data.time).format('HH:mm')}</h2>}
          </div>
          <div className="wc-matches__team-away">
            <Avatar src={props.data.teamAwayImg} />
            {props.data.teamAway}
          </div>
        </div>
        {props.isVote && (<div className="wc-matches__item-vote">
          <Button
            focusVisibleClassName={selected === MatchType.Win ? 'wc-match__item-vote--selected' : ''}
            onClick={() => handleVote(MatchType.Win)}
            color={getBtnColor(MatchType.Win)}
            variant={getBtnVariant(MatchType.Win)} >
            Thắng
          </Button>
          <Button
            focusVisibleClassName={selected === MatchType.Equal ? 'wc-match__item-vote--selected' : ''}
            onClick={() => handleVote(MatchType.Equal)}
            color={getBtnColor(MatchType.Equal)}
            variant={getBtnVariant(MatchType.Equal)}>
            Hòa
          </Button>
          <Button
            focusVisibleClassName={selected === MatchType.Lose ? 'wc-match__item-vote--selected' : ''}
            onClick={() => handleVote(MatchType.Lose)}
            color={getBtnColor(MatchType.Lose)}
            variant={getBtnVariant(MatchType.Lose)}>
            Thua
          </Button>
        </div>)}
      </div>
    </div>
  )
}

export default Match;