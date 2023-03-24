import { Pencil } from "@phosphor-icons/react"
import { useState } from "react"
import Swal from "sweetalert2"
import logo from "./../../assets/logo.png"

export function Navbar(props) {
    const [username, setUsername] = useState(localStorage.getItem("username") || "User")

    if (!username) {
        chooseName()
    }

    function chooseName(edit = false) {
        Swal.fire({
            title: "Input username for session",
            inputLabel: "My new username is...",
            inputPlaceholder: "@",
            showCancelButton: edit,
            input: "text",
            inputValidator: (value) => {
                if (!value) {
                    return "You need to write something!"
                } else {
                    value = value.charAt(0).toUpperCase() + value.slice(1)
                    setUsername(value)
                    localStorage.setItem("username", value)
                }
            },
            allowOutsideClick: () => !Swal.isLoading() && edit,
        })
    }

   return (
       <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
          <div className="mb-2 sm:mb-0">
              <a href="/" className="text-2xl no-underline text-grey-darkest hover:text-blue-dark">Chatty</a>
          </div>
          <div className="flex gap-6 max-sm:flex-col">
            <a href="/chat" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">Chat</a>
            <a href="/calendar" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">Calendar - History</a>
            <a href="/about" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">About</a>
            <button onClick={chooseName} href="/three" className="text-lg no-underline text-grey-darkest flex justify-center items-center gap-2 hover:text-blue-dark ml-2 text-[#3b82f6]">
               <p>{username}</p>
               <Pencil size={32} color="#3b82f6" weight="duotone" />
           </button>
          </div>
        </nav>
    )
}
