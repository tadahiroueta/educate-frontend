import { useEffect, useRef, useState } from "react";

import { UserCircleIcon } from "@heroicons/react/24/solid";

import { Button } from "../components";

import axios from 'axios'

const topics = [
  {
    title: "Math",
    icon: "🧮"
  },
  {
    title: "Reading",
    icon: "📚"
  },
  {
    title: "Writing",
    icon: "📝"
  }
];

function FlashcardInput({ i, term, definition, update }) {
  const termRef = useRef();
  const definitionRef = useRef();

  useEffect(() => {
    if (!termRef.current) return;

    termRef.current.style.height = "0";
    termRef.current.style.height = `${ termRef.current.scrollHeight }px`;
  }, [term]);

  useEffect(() => {
    if (!definitionRef.current) return;

    definitionRef.current.style.height = "0";
    definitionRef.current.style.height = `${ definitionRef.current.scrollHeight }px`;
  }, [definition]);


  return (
    <div className="flex items-center gap-4">
      {/* container (for height adjustment) */}
      <div className="flex-1 h-36 flex items-center justify-center bg-white">
        <textarea placeholder="Add term" value={ term } onChange={ (e) => update(i, { term: e.target.value }) } ref={ termRef } className="w-4/5 max-h-full text-xl font-semibold text-center outline-none resize-none" />
      </div>
      <div className="flex-1 h-36 flex items-center justify-center bg-white">
        <textarea placeholder="Add defintion" value={ definition } onChange={ (e) => update(i, { definition: e.target.value }) } ref={ definitionRef } className="w-4/5 max-h-full text-center outline-none resize-none" />  
      </div>
    </div>
  );
}

export default function FlashcardCreate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0'); // Pad with zero if needed
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
  const year = today.getFullYear();
  const full_date = `${month}-${day}-${year}`;


  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [flashcards, setFlashcards] = useState([{ term: "", definition: "" }]);

  const updateFlashcard = (index, update) => {
    const updatedFlashcard = { ...flashcards[index], ...update };

    // remove flashcard
    if (index < flashcards.length - 1 && updatedFlashcard.term === "" && updatedFlashcard.definition === "") {
      setFlashcards(flashcards.filter((_, i) => i !== index));
      return;
    }

    // add next flashcard
    if (index === flashcards.length - 1 && updatedFlashcard.term !== "" && updatedFlashcard.definition !== "") {
      setFlashcards([...flashcards.slice(0, flashcards.length - 1), updatedFlashcard, { term: "", definition: "" }]);
      return; 
    }

    setFlashcards(flashcards.map((flashcard, i) => i === index ? { ...flashcard, ...update } : flashcard));
  }

  // TODO (remember to exclude the last flashcard)
  const handleSubmit = async () => {

    const data = {
      "flashcardSets": [
        {
          "title": title,
          "author": author,
          "topic": topic,
          "dateCreated": full_date,
          "rating": 0,
          "numberOfFlashcards": flashcards.length-1,
          "flashcards": flashcards.splice(0, flashcards.length-1)
        }
      ]
    };
    try {
      const response = await axios.post('https://educate-backend-69dte.ondigitalocean.app/api/upload_flashcardSet', data);
      console.log('Response from backend:', response.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    // outside container
    <div className="flex justify-center pt-12 pb-24 w-full bg-educate-blue-100">
      {/* inside container */}
      <div className="flex flex-col items-center gap-10 w-1/2">
        {/* header */}
        <div className="flex flex-col items-start gap-6 w-5/6">
          {/* title header */}
          <div className="flex flex-col gap-3 ">
            <input type="text" placeholder="Add Title" value={ title } onChange={(e) => setTitle(e.target.value) } className="w-full text-4xl font-plain font-semibold bg-transparent outline-none" />
            <div className="font-plain text-xs font-light">{ `${ today.getMonth() + 1 }/${ today.getDate() }/${ today.getFullYear() }` }</div>
          </div>
          {/* author section */}
          <div className="border-y border-slate-400 p-2 w-full flex items-center justify-between">
            <div className="flex items-center gap-4">
              <UserCircleIcon className="w-10 text-slate-400" />
              <input placeholder="Add your name" value={author} onChange={ (e) => setAuthor(e.target.value) } className="font-plain bg-transparent outline-none" />
            </div>
            <div className="text-sm font-plain">Your very first flashcard set</div>
          </div>
          {/* topics */}
          <div className="w-full justify-around flex flex-items">
            { topics.map((currentTopic, i) => <Button fill={ topic === currentTopic.title } key={ i } onClick={ () => setTopic(topic === currentTopic.title ? undefined : currentTopic.title) }>{ currentTopic.icon } { currentTopic.title }</Button>) }
          </div>
        </div>
        {/* flashcards */}
        <div className="w-5/6 flex flex-col gap-4">
          { flashcards.map((flashcard, i) => <FlashcardInput key={ i } i={ i } term={ flashcard.term } definition={ flashcard.definition } update={ updateFlashcard } />) }
        </div>
        <Button fill={ flashcards.length > 1 } onClick={ handleSubmit }>Submit flashcard set</Button>
      </div>
    </div>
  );
}