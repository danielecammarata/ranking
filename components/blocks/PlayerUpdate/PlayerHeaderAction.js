import {
  Button,
  Fade,
  FormLabel,
  IconButton,
  Paper,
  Popper,
  TextField
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import PlayerRoleSelection from '../../elements/PlayerRoleSelection'

const buttonSize = '46px'

const popperWrapper = {
  backgroundColor: '#fff',
  boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
  maxWidth: '90vw',
  padding: '20px',
}

const formArea = {
  float: 'left',
  maxWidth: 'calc(100% - 90px)',
}

const formText = {
  width: '100%',
}

const formButton = {
  backgroundColor: 'green',
  color: '#fff',
  fontSize: '12.5px',
  height: '100%',
  marginLeft: '-8px',
  padding: '0',
  width: '100%',
}

const formButtonWrapper = {
  borderRadius: '50%',
  float: 'left',
  height: buttonSize,
  marginLeft: '20px',
  marginTop: '40px',
  maxWidth: buttonSize,
  overflow: 'hidden',
  width: buttonSize,
}

const PlayerHeaderAction = ({
  classes,
  anchorEl,
  open,
  placement,

  name,
  avatarUrl,
  role,
  description = '',

  handleEdit,
  handleChange,
  onSubmit
}) =>
  <>
    <IconButton style={{position: 'relative'}} onClick={handleEdit('bottom-end')}>
      <MoreVertIcon />
    </IconButton>
    <Popper open={open} anchorEl={anchorEl} placement={placement} style={popperWrapper} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper>
            <form autoComplete="off" onSubmit={onSubmit}>
              <div style={formArea}>
                <TextField
                  style={formText}
                  id="name"
                  label="Name"
                  value={name}
                  onChange={handleChange('name')}
                  margin="normal"
                  required
                />
                <TextField
                  style={formText}
                  id="avatarUrl"
                  label="Avatar URL"
                  value={avatarUrl}
                  onChange={handleChange('avatarUrl')}
                  margin="normal"
                  required
                />
                <FormLabel className={classes.radioLegend} component="legend">Main role</FormLabel>
                <PlayerRoleSelection
                  classes={classes}
                  role={role}
                  handleChange={handleChange}
                />
                <TextField
                  style={formText}
                  className={classes.userDescription}
                  id="description"
                  label="Description"
                  value={description}
                  multiline
                  onChange={handleChange('description')}
                  margin="normal"
                />
              </div>
              <div style={formButtonWrapper}>
                <Button
                  style={formButton}
                  variant="contained"
                  type="submit"
                >
                  EDIT
                </Button>
              </div>
            </form>
          </Paper>
        </Fade>
      )}
    </Popper>
  </>

export default PlayerHeaderAction
