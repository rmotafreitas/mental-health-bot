import { ArrowCircleLeft, ArrowCircleRight } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";

export function Calendar() {
    document.title = "Chatty - Calendar";
    function useQuery() {
        const { search } = useLocation();
        return useMemo(() => new URLSearchParams(search), [search]);
    }
    let query = useQuery();
    const err = query.get("err") || false;
    if (err) {
        switch (err) {
            case "1":
                Swal.fire({
                    title: "Error",
                    text: "No data for this day",
                    icon: "error",
                    confirmButtonText: "Ok",
                });
                break;
            case "2":
                Swal.fire({
                    title: "Error",
                    text: "No data for this chat",
                    icon: "error",
                    confirmButtonText: "Ok",
                });
                break;
            default:
                Swal.fire({
                    title: "Error",
                    text: "Unknown error :(",
                    icon: "error",
                    confirmButtonText: "Ok",
                });
                break;
        }
    }

    const arrMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);

    const addMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    }

    const subtractMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    }

    const addYear = () => {
        setYear(year + 1);
    }

    const subtractYear = () => {
        if (year === 0) {
            setYear(0);
        }
        setYear(year - 1);
    }

    const mathValues = {
        "NONE": 0,
        "N+": 1,
        "N": 2,
        "NEU": 3,
        "P": 4,
        "P+": 5,
    }

    const avarageText = [
        "No data",
        "Very Negative",
        "Negative",
        "Neutral",
        "Positive",
        "Very Positive",
    ]

    const colors = [
        "bg-white",
        "bg-red-500",
        "bg-yellow-500",
        "bg-green-500",
        "bg-blue-300",
        "bg-purple-500",
    ]

    const getMathValue = (day) => {
        const chats = JSON.parse(localStorage.getItem("chat") || "{}");
        const key = `${year}${month}${day}` 
        const chat = chats[key];
        let sum = 0;
        let days = 0;
        if (chat) {
            if (chat.emotions.length === 0) {
                return 0;
            }
            for (let i = 0; i < chat.chats.length; i++) {
                if (chat.emotions[i] !== "NONE") {
                    sum += mathValues[chat.emotions[i]];
                    days++;
                }
            }
        } else {
            return 0;
        }
        return Math.round(sum / days);
    }
    
    const getNumberOfDays = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    }

    const calendarComponents = () => {
        const numberOfDays = getNumberOfDays(month, year);
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month, numberOfDays).getDay();
        const days = [];
        for (let i = 0; i < firstDay; i++) {
            days.push(<div className="flex justify-center items-center w-14 h-14 bg-white border border-gray-300"></div>);
        }
        for (let i = 1; i <= numberOfDays; i++) {
            days.push(<a href={`/calendar/${year}${month}${i}`} className={`flex justify-center items-center w-14 h-14 ${colors[getMathValue(i)]} border border-gray-300`}><span className={`${hasASOS(i) && "bg-red-500 text-white"}`}>{i}</span></a>);
        }
        for (let i = 0; i < 6 - lastDay; i++) {
            days.push(<div className="flex justify-center items-center w-14 h-14 bg-white border border-gray-300"></div>);
        }
        for (let i = 0; i < days.length; i += 7) {
            days.splice(i, 0, <br />);
        }
        return days;
    }

    const calendarRowsAply = () => {
        // 7 days in a week
        const daysInWeek = 7;
        const calendarComponentsArr = calendarComponents();
        const calendarRows = [];
        for (let i = 0; i < calendarComponentsArr.length; i += daysInWeek) {
            calendarRows.push(calendarComponentsArr.slice(i, i + daysInWeek));
        }
        return calendarRows;
    }

    const hasASOS = (day) => {
        const chats = JSON.parse(localStorage.getItem("chat") || "{}");
        const key = `${year}${month}${day}`
        const chat = chats[key];
        console.log(chat);
        if (chat) {
            if (chat.sos > 0) {
                return true;
            }
        }
        return false;
    }

    const calendarRows = calendarRowsAply();

    // Do me a very simple calendar here
    return (
        <>
        <Navbar />
        <div className="flex flex-col text-center justify-center items-center w-screen min-h-screen bg-gray-100">
            <h1 className="text-black font-bold text-4xl my-10">Emotions Calendar</h1>
            <div className="flex text-black gap-6 justify-center items-center text-3xl font-medium">
                <ArrowCircleLeft onClick={subtractYear} size={44} color="black" />
                <p>{year}</p>
                <ArrowCircleRight onClick={() => setYear(year + 1)} size={44} color="black" />
            </div>
            <div className="flex text-black gap-6 justify-center items-center text-3xl font-medium">
                <ArrowCircleLeft onClick={subtractMonth} size={44} color="black" />
                <p>{arrMonths[month]}</p>
                <ArrowCircleRight onClick={addMonth} size={44} color="black" />
            </div>
            <div className="my-10 flex flex-wrap justify-center items-center">
                {calendarRows.map((row, index) => {
                    return (
                        <div className="flex flex-row justify-center items-center w-full h-14">
                            {row}
                        </div>
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
            <p className="text-white font-bold text-lg p-1 my-10 bg-red-500">If the number is marked in red, it means that you had at least one SOS action that day.</p>
        </div>
        <Footer />
        </>
    );
}
