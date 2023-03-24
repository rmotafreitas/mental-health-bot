import { Calendar as CalendarIcon, Eye, Heart, PaperPlaneRight, Pencil, Siren, Trash, User } from "@phosphor-icons/react"
import { useEffect, useRef, useState, useId } from "react"
import { Message } from "./../../components/Message"
import bot_pfp from "./../../assets/botpfp.png"
import Swal from "sweetalert2"
import { useParams } from "react-router-dom"
import { Navbar } from "../../components/Navbar"
import { Footer } from "../../components/Footer"

export function ChatReview() {
    document.title = "Chatty - Chat Rewiew"
    const day = useParams().dayid || false;
    if (!day) return window.location.replace("/calendar?err");
    const chats = JSON.parse(localStorage.getItem("chat") || "{}");
    if (!chats) return window.location.replace("/calendar?err=1");
    let chat = chats[day]
    if (!chat) return window.location.replace("/calendar?err=1");
    chat = chat.chats
    if (!chat.length) return window.location.replace("/calendar?err=1");
    const chatId = useParams().msgid || false;
    if (!chatId) return window.location.replace("/calendar?err");
    let messages = chat.find((c) => c.id == chatId)
    if (!messages) return window.location.replace("/calendar?err=2");
    if (!messages.messages.length) return window.location.replace("/calendar?err=2");
    const date = new Date(messages.time)
    messages = messages.messages

    const [username, setUsername] = useState(localStorage.getItem("username") || "User")

    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Deleted!", "Your file has been deleted.", "success")
                const chats = JSON.parse(localStorage.getItem("chat") || "{}");
                const arrIds = chats[day].chats.map((c) => c.id)
                const index = arrIds.indexOf(chatId)
                chats[day].emotions.splice(index, 1)
                chats[day].chats = chats[day].chats.filter((c) => c.id != chatId)
                if (chats[day].sosDays.find((c) => c == chatId)) {
                    chats[day].sosDays = chats[day].sosDays.filter((c) => c != chatId)
                    chats[day].sos--
                }
                localStorage.setItem("chat", JSON.stringify(chats))
                if (chats[day].chats.length == 0) {
                    window.location.replace(`/calendar`)
                } else {
                    window.location.replace(`/calendar/${day}`)
                }
            }
        })
    }


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

    document.title = `Chatty - ${strDay} | ${strDay}`

      return (
          <>
          <Navbar />
          <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
            <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
                  {/* TOP BAR */}
                  <div className="flex items-center justify-between w-full bg-gray-200 h-14 p-2">
                        <div className="flex gap-1 items-center">
                            <img src={bot_pfp} className="h-10 w-10 rounded-full border-2 border-gray-800" alt="bot profile picture" />
                            <p className="text-gray-800 font-medium text-lg">Chatty</p>
                        </div>
                        <div className="flex gap-6 items-center">
                          <button onClick={handleDelete} className="flex gap-1 items-center">
                              <Trash size={32} color="#d70f0f" weight="duotone" />
                              <p className="text-[#d70f0f]">Delete</p>
                          </button>
                        </div>
                  </div>
                <div className={`flex flex-col flex-grow h-0 p-4 overflow-auto`}>
                    {messages.map((msg, i) => (
                        <Message key={i} text={msg.text} time={msg.time} isReply={msg.isReply} />
                    ))}
            </div>
            <div className="flex flex-col items-center justify-center gap-2 w-full text-md my-2 p-2">
                <p className="flex justify-center items-center gap-2"><Eye size={32} color="#3b82f6" weight="duotone" />In view mode of </p>
                <p className="flex justify-center items-center gap-2 font-light text-sm">{strDay} - {strHMS(date)}</p>
                <button className="flex items-center h-10 w-content rounded px-3 border-2 border-gray-200 hover:bg-gray-200" onClick={() => window.location.replace(`/calendar/${day}`)}>
                    Go back to day history chat
                </button>
            </div>
        </div>
	</div>
    <Footer />
    </>
  )
}
