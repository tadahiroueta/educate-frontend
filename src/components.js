import { Link } from "react-router-dom";

import { StarIcon as StarIconSolid, UserCircleIcon, FlagIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline, ArrowPathIcon } from "@heroicons/react/24/outline"; 

/**
 * @param {*} fill - true will fill the button blue; false will outline the button with accent color 
 */
export function Button({ fill, onClick, className, children }) {
  return (
    <button onClick={ onClick } className={ "rounded-lg h-9 md:h-auto px-3 md:px-6 md:py-2 font-components font-semibold border-2 " + (fill ? "border-educate-blue-500 bg-educate-blue-500 text-white animate-throb active:bg-educate-blue-700 " : "border-educate-blue-900 hover:bg-educate-blue-900 hover:text-white hover:animate-throb active:border-educate-blue-700 active:bg-educate-blue-700 active:animate-throb ") + className}>
      { children }
    </button>
  );
}

function HalfStarIcon({ className }) {
  return (
    <div className={ "relative " + className }>
      <svg xmlns="http://www.w3.org/2000/svg" class="absolute top-0 left-0 h-full w-full" viewBox="0 0 20 20" fill="currentColor">
        <path d="M 9.049,2.927 C 9.1985626,2.4678429 9.5974148,2.2375949 9.9968701,2.2362559 l -5.9e-6,11.8199721 C 9.7915851,14.056767 9.5864369,14.120358 9.412,14.247 l -2.8,2.034 C 5.828,16.851 4.774,16.084 5.073,15.163 l 1.07,-3.292 C 6.276704,11.45883 6.1297413,11.007444 5.779,10.753 L 2.98,8.72 C 2.197,8.15 2.6,6.91 3.568,6.91 H 7.029 C 7.4619424,6.9101141 7.8457879,6.6316142 7.98,6.22 L 9.05,2.928 Z" />
      </svg>
      <StarIconOutline className="w-full h-full" />
    </div>
  );
}

function Star({ rating, threshold, className }) {
  return rating >= threshold
    ? <StarIconSolid className={ className } />
    : rating >= threshold - .5
    ? <HalfStarIcon className={ className }/>
    : <StarIconOutline className={ className } />;
}

export function TopicPill({ className, children }) {
  return <div className={ "inline-block border rounded-full border-educate-blue-500 px-2 font-components text-educate-blue-500 " + className }>{ children }</div>;
}

export function SetCard({ set, collection }) {  
  return (
    <Link to={ "/flashcard/" + collection } className="flex-1 flex flex-col justify-between border border-off-white-500 rounded-md bg-off-white-100 p-4 h-full">
      {/* top line */}
      <div className="flex items-start justify-between">
        <div className="text-lg font-plain font-medium line-clamp-2">{ set.title }</div>
        {/* star rating */}
        <div className="flex items-end">
          <div className="text-xs font-components font-light">{ set.rating + "/5" }</div>
          { Array.from({ length: 5 }, (_, i) => (<Star key={i} rating={ set.rating } threshold={ i + 1 } className="w-5 text-educate-blue-500" />)) }
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {/* middle line */}
        <div className="flex items-center gap-2">
          <TopicPill>{ set.topic }</TopicPill>
          <div className="text-xs font-plain font-light">{ set.numberOfFlashcards + " terms" }</div>
        </div>
        {/* bottom line */}
        <div className="flex items-center justify-between">
          {/* profile */}
          <div className="flex items-center gap-2">
            <UserCircleIcon className="w-8 text-slate-400" />
            <div className="font-plain">{ set.author }</div>
          </div>
          <div className="font-plain text-xs">{ set.dateCreated }</div>
        </div>
      </div>
    </Link>
  );
}

export function SetRow({ title, sets, className }) {
  if (!sets) {
    return <></>
  }
  return (
    <div className={ "flex flex-col gap-4 " + className }>
      <h3 className="text-lg font-plain font-medium">{ title }</h3>
      <div className="flex flex-col md:flex-row items-center gap-4">
        { sets?.map((set, index) => <SetCard key={ index } set={ set.documents[0] } collection={ set.collection } />) }
      </div>
    </div>
  );
}

export function FlashcardFace({ yellow, content, backface, className }) {
  return (
    <div className={ "absolute backface-hidden flex flex-col items-end justify-between shadow-md p-3 w-full h-full " + (backface ? "v-rotate " : "") + (yellow ? "bg-off-white-100 " : "bg-amber-50 ") + className }>
      {/* top right */}
      <div className="flex items-center gap-6">
        <div className="font-plain text-xs font-light">tap to flip</div>
        <ArrowPathIcon className="w-10 text-educate-blue-700" />
      </div>
      {/* content */}
      <div className="w-full flex flex-col items-center justify-center font-plain text-3xl">
        { content }
      </div>
      {/* bottom right */}
      <div className="flex items-center gap-6">
        <div className="font-plain text-xs font-light">flag to study again later</div>
        <FlagIcon className="w-10 text-off-white-500" />
      </div>
    </div>
  )
}

export function linkToPage(){
  return(
    <Link to={'./pages/FlashcardCreation.js'}>
      <div>
        <h2>
          Create a flashcard Set!
        </h2>
      </div>
    </Link>
  )
}
export function BlogPreview({ thumbnail, title, description, topic, date }) {
  return (
    <Link to={ "/blog/" + encodeURIComponent(title) }>
      <div className="w-full rounded-lg flex flex-col gap-6 p-3 bg-off-white-100 border border-off-white-500">
        <img src={ thumbnail } alt="thumbnail" className="w-full h-48 rounded-lg object-cover" />
        <h2 className="font-plain text-xl font-semibold">{ title }</h2>
        <p className="font-plain text-ellipsis">{ description }</p>
        <div className="flex justify-between">
          <TopicPill className="text-xs">{ topic }</TopicPill>
          <p className="text-plain text-xs">{ date }</p>
        </div>
      </div>
    </Link>
  );
}

export function SmallBlogPreview({ thumbnail, title, description, topic, date }) {
  return (
    <div className="w-full rounded-lg flex flex-col gap-2 p-3 bg-off-white-100 border border-off-white-500">
      <img src={ thumbnail } alt="thumbnail" className="w-full h-36 rounded-lg object-cover" />
      <h2 className="grow font-plain text-xl font-semibold">{ title }</h2>
      <div className="flex justify-between">
        <TopicPill className="text-xs">{ topic }</TopicPill>
        <p className="text-plain text-xs">{ date }</p>
      </div>
    </div>
  );
}

export function InputBox({ onClick, className, children }) {
  return (
    <div onClick={ onClick } className={ "py-4 px-6 rounded-lg border bg-off-white-100 border-gray-300 flex items-center gap-2 text-sm *:outline-none " + className }>
      { children }
    </div>
  );
}
