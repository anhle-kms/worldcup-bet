export const RoutePath = {
  security: {
    login: 'login',
    register: 'register'
  },
  app: {
    home: 'home',
    currentMatchList: 'matches',
    account: 'acount',
    history: 'history',
    matchReport: 'match-report/:matchId',
    result: 'diamond-sponsor'
  },
  admin: {
    home: 'admin',
    matches: 'matches',
    addMatch: 'add-match',
    editMatch: 'edit-match/:id'
  }
};

export const AppConstant = {
  redux: {
    APP_STATE: 'appState'
  }
}

export const firebaseConfig = {
  apiKey: "AIzaSyB7R9Vc8595PEoRWOAXOlwbemseaE1deSA",
  authDomain: "worldcup-bet-ca7ad.firebaseapp.com",
  databaseURL: "https://worldcup-bet-ca7ad-default-rtdb.firebaseio.com",
  projectId: "worldcup-bet-ca7ad",
  storageBucket: "worldcup-bet-ca7ad.appspot.com",
  messagingSenderId: "114955377191",
  appId: "1:114955377191:web:0a6cc1a301a36af712cc02",
  measurementId: "G-9CBCL0JVYH"
};

export const localStorageKeys = {
  User: 'wc_user',
  WCState: 'wcState'
}
