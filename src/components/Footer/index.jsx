import { GithubLogo } from "@phosphor-icons/react";
import logo from "./../../assets/logo.png";

export function Footer(props) {
   return ( 
       <footer className="footer items-center p-4 bg-white border-gray-500 border-t-4 text-neutral-content flex max-md:flex-col justify-between">
          <div className="items-center grid-flow-col flex gap-4">
            <img src={logo} className="h-12 w-12 rounded-full border-2 border-gray-800" alt="bot profile picture" />
            <p className="font-semibold">Copyright © 2023 - Ricardo Freitas</p>
          </div> 
          <GithubLogo size={42} className="cursor-pointer" onClick={() => window.open("https://github.com/ctw00049/team_2/")} />
          <div className="gap-4 md:place-self-center md:justify-self-end">
            <a href="https://www.sosvozamiga.org/" target="_blank" rel="noreferrer" className="font-semibold">SOS Voz Amiga (963 524 660)</a>
          </div>
        </footer>
    )
}
