import { Calendar as CalendarIcon, FloppyDisk, Heart, PaperPlaneRight, Pencil, Siren, Trash, User } from "@phosphor-icons/react"
import { useEffect, useRef, useState, useId } from "react"
import { grabRandomGif } from "./../../assets/gifs"
import { Message } from "./../../components/Message"
import chat_json from "./../../assets/chat.json"
import sos_json from "./../../assets/sos.json"
import bot_pfp from "./../../assets/botpfp.png"
import Swal from "sweetalert2"
import { Navbar } from "../../components/Navbar"
import { Footer } from "../../components/Footer"

export function Chat() {
    document.title = "Chatty - Chat"
    const bottomRef = useRef(null);
    const [id, setId] = useState(Date.now())
    const [username, setUsername] = useState(localStorage.getItem("username") || "User")

    const intros = [
        "Hey there! 😊 I'm Chatty, a chat bot here to help with your mental health.",
        "Welcome! 🙌 My name is Chatty, and I'm here to support your mental well-being.",
        "Hi, it's great to meet you! 🤗 I'm Chatty, a chat bot designed to help you with your mental health.",
        "Hello, friend! 😄 My name is Chatty, and I'm here to offer you support for your mental health.",
        "Glad to see you! 🤩 My name is Chatty, and I'm here to help you take care of your mental health.",
        "Hey there, I'm Chatty! 😁 As a chat bot, my goal is to help you with your mental well-being.",
        "Hi, I'm Chatty! 🤖 I'm here to support you and provide you with resources for your mental health.",
        "Nice to meet you! 🤝 I'm Chatty, a chat bot specifically designed to help with mental health. How can I assist you?"
    ]

    const hi = [
        `Hello ${username}!\nWhat are you feeling in the moment?`,
        `Hi there ${username}!\nHow are you feeling today?`,
        `Good day ${username}!\nWhat brings you here?`,
        `Hello ${username}!\nWhat can I do to help you?`,
        `Hi ${username}!\nWhat's been going on with you?`,
        `Greetings ${username}!\nWhat's the mood like today?`,
        `Good morning ${username}!\nHow are you feeling?`,
        `Greetings ${username}!\nWhat's happening with you?`,
        `Good to see you ${username}!\nHow have you been feeling?`
      ]

    const saveToLocalStorage = () => {
        const localStore = JSON.parse(localStorage.getItem("chat") || "{}")
        // Fin the key for the current day in the local storage should be day+month+year
        const key = `${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}` 
        // Get the current local localStorage
        if (localStore[key] === undefined) {
            console.log("new day")
            console.log(key)
            localStore[key] = {
                chats: [],
                emotions: [],
                sos: 0,
                sosDays: [],
            }
        }
        console.log(localStore)
        let flag = false;
        for (let i = 0; i < localStore[key].chats.length; i++) {
            if (localStore[key].chats[i].id === id) {
                localStore[key].chats[i].messages = messages
                flag = true;
            }
        }
        console.log(flag)
        if (!flag) {
            if (isSOS) {
                localStore[key].sos++
                localStore[key].sosDays.push(id)
            }
            localStore[key].emotions.push(emotion)
            localStore[key].chats.push(
                {
                    messages: messages,
                    id: id,
                    time: Date.now(),
                }
            )
        }
        // Save the current localStore to the localStorage
        localStorage.setItem("chat", JSON.stringify(localStore))
        Swal.fire({
            title: "Saved!",
            icon: "success",
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false,
        }).then(() => {
            window.location.replace("/calendar")
        })
    }

    const yesandnoOptions = [
        {
            text: "Yes",
        },
        {
            text: "No",
        },
    ]

    const [messages, setMessages] = useState([
        {
            text: intros[Math.floor(Math.random() * intros.length)],
            isReply: false,
            time: Date.now(),
        },
        {
            text: hi[Math.floor(Math.random() * hi.length)],
            isReply: false,
            time: Date.now(),
        },
    ])
    const [hasToRespondWithOptions, setHasToRespondWithOptions] = useState(false)

    const [options, setOptions] = useState(yesandnoOptions)

    const conversation = useRef(messages);
    const [msgText, setMsgText] = useState("")
    const [emotion, setEmotion] = useState("NONE")
    const [talkative, setTalkative] = useState(false)
    const [isBye, setIsBye] = useState(false)
    const [isSOS, setIsSOS] = useState(false)
    const otherPerson = useRef(false)

    const action = useRef(false)

    const getUserSentimentAnalysis = async (text) => {
        // Create the formdata 
        const formData = new FormData();
        formData.append("key", "80f9b867059850e8733c1ade1fc08998");
        formData.append("lang", "en");
        formData.append("model", "general");
        formData.append("txt", text);

        const response = await fetch("https://api.meaningcloud.com/sentiment-2.1", {
            method: "POST",
            mode: "cors",
            redirect: 'follow',
            body: formData
        })
        const data = await response.json()
        conversation.current.push({text: msgText, isReply: true, time: Date.now()})
        setMsgText("")
        console.log(data)
        setEmotion(data.score_tag)
        return data
    }

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    const handleMsgText = (e) => {
        setMsgText(e.target.value)
    }

    const RESPONSE_TEXT = {
        "P+": {
            responses: [
                "That's fantastic!",
                "I'm thrilled to hear that!",
                "Awesome! Keep up the good work!",
                "I'm so happy for you!",
                "That's wonderful news!",
                "Congratulations!",
                "I'm glad to see things are going well for you!",
                "Fantastic news! You must be so proud!",
                "Keep up the great work!",
                "That's really great to hear!",
                "Amazing! So happy for you!",
                "That's a real milestone! Congrats!",
                "You're doing great! Keep it up!"
            ],
            followup: [
                {
                    text: "Do you want to spend some time chatting with me?",
                    action: "talkative",
                    options: yesandnoOptions,
                }
            ],
        },
        "P": {
            responses: [
                "That's good to hear!",
                "Glad to hear things are going well!",
                "I'm happy for you!",
                "It's great to see you doing well!",
                "That's good news!",
                "I'm pleased to hear that!",
                "That's a positive sign!",
                "Great to hear you're in a good place!",
                "Things are looking up!",
                "I'm glad to see things are improving!",
                "Keep up the good work!",
                "I'm happy for your progress!",
                "Glad to see you're feeling better!"
            ],
        },
        "NEU": {
            responses: [
                "I see. Can you tell me more about that?",
                "I understand.",
                "I hear what you're saying.",
                "I'm here to listen.",
                "Thank you for sharing.",
                "I'm sorry to hear that.",
                "It's okay not to feel a certain way.",
                "I appreciate your honesty.",
                "I'm here to support you.",
                "It's okay to feel how you feel.",
                "Take your time. I'm listening.",
                "Let me know if you need to talk more.",
                "I'm here for you."            ],
        },
        "N": {
            responses: [
                "I'm sorry to hear that.",
                "That must be really difficult for you.",
                "Thank you for sharing that with me.",
                "I can understand why you might feel that way.",
                "It sounds like you're going through a tough time.",
                "I'm here to support you.",
                "It's okay to feel the way you do.",
                "Take your time.",
                "You're not alone.",
                "I'm here to listen.",
                "That sounds really hard.",
                "Let me know if there's anything I can do to help.",
                "It's okay to ask for help."            ],
            followup: [
                {
                    text: "Do you want me to send something to cheer you up? 😊",
                    action: "sendCheerUp",
                    options: yesandnoOptions,
                },
                {
                    text: [
                        "Do you want to play a game with me?",
                        "Maybe it will cheer you up! 😊",
                        "Besides I'm a professional at rock paper scissors!",
                    ],
                    action: "playRPS",
                    options: yesandnoOptions,
                },
            ],
        },
        "N+": {
            responses: [
                "That sounds really tough.",
                "I'm sorry you're going through that.",
                "I can't imagine how hard that must be for you.",
                "Thank you for sharing that with me.",
                "It's okay to not be okay.",
                "Take your time. I'm here to listen.",
                "You're not alone in this.",
                "It's okay to feel overwhelmed.",
                "That's a lot to handle. I'm here to support you.",
                "I'm here for you.",
                "I'm sorry that you're struggling right now.",
                "Remember that it's okay to ask for help.",
                "Let's work through this together."
            ],
        },
        "NONE": {
            responses: [
                "I'm sorry, I didn't understand. Could you explain that again?",
                "I'm not sure I follow. Can you tell me more?",
                "Could you clarify that for me?", 
            ],
            followup: null,
        }
    }

    const handleBotMsg = (text) => {
        conversation.current.push({text: text, isReply: false, time: Date.now()})
        setMessages([...conversation.current])
    }

    const handleSendMsg = async () => {
        if (msgText === "") return
        if (!talkative) {
            const data = await getUserSentimentAnalysis(msgText)
            let followup = false 
            switch (data.score_tag) {
                case "P+":
                    handleBotMsg(RESPONSE_TEXT["P+"].responses[Math.floor(Math.random() * RESPONSE_TEXT["P+"].responses.length)])
                    followup = RESPONSE_TEXT["P+"].followup[Math.floor(Math.random() * RESPONSE_TEXT["P+"].followup.length)]
                    break;
                case "P":
                    handleBotMsg(RESPONSE_TEXT["P"].responses[Math.floor(Math.random() * RESPONSE_TEXT["P"].responses.length)])
                    followup = RESPONSE_TEXT["P+"].followup[Math.floor(Math.random() * RESPONSE_TEXT["P+"].followup.length)]
                    break;
                case "NEU":
                    handleBotMsg(RESPONSE_TEXT["NEU"].responses[Math.floor(Math.random() * RESPONSE_TEXT["NEU"].responses.length)])
                    setTalkative(true)
                    break;
                case "N":
                    handleBotMsg(RESPONSE_TEXT["N"].responses[Math.floor(Math.random() * RESPONSE_TEXT["N"].responses.length)])
                    followup = RESPONSE_TEXT["N"].followup[Math.floor(Math.random() * RESPONSE_TEXT["N"].followup.length)]
                    break;
                case "N+":
                    handleBotMsg(RESPONSE_TEXT["N+"].responses[Math.floor(Math.random() * RESPONSE_TEXT["N+"].responses.length)])
                    followup = RESPONSE_TEXT["N"].followup[Math.floor(Math.random() * RESPONSE_TEXT["N"].followup.length)]
                    break;
                case "NONE":
                    handleBotMsg(RESPONSE_TEXT["NONE"].responses[Math.floor(Math.random() * RESPONSE_TEXT["NONE"].responses.length)])
                    break;
            }
            if (followup) {
                if (followup.text) {
                    if (Array.isArray(followup.text)) {
                        for (const text of followup.text) {
                            handleBotMsg(text)
                        }
                    } else {
                        handleBotMsg(followup.text)
                    }
                }
                if (followup.action) {
                    action.current = followup.action
                }
                if (followup.options) {
                    setOptions(followup.options)
                    setHasToRespondWithOptions(true)
                }
            }
        } else {
            sendSimpleMsg(msgText, true)
            for (const key in sos_json) {
                for (const prompt of sos_json[key].keywords) {
                    if (msgText.toLowerCase().includes(prompt.toLowerCase())) {
                        sendSimpleMsg(`I'm sorry to hear that you're ${sos_json[key].feeling}.`)
                        sendSimpleMsg("This situation is beyond my capabilities, but I can send you a list of resources that can help you.")
                        sendSimpleMsg(sos_json[key].message)
                        setIsSOS(true)
                        setIsBye(true)
                        return
                    }
                }
            }
            for (const questions of chat_json) {
                for (let question of questions.questions) {
                    const questionWithoutSpecialChars = question.replace(/[^a-zA-Z ]/g, "")
                    const msgTextWithoutSpecialChars = msgText.replace(/[^a-zA-Z ]/g, "")
                    if (msgTextWithoutSpecialChars.toLowerCase() == (questionWithoutSpecialChars.toLowerCase())) {
                        const response = questions.answers[Math.floor(Math.random() * questions.answers.length)]
                        sendSimpleMsg(response)
                        setIsBye(questions.isBye || false)
                        setIsSOS(questions.isSOS || false)
                        if (questions.isSOS) {
                            handleSOSMODE()
                        }
                        if (questions.isGame) {
                            setHasToRespondWithOptions(true)
                            sendSimpleMsg("What do you want to play?")
                            setOptions([
                                {
                                    text: "Rock Paper Scissors",
                                },
                            ])
                        }
                        if (questions.isToCheerUp) {
                            sendSimpleMsg("Do you want me to cheer you up? :)")
                            setHasToRespondWithOptions(true)
                            setOptions(yesandnoOptions)
                            action.current = "sendCheerUp"
                            setTalkative(false)
                        }
                        return
                    }
                }
            }
            sendSimpleMsg("I'm sorry, I didn't quite get that.")
        }

    }

    const handleSOSMODE = () => {
        action.current = "sos"
        setTalkative(false)
        sendSimpleMsg("Is this the case? Are you in crisis?")
        setHasToRespondWithOptions(true)
        setOptions([...yesandnoOptions, {
            text: 'What does "cririsis" mean?'
        },
            {
                text: 'What happens if I say "yes"?'
            },
        ])
    }

    const sendSimpleMsg = (text, reply = false) => {
        if (reply) {
            setMsgText("")
        }
        conversation.current.push({text, isReply: reply, time: Date.now()})
        setMessages([...conversation.current])
    }

    const sendSOSMESSAGES = () => {
        sendSimpleMsg(`I'm sorry to yo're going through this, ${username}... I strongly recomend that you reach out to and adult you trust who can support you and help you stay safe right now`)
        sendSimpleMsg("This situation is beyond my capabilities, but I can send you a list of resources that can help you.") 
        setIsSOS(true)
        setIsBye(true)
        setHasToRespondWithOptions(false)
    }

    const handleSelectOption = (option) => {
        sendSimpleMsg(option.text, true)
        switch (option.text) {
            case "Rock Paper Scissors":
                action.current = "playRPS"
                sendSimpleMsg("Okay, let's play!")
                setHasToRespondWithOptions(true)
                setOptions([
                    {
                        text: "Rock",
                    },
                    {
                        text: "Paper",
                    },
                    {
                        text: "Scissors",
                    },
                ])
                break;
            case "Yes":
                switch (action.current) {
                    case "sos":
                        sendSOSMESSAGES()
                        break;
                    case "sendCheerUp":
                        const gif = grabRandomGif()
                        console.log(gif)
                        sendSimpleMsg(gif.url);
                        sendSimpleMsg(gif.text);
                        setHasToRespondWithOptions(false);
                        setTalkative(true);
                        action.current = "talkative";
                        const arrRandom = [
                            "What's on your mind?",
                            "What's up?",
                            "How are you doing?",
                            "How's it going?",
                            "What's new?",
                            "What's going on?",
                            "Let's talk a bit!",
                            "Lets talk!",
                            "Let's continue our conversation!"
                        ]
                        sendSimpleMsg(arrRandom[Math.floor(Math.random() * arrRandom.length)])
                        break;
                    case "talkative":
                        sendSimpleMsg("Great! What's on your mind?");
                        setTalkative(true);
                        setHasToRespondWithOptions(false);
                        break;
                    case "playRPS":
                            sendSimpleMsg("Okay, let's play!");
                        setOptions([
                            {
                                text: "Rock",
                            },
                            {
                                text: "Paper",
                            },
                            {
                                text: "Scissors",
                            },
                        ])
                        setHasToRespondWithOptions(true);
                        break;
                }
                break;
            case "No":
                switch (action.current) {
                    case "sos":
                        sendSimpleMsg("Okay, false alarm. I'm glad you're okay!");
                        sendSimpleMsg("I've been coded case you need something I can't help you with, which is why I picked up on that.");
                        setHasToRespondWithOptions(false);
                        setTalkative(true);
                        setIsSOS(false);
                        action.current = "talkative";
                        break;
                    case "sendCheerUp":
                        sendSimpleMsg("Okay, I hope you feel better soon!");
                        setHasToRespondWithOptions(false);
                        setTalkative(true);
                        action.current = "talkative";
                        break;
                    case "talkative":
                        sendSimpleMsg("Okay, have a nice day!");
                        setHasToRespondWithOptions(false);
                        setIsBye(true);
                        break;
                    case "playRPS":
                        sendSimpleMsg("Okay, maybe next time!");
                        if (!talkative) {
                            sendSimpleMsg("I am here to listen if you want to talk!");
                            sendSimpleMsg("So do you want to talk?");
                            action.current = "talkative";
                            setOptions(yesandnoOptions)
                            setHasToRespondWithOptions(true);
                        } else {
                            setHasToRespondWithOptions(false);
                        }
                        break;
                }
                break;
            case "Rock":
            case "Paper":
            case "Scissors":
                const rps = ["Rock", "Paper", "Scissors"]
                const botChoice = rps[Math.floor(Math.random() * rps.length)]
                sendSimpleMsg(botChoice)
                if (botChoice === "Rock") {
                    sendSimpleMsg("It's a tie!")
                }
                if (botChoice === "Paper") {
                    sendSimpleMsg("I win, I said that I was a professional!")
                }
                if (botChoice === "Scissors") {
                    sendSimpleMsg("You win, congratulations!")
                }
                sendSimpleMsg("Do you want to play again?")
                setOptions(yesandnoOptions)
                setHasToRespondWithOptions(true);
                break;
            case "What does \"cririsis\" mean?":
                    sendSimpleMsg("A crisis is a time of intense difficulty, trouble, or danger.")
                setHasToRespondWithOptions(true);
                setOptions([{
                    text: "Okay, I understand."
                }])
                break;
            case "Okay, I understand.":
                    sendSimpleMsg(`Are you in crisis, ${username}?`)
                setHasToRespondWithOptions(true);
                setOptions([...yesandnoOptions, {
                    text: 'What happens if I say "yes"?'
                }])
                break;
            case "What happens if I say \"yes\"?":
                    sendSimpleMsg("If you say yes, I will not send a ambulance or alert law enforcement, but I will send you a list of resources that can help you.")
                setHasToRespondWithOptions(true);
                setOptions([{
                    text: "Okay, I understand."
                },
                    {
                        text: "What does \"cririsis\" mean?"
                    }
                ])
                break;
        }
    }

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.replace("/")
            }
        })
    }

      return (
          <>
          <Navbar />
          <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
            <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
                  {/* TOP BAR */}
                  <div className="flex items-center max-md:flex-col justify-between w-full bg-gray-200 h-content p-2">
                        <div className="flex gap-1 items-center">
                            <img src={bot_pfp} className="h-10 w-10 rounded-full border-2 border-gray-800" alt="bot profile picture" />
                            <p className="text-gray-800 font-medium text-lg">Chatty</p>
                        </div>
                        <div className="flex gap-6 items-center">
                          <button onClick={handleSOSMODE} className={`flex gap-1 items-center ${isSOS && "hidden"}`}>
                              <Siren size={32} color="#d70f0f" />
                              <p className="text-[#d70f0f]">S.O.S</p>
                          </button>
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
                    {hasToRespondWithOptions && (
                        <div className="flex flex-col items-center justify-center gap-2 w-full text-lg my-2 p-2">
                                {options.map((option, i) => (
                                    <button key={i} className="flex items-center h-10 w-content rounded px-3 border-2 border-gray-200 hover:bg-gray-200" onClick={() => handleSelectOption(option)}>
                                        {option.text}
                                    </button>
                                ))}
                    </div>
                )
                }
              <div ref={bottomRef} />
            </div>
            <div className={`bg-gray-300 p-4 flex items-center ${(hasToRespondWithOptions || isBye) && "hidden"}`}>
                <input className="flex items-center h-10 w-full rounded px-3 text-sm"  onChange={handleMsgText} type="text" placeholder="Type your message…" value={msgText} />
                <PaperPlaneRight onClick={handleSendMsg} size={42} color={"#6c5dd9"} className="flex items-center justify-center rounded-full text-white text-sm ml-2 pointer" />
            </div>
            {(isBye && !isSOS) && (
                <div className="flex flex-col items-center justify-center gap-2 w-full text-md my-2 p-2">
                    <p>Thank you for talking to me!</p>
                    <button className="flex items-center gap-2 justify-center h-10 w-content rounded px-3 border-2 border-gray-200 hover:bg-gray-200" onClick={saveToLocalStorage}>
                        <FloppyDisk size={32} color="#3b82f6" weight="duotone" />
                        Save & Start a new conversation
                    </button>
                </div>
            )}
            {(isSOS && isBye) && (
                <div className="flex flex-col items-center text-center justify-center gap-2 w-full text-md my-2 p-2">
                        <p>Unfortunately, I am not able to help you more than I already did.</p>
                        <p className="flex gap-1 items-center justify-center"><Heart size={16} color="#d70f0f" weight="fill" />Here are some resources that might help you:</p>
                    <ul className="list-disc list-inside list-none">
                        <li><a className="text-blue-500" href="https://www.sosvozamiga.org/">Voz Amiga</a></li>
                        <li className="text-blue-500">+351 800 202 212</li>
                    </ul>
                    <p>Thank you for talking to me!</p>
                    <button className="flex items-center gap-2 justify-center h-10 w-content rounded px-3 border-2 border-gray-200 hover:bg-gray-200" onClick={saveToLocalStorage}>
                        <FloppyDisk size={32} color="#3b82f6" weight="duotone" />
                        Save & Start a new conversation
                    </button>
                </div>
            )}
        </div>
	</div>
    <Footer />
    </>
  )
}
