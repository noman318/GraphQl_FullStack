import Header from "./components/Header";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import Login from "./pages/Login";
import RegisterForm from "./pages/RegisterForm";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache,
});

function App() {
  const localData = localStorage?.getItem("graphQl_token");

  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              {localData ? (
                <>
                  <Route path="/" element={<HomeScreen />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<RegisterForm />} />
                  <Route path="/project/:id" element={<Projects />} />
                  <Route path="*" element={<NotFound />} />
                </>
              ) : (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<RegisterForm />} />
                </>
              )}
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
