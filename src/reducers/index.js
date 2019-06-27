import * as actions from "../actions";

const initialState = {
  token: localStorage.getItem("token"),
  username: localStorage.getItem("username"),
  loggingIn: false,
  authError: '',
  getWordError: '',
  gettingWord: false,
  word: {},
  globalStats: true,
  personalStats: true,
  queueRecordCorrect: null,
  queueRecordIncorrect: null,
  attemptsToGetStats: 0,
  filteredSettings: localStorage.getItem('filteredSettings'),
  gettingSettings: true,
  getSettingsError: '',
  gettingGoal: false,
  getGoalError: '',
  dailyGoal: 0,
  dailyProgress: 0,
  postingGoal: false,
  postGoalError: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN_START:
      return {
        ...state,
        loggingIn: true,
        authError: ""
      };
    case actions.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);
      return {
        ...state,
        loggingIn: false,
        token: action.payload.token,
        username: action.payload.username
      };
    case actions.LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        authError: action.payload
      };
    case actions.LOGOUT:
      localStorage.setItem('token', '');
      localStorage.setItem('username', '');
      localStorage.setItem('filteredSettings', null);
      return {
        ...state,
        loggingIn: false,
        authError: '',
        token: '',
        username: ''
      }
    case actions.SIGNUP_START:
      return {
        ...state,
        loggingIn: true,
        authError: ""
      };
    case actions.SIGNUP_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);
      return {
        ...state,
        loggingIn: false,
        token: action.payload.token,
        username: action.payload.username
      };
    case actions.SIGNUP_FAILURE:
      return {
        ...state,
        loggingIn: false,
        authError: action.payload
      };
    case actions.SET_AUTH_ERROR:
      return {
        ...state,
        authError: action.payload
      };
    case actions.GETWORD_START:
      return {
        ...state,
        getWordError: "",
        gettingWord: true,
        attemptsToGetStats: 0
      }
    case actions.GETWORD_SUCCESS:
      return {
        ...state,
        gettingWord: false,
        word: action.payload
      }
    case actions.GETWORD_FAILURE:
      return {
        ...state,
        gettingWord: false,
        getWordError: action.payload
      }
    case actions.GETSTATS_START:
      return {
        ...state,
        gettingStats: true,
        globalStats: {},
        personalStats: {},
        attemptsToGetStats: state.attemptsToGetStats + 1
      }
    case actions.GETSTATS_SUCCESS:
      return {
        ...state,
        gettingStats: false,
        globalStats: action.payload.globals,
        personalStats: action.payload.personal
      }
    case actions.GETSTATS_FAILURE:
      return {
        ...state,
        gettingStats: false
      }
    case actions.QUEUE_RECORD_CORRECT:
      return {
        ...state,
        queueRecordCorrect: action.payload,
        attemptsToGetStats: 0
      }
    case actions.QUEUE_RECORD_INCORRECT:
      return {
        ...state,
        queueRecordIncorrect: action.payload,
        attemptsToGetStats: 0
      }
    case actions.CLEAR_QUEUE:
      return {
        ...state,
        queueRecordIncorrect: null,
        queueRecordCorrect: null
      }
    case actions.SET_FILTER_START:
      return {
        ...state,
        gettingSettings: true
      }
    case actions.SET_FILTER_SUCCESS:
      localStorage.setItem('filteredSettings', action.payload);  
      return {
        ...state,
        gettingSettings: false,
        filteredSettings: action.payload
      }
    case actions.SET_FILTER_FAILURE:
      return {
        ...state,
        gettingSettings: false,
        getSettingsError: action.payload
      }
    case actions.GET_SETTINGS_START:
      return {
        ...state,
        gettingSettings: true,
        getSettingsError: ''
      }
    case actions.GET_SETTINGS_SUCCESS:
      localStorage.setItem('filteredSettings', action.payload);
      return {
        ...state,
        gettingSettings: false,
        filteredSettings: action.payload
      }
    case actions.GET_SETTINGS_FAILURE:
      return {
        ...state,
        gettingSettings: false,
        getSettingsError: action.payload
      }
    case actions.GET_GOAL_START: 
      return {
        ...state,
        gettingGoal: true,
        getGoalError: ''
      }
    case actions.GET_GOAL_SUCCESS:
      return {
        ...state,
        gettingGoal: false,
        dailyGoal: action.payload.daily_goal,
        dailyProgress: action.payload.daily_progress
      }
    case actions.GET_GOAL_FAILURE:
      return {
        ...state,
        gettingGoal: false,
        getGoalError: action.payload
      }
    case actions.POST_GOAL_START:
      return {
        ...state,
        postingGoal: true,
        postGoalError: ''
      }
    case actions.POST_GOAL_SUCCESS:
      return {
        ...state,
        postingGoal: false,
        dailyGoal: action.payload.daily_goal,
        dailyProgress: action.payload.daily_progress
      }
    case actions.POST_GOAL_FAILURE:
      return {
        ...state,
        postingGoal: false,
        postGoalError: action.payload
      }  
    default:
      return state;
  }
};

export default reducer;
