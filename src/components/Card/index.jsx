export function  Card(props) {
   return ( 
       <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {props.image && <img class="rounded-t-lg h-48 object-cover min-w-full" src={props.image} />}
            <div class="p-5">
                {props.title && <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.title}</h5>}
                {props.desc && <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.desc}</p>}
            </div>
        </div>
    );
}
