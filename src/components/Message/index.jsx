import bot_pfp from './../../assets/botpfp.png';
import user_pfp from './../../assets/userpfp.png';

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

export function Message(props) {
    console.log(props.text);
    console.log(props.time);
    const isReply = props.isReply || false;
    const roundedClass = isReply ? 'rounded-l-lg rounded-br-lg' : 'rounded-r-lg rounded-bl-lg';
    return (
        <div className={`flex w-full mt-2 gap-2 max-w-xs ${isReply && 'ml-auto justify-end'}`}>
            {!isReply && 
                <img src={bot_pfp} className="h-10 w-10 rounded-full border-2 border-gray-800" alt="bot profile picture" />
            }
            <div>
                <div className={`${isReply ? "bg-blue-500 text-white" : "bg-gray-300"} p-3 ${roundedClass}`}>
                    {validURL(props.text) ? 
                        <img src={props.text} alt="gif" />
                        :
                        <p className="text-sm">{props.text}</p>
                    }
                </div>
                <span className="text-xs text-gray-500 leading-none">{timeAgo.format(props.time)}</span>
            </div>
            {isReply && 
                <img src={user_pfp} className="h-10 w-10 rounded-full border-2 border-gray-800" alt="bot profile picture" />
            }
        </div>
    );
}
