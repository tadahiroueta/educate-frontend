import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import search from "overlap-search";

import { ArrowLeftCircleIcon, ArrowRightCircleIcon, BookmarkIcon, UserCircleIcon } from "@heroicons/react/24/solid";

import { FlashcardFace, SetRow, TopicPill } from "../components";

export default function FlashcardSession() {
  const { collection } = useParams();

  let [set, setSet] = useState();
  let [relatedSets, setRelatedSets] = useState([]);
  let [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0); // TODO dev
  let [isFlipped, setIsFlipped] = useState(false);
  let [addedFlashcards, setAddedFlashcards] = useState([]);

  useEffect(() => {
    axios.get("https://390t17n7-5000.usw2.devtunnels.ms/api/get_set/" + collection)
      .then((response) => {
        const set = response.data;
        setSet(set);
        addFlashcard(0, "animate-slide-left", set);
        axios.get("https://390t17n7-5000.usw2.devtunnels.ms/api/get_collections")
          .then((response) => {
            const onTopicSets = response.data.filter((otherSet) => otherSet.documents[0].topic === set.topic && otherSet.collection !== set.collection);
            setRelatedSets(search(set.title, onTopicSets.map((set) => set.documents[0].title)).map((index) => onTopicSets[index]).slice(0, 2));
            console.log(set.collection)
          })
          .catch((err) => console.log("Error fetching data:", err));
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, [collection]);

  const addFlashcard = useCallback((flashcardIndex, slide, set) => {
    // only after fetching
    if (!set) return;

    const flashcard = set.flashcards[flashcardIndex];
    setCurrentFlashcardIndex(flashcardIndex);
    setAddedFlashcards(previousAddedFlashcards => [
      ...previousAddedFlashcards,
      {
        id: flashcardIndex,
        term: flashcard.term,
        definition: flashcard.definition,
        slide
      }
    ]);
  }, []);

  return !set ? null : (
    // outside container
    <div className="flex justify-center pt-12 pb-24 w-full bg-educate-blue-100">
      {/* inside container */}
      <div className="flex flex-col items-center gap-6 w-1/2">
        {/* header */}
        <div className="flex flex-col items-start gap-3 w-5/6">
          <TopicPill>{ set.topic }</TopicPill>
          {/* middle line in header */}
          <div className="flex items-center justify-between w-full">
            <div className="text-4xl font-plain font-semibold">{ set.title }</div>
            <BookmarkIcon className="w-10 text-off-white-500" />
          </div>
          <div className="font-plain text-xs font-light">{ set.date }</div>
        </div>
        {/* body */}
        <div className="flex flex-col items-center gap-4 w-full overflow-hidden">
          {/* flashcard row */}
          <div className="flex items-center justify-between w-full">
            {/* previous flashcard button */}
            <button onClick={ () => addFlashcard(!currentFlashcardIndex ? set.numberOfFlashcards - 1 : currentFlashcardIndex - 1, "animate-slide-right", set) } className="z-10">
              <ArrowLeftCircleIcon className="w-10 text-educate-blue-700" />
            </button>
            {/* flashcard */}
            <div className="w-5/6 h-96 relative">              
              { addedFlashcards.map((flashcard, i) => (
                <div key={ i } className={ "absolute top-0 perspective h-full w-full duration-1000 " + flashcard.slide } onClick={ () => setIsFlipped(!isFlipped) }>
                  <div className={ "preserve-3d w-full h-full duration-1000 " + (isFlipped ? "v-rotate" : "") }>
                    <FlashcardFace content={ flashcard.term } yellow={ i % 2 === 1 } />
                    <FlashcardFace content={ flashcard.definition } backface={ true } yellow={ i % 2 === 1 } />
                  </div>
                </div> 
              ))}
            </div>
            {/* next flashcard button */}
            <button onClick={ () => addFlashcard((currentFlashcardIndex + 1) % set.numberOfFlashcards, "animate-slide-left", set) } className="z-10">
              <ArrowRightCircleIcon className="w-10 text-educate-blue-700"/>
            </button>
          </div>
          <div className="font-plain text-2xl">{ currentFlashcardIndex + 1 } / { set.numberOfFlashcards }</div>
          {/* author section */}
          <div className="border-y border-slate-400 p-2 w-5/6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <UserCircleIcon className="w-10 text-slate-400" />
              <div className="font-plain">{ set.author }</div>
            </div>
            <div className="text-sm font-plain">Published 4 flashcard sets</div>
          </div>
        </div>
        {/* related */}
        { relatedSets.length 
          ? <SetRow title="⏰ Related sets" sets={ relatedSets } className="w-5/6" /> 
          : <h3 className="text-lg font-plain font-medium text-red-600 italic">Sorry. We couldn't find any related sets.</h3>
        }
      </div>
    </div>
  );
}