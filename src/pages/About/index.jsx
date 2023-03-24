import { Navbar } from "../../components/Navbar"
import { Footer } from "../../components/Footer"
import { Card } from "../../components/Card";

import uiux from "../../assets/uiux.jpg";
import chatbot from "../../assets/chatbot.jpg";
import login from "../../assets/login.webp";
import sentiments from "../../assets/sentiments.jpeg";
import talk from "../../assets/talk.jpg";
import sos from "../../assets/sos.jpg";
import mood from "../../assets/mood.png";
import funny from "../../assets/funny.png";
import game from "../../assets/game.jpg";
import history from "../../assets/history.jpg";
import ctw from "../../assets/ctw.jpg";
import js from "../../assets/js.png";
import user from "../../assets/user.png";

export function About(params) {
    document.title = "Chatty - About";
   return ( 
        <>
        <Navbar />
        <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
            <h1 className="text-4xl font-bold mt-6">About</h1>
            <h2 className="text-2xl font-medium mb-6">Some facts of the Project</h2>
            <div className="items-center justify-center flex flex-wrap gap-6">
                <Card image={ctw} title="Critical TechWorks" desc="This project was for a Hackathon at FCUP - Faculdade de Ciências da Universidade do Porto, which involved the company Critical TechWorks." />
                <Card image={talk} title="Mental Health Chatbot" desc="The theme was to make a chatbot related to mental health" />
                <Card image={js} title="JavaScript" desc="The project is 100% JavaScript (React.js & Node.js), without any API for the chatbot" />
            </div>
            
            <h1 className="text-4xl font-bold mt-6">Features</h1>
            <h2 className="text-2xl font-medium mb-6">Some Features of the Project</h2>
            <div className="items-center justify-center flex flex-wrap gap-6">
                <Card image={sentiments} title="Identify your sentiments" desc="This chatbot can identify what are you feeling!" />
                <Card image={talk} title="Chatbot" desc="A chatbot that can try to make simple conversations" />
                <Card image={sos} title="S.O.S Mode" desc="A chatbot that will give advices when they are most needed" />
                <Card image={mood} title="Sentiments Tracker" desc="A chatbot that will keep track of your feelings in a calendar" />
                <Card image={funny} title="Funny Mode" desc="A chatbot that will try to cheer you up" />
                <Card image={game} title="Game Mode" desc="A chatbot that will play with you to cheer you up (1 Game in the moment)" />
                <Card image={history} title="History" desc="A chatbot that will keep track of your conversations" />
                <Card image={user} title="User customization" desc="You can change the nickname that the bot uses for you!" />
            </div>

            <h1 className="text-4xl font-bold text-center mt-6">Future</h1>
            <h2 className="text-2xl font-medium mb-6 text-center">Some Features for the Future of the Project</h2>
            <div className="items-center justify-center flex flex-wrap gap-6">
                <Card image={uiux} title="A better UI & UX" />
                <Card image={chatbot} title="More AI" desc="A more intelgent chatbot" />
                <Card image={login} title="Login" desc="Login native and with Google/others" />
                <Card image={game} title="More Games..." desc="More games in future..." />
            </div>
        </div>
        <Footer />
        </>
    );
}
