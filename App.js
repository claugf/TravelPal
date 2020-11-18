//  Importing navigation libraries
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

//  Importing Screens
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";

//  Creating Navigator
const navigator = createStackNavigator({
  Home: { screen: Home },
  ErrorPage: { screen: ErrorPage },
});

export default createAppContainer(navigator);
