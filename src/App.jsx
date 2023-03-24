import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { About } from "./pages/About";
import { Calendar } from "./pages/Calendar";

import { Chat } from "./pages/Chat"
import { ChatReview } from "./pages/ChatReview";
import { Day } from "./pages/Day";
import { Home } from "./pages/Home";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/calendar/:dayid" element={<Day />} />
                <Route path="/calendar/:dayid/:msgid" element={<ChatReview />} />
                <Route path="*" element={<h1>404</h1>} /> 
            </Routes>
        </Router>
    )
}

export default App
