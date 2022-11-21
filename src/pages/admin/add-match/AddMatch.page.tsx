import { Avatar, Button, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { isNil, isEmpty, isNaN } from 'lodash';
import moment from "moment";
import { TeamModel } from "../../../interface/team.model";
import { getTeams } from "../../../services/team.service";
import { addMatch } from "../../../services/match.service";
import { MatchModel } from "../../../interface/match.model";

const AddMatch = () => {
  const naviagte = useNavigate();
  const [teams, setTeams] = useState([]);
  const [data, setData] = useState<MatchModel>({
    teamHome: '',
    teamAway: '',
    teamHomeImg: '',
    teamAwayImg: '',
    teamHomeScore: 0,
    teamAwayScore: 0,
    price: 0,
    time: moment().toISOString()
  });

  const fetchTeams = async () => {
    try {
      const res = await getTeams();
      setTeams(res);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleChangeTeamHome = event => {
    const selectedTeam = teams.find(t => t.name === event.target.value);
    setData(prevData => ({ ...prevData, teamHome: selectedTeam.name, teamHomeImg: selectedTeam.image }));
  }

  const handleChangeTeamAway = event => {
    const selectedTeam = teams.find(t => t.name === event.target.value);
    if (selectedTeam) {
      setData(prevData => ({ ...prevData, teamAway: selectedTeam.name, teamAwayImg: selectedTeam.image }));
    }
  }

  const handleSetTime = (time: string) => {
    setData(prevData => ({ ...prevData, time }));
  }

  const handleSetFieldvalue = (e, fieldName: string) => {
    const value =  parseInt(e.target.value);
    setData(prevData => ({ ...prevData, [fieldName]: (!isNaN(value) ? value : '') }))
  }

  const handleAddMatch = async () => {
    if (!data.teamHome || !data.teamAway || data.teamHome === data.teamAway) {
      toast.error('Invalid team');
      return;
    }

    if (!data.time || !moment(data.time).isValid()) {
      toast.error('Invalid time');
      return;
    }

    if (!data.price) {
      toast.error('Invalid Price');
      return;
    }
    try {
      await addMatch({
        teamHome: data.teamHome,
        teamHomeImg: data.teamHomeImg,
        teamHomeScore: (!isNil(data.teamHomeScore) && !isNaN(data.teamHomeScore) && !isEmpty(data.teamHomeScore)) ? data.teamHomeScore : null,
        teamAway: data.teamAway,
        teamAwayScore: (!isNil(data.teamAwayScore) && !isNaN(data.teamAwayScore) && !isEmpty(data.teamAwayScore)) ? data.teamAwayScore : null,
        teamAwayImg: data.teamAwayImg,
        price: data.price,
        time: moment(data.time).toISOString()
      });
      toast.success("Add successfully");
      naviagte("/admin/matches");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="wc-add-match">
      <h2>Add Match</h2>
      <div className="wc-add-match__teams">
        <FormControl sx={{ m: 1, minWidth: '40%', margin: 0 }} size="small">
          <Select
            labelId="select-team-home"
            id="select-team-home"
            className="wc-add-match__team-home"
            value={data.teamHome}
            label="Team home"
            onChange={handleChangeTeamHome}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {teams.map((team: TeamModel) => <MenuItem value={team.name}>
              <Avatar src={team.image} /> <span className="u-padding-left">{team.name}</span>
            </MenuItem>)}
          </Select>
        </FormControl>
        <h3> vs </h3>
        <FormControl sx={{ m: 1, minWidth: '40%', margin: 0 }} size="small">
          <Select
            labelId="select-team-away"
            id="select-team-away"
            className="wc-add-match__team-away"
            value={data.teamAway}
            label="Team away"
            onChange={handleChangeTeamAway}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {teams.map((team: TeamModel) => <MenuItem value={team.name}>
              <Avatar src={team.image} /> <span className="u-padding-left">{team.name}</span>
            </MenuItem>)}
          </Select>
        </FormControl>
      </div>
      <DateTimePicker
        className="u-full-width"
        label="Start time"
        renderInput={(params) => <TextField {...params} />}
        value={data.time}
        onChange={(newValue) => {
          handleSetTime(newValue);
        }}
      />
      <FormControl fullWidth sx={{ m: 1, margin: "2rem 0 0" }}>
        <InputLabel htmlFor="price">Price</InputLabel>
        <OutlinedInput
          id="price"
          type="number"
          value={data.price}
          onChange={e => handleSetFieldvalue(e, 'price')}
          endAdornment={<InputAdornment position="end">VND</InputAdornment>}
          label="Price"
        />
      </FormControl>
      <TextField
        id="team-home-score"
        label="Team 1 score"
        type="number"
        fullWidth
        sx={{ m: 1, margin: "2rem 0 0" }}
        value={data.teamHomeScore || 0}
        onChange={e => handleSetFieldvalue(e, 'teamHomeScore')}
      />
      <TextField
        id="team-away-score"
        label="Team 2 score"
        type="number"
        fullWidth
        sx={{ m: 1, margin: "2rem 0 0" }}
        value={data.teamAwayScore || 0}
        onChange={e => handleSetFieldvalue(e, 'teamAwayScore')}
      />
      <Button
        onClick={handleAddMatch}
        sx={{ m: 1, margin: "2rem 0 0" }}
        color="primary"
        variant="outlined">
        Add
      </Button>
      <Button
        onClick={() => naviagte('/admin/matches')}
        sx={{ m: 1, margin: "2rem 0 0 2rem" }}
        color="primary"
        variant="outlined">
        Cancel
      </Button>
    </div>
  )
}

export default AddMatch;