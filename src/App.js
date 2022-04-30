import store from "./redux/store";
import { Provider } from "react-redux";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Nav from "./components/Nav";
import BooksComponent from "./components/BooksComponent";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Nav />}>
              <Route index element={<LoginPage />} />
              <Route path="home">
                <Route index element={<Home />} />
                <Route path="books" element={<BooksComponent />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
