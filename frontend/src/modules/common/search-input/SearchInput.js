import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { UserService } from '@src/services/UserService';
import { useGlobalStore } from '@src/hooks';
import { styles } from './styles';

function SearchInput(props) {
  const { classes } = props;
  const [userOptionList, setUserOptionList] = useState([]);
  const [errorStatus, setErrorState] = useState(false);
  const { contactChatStore, groupChatStore } = useGlobalStore();

  const fetchUserWithEmailSearch = async (emailString) => {
    const payload = {
      emailString,
    };
    const response = await UserService.search_user_with_email(payload);
    setUserOptionList(response.msg.users);
  };

  const checkContactExist = async (contactId) => {
    const payload = {
      contactId,
    };
    return await UserService.check_user_contact(payload);
  };

  const handleUserInput = (userInput) => {
    if (userInput.length === 0) {
      setErrorState(false);
      setUserOptionList([]);
      return;
    }
    if (userInput.length > 0 && userInput.length < 5) {
      setErrorState(true);
      setUserOptionList([]);
    } else {
      setErrorState(false);
      setTimeout(fetchUserWithEmailSearch.bind(null, userInput), 100);
    }
  };

  const handleChangeAutoComplete = async (newValue) => {
    const { msg } = await checkContactExist(newValue.id);
    if (msg.length === 0) {
      contactChatStore.setCurrentUserChattingInfo({ ...newValue, isContacted: false });
    } else {
      groupChatStore.setCurrentGroupChatInfo({ groupId: msg[0].groupId });
      contactChatStore.setCurrentUserChattingInfo({ ...newValue, isContacted: true });
    }
  };

  return (
    <div className='search-input'>
      <Autocomplete
        freeSolo
        disableClearable
        options={userOptionList}
        blurOnSelect
        onChange={(event, newValue) => {
          handleChangeAutoComplete(newValue);
        }}
        onInputChange={(_, newInputValue) => {
          handleUserInput(newInputValue);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            // Prevent's default 'Enter' behavior.
            event.defaultMuiPrevented = true;
          }
        }}
        getOptionLabel={(option) => option.email}
        renderInput={(params) => (
          <TextField
            {...params}
            error={errorStatus}
            placeholder='People, group and message'
            variant='outlined'
            helperText={errorStatus && 'Please fill at least 4 characters'}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon className={classes.colorTextWhite} />
                </InputAdornment>
              ),
              classes: { input: classes.input },
            }}
            size='small'
            fullWidth
            className={classes.textFieldStyle}
          />
        )}
      />
    </div>
  );
}

export default withStyles(styles)(SearchInput);
