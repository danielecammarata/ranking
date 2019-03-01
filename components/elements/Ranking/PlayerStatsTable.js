import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core"
import CountUp from "react-countup"

const rowHeaderStyle = {
  height: 25
}

const cellStyle = {
  border: "1px solid #C6C6C6",
  padding: "0 10px",
  textAlign: "center",
  whiteSpace: "nowrap",
  minWidth: 46
}

const PlayerStatsTable = ({
  points,
  matchPlayed,
  goalsAsDefender,
  goalsAsStriker,
  goalsConceded
}) => (
  <Table style={{ width: 150 }}>
    <TableHead>
      <TableRow style={rowHeaderStyle}>
        <TableCell style={cellStyle}>Score</TableCell>
        <TableCell style={cellStyle}>MP</TableCell>
        <TableCell style={cellStyle}>GM</TableCell>
        <TableCell style={cellStyle}>GC</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell style={cellStyle}>
          <CountUp start={0} end={points} duration={2.0} />
        </TableCell>
        <TableCell style={cellStyle}>
          <CountUp start={0} end={matchPlayed} duration={2.2} />
        </TableCell>
        <TableCell style={cellStyle}>
          <CountUp
            start={0}
            end={goalsAsDefender + goalsAsStriker}
            duration={3.0}
          />
        </TableCell>
        <TableCell style={cellStyle}>
          <CountUp start={0} end={goalsConceded} duration={1.8} />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
)

export default PlayerStatsTable
