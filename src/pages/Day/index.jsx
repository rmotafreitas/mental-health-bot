import { useParams } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";

export function Day() {
    document.title = "Chatty - Day";
    const day = useParams().dayid || false;
    if (!day) return window.location.replace("/calendar?err");
    const chats = JSON.parse(localStorage.getItem("chat") || "{}");
    if (!chats) return window.location.replace("/calendar?err=1");
    let chat = chats[day]
    if (!chat) return window.location.replace("/calendar?err=1");
    chat = chat.chats
    if (!chat.length) return window.location.replace("/calendar?err=1");
    const date = new Date(chat[0].time);
    const strDay = date.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const strHMS = (d) => d.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });
    const colors = {
        "NONE": "bg-white",
        "N+": "bg-red-500",
        "N": "bg-yellow-500",
        "NEU": "bg-green-500",
        "P": "bg-blue-300",
        "P+": "bg-purple-500",
    }
    document.title = `Chatty - Day | ${strDay}`;
    return (
        <>
        <Navbar />
        <div className="flex flex-col text-center justify-center items-center w-screen min-h-screen bg-gray-100 overflow-x-hidden">
            <h1 className="text-3xl font-bold mb-4">{strDay}</h1>
            <div className="flex flex-col gap-2 my-4">
            {chat.map((c, i) => 
            {
                return (
                    <a href={`/calendar/${day}/${c.id}`} className={`flex flex-col gap-2 p-2 text-left ${colors[chats[day].emotions[i]]} border border-gray-500 border-2`}>
                        <h1 className={`text-xl font-bold ${chats[day].sosDays.includes(c.id) && "bg-red-500 text-white"}`}>Chat #{((i+1).toString()).padStart(2, "0")}</h1>
                        <p className="text-lg">Time: {strHMS(new Date(c.time))}</p>
                    </a>
                )
            })}
            </div>
            <div className="flex flex-wrap flex-row justify-center items-center gap-4">
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className="w-14 h-14 bg-white"></div>
                    <p className="text-black font-medium text-xl">Unknow</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className="w-14 h-14 bg-red-500"></div>
                    <p className="text-black font-medium text-xl">Very Sad</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className="w-14 h-14 bg-yellow-500"></div>
                    <p className="text-black font-medium text-xl">Sad</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className="w-14 h-14 bg-green-500"></div>
                    <p className="text-black font-medium text-xl">Neutral</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className="w-14 h-14 bg-blue-500"></div>
                    <p className="text-black font-medium text-xl">Happy</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className="w-14 h-14 bg-purple-500"></div>
                    <p className="text-black font-medium text-xl">Very Happy</p>
                </div>
            </div>
            <p className="text-white font-bold text-lg p-1 my-10 bg-red-500">If the number is marked in red, it means that you had a SOS action.</p>
        </div>
        <Footer />
        </>
    )
}
