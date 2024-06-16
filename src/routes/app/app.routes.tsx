import { RoutePath } from "../../constants/app.constants";
import HistoryPage from "../../pages/home/history/History.page";
import AccountPage from "../../pages/home/account/Account.page";
import HomePage from "../../pages/home/Home.page";
import MatchesPage from "../../pages/home/matches/Matches.page";
import MatchReportPage from "../../pages/home/match-report/MatchReport.page";
import ResultPage from "../../pages/home/result/Result.page";

export const AppRoutes = {
  path: RoutePath.app.home,
  element: <HomePage />,
  children: [
    {
      path: RoutePath.app.account,
      element: <AccountPage />
    },
    {
      path: RoutePath.app.history,
      element: <HistoryPage />
    },
    {
      path: RoutePath.app.matchReport,
      element: <MatchReportPage />
    },
    {
      path: RoutePath.app.result,
      element: <ResultPage />
    },
    {
      path: RoutePath.app.currentMatchList,
      element: <MatchesPage />
    }
  ]
}
