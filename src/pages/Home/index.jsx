import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import logo from "./../../assets/icon.png";

export function Home() {
    document.title = "Chatty - Home";
    return (
        <>
        <Navbar />
        <div className="h-[calc(100vh-64px)] flex justify-center items-center gap-16">
            <div className="text-white text-center">
              <h2 className="text-4xl font-bold">Chatty your emotions!</h2>
              <p className="text-xl font-semibold mb-10">Mental health chatbot</p>
              <p className="text-xl font-medium mb-10">Pro Tip: You can change your username!</p>
              <a href="/chat" className="mt-16 p-2 border-2 border-white rounded-lg text-xl font-semibold hover:bg-white transition ease-in-out hover:text-[#b845fe]">Chat with me now</a>
            </div>
          <img className="max-md:hidden" src={logo} />
        </div>
        <Footer />
        </>
    )
}
