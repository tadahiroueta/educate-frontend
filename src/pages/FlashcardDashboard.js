import { useEffect, useState } from "react";
import axios from 'axios'
import search from "overlap-search";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";


import { Button, SetRow, SetRowForSearch } from "../components";



/** Where you may search and get recommended new flashcards from other users */
export default function FlashcardDashboard() {
  let [searchKey, setSearchKey] = useState("");
  let [searchTopic, setSearchTopic] = useState(undefined);
  let [searchRating, setSearchRating] = useState(undefined);
  let [searchResults, setSearchResults] = useState([]);
  // retrieving data from cloud
  const [collections, setCollections] = useState([]);
  const [error, setError] = useState(null);

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

  // search engine
  useEffect(() => {
    if ((!searchKey && !searchTopic && !searchRating) || !collections) {
      setSearchResults([]);
      return;
    }
    const onTopicFlashcards = collections.filter(set => !searchTopic || (set.documents[0].topic === searchTopic));
    const matchingFlashcards = onTopicFlashcards.filter(set => !searchRating || (set.documents[0].rating >= searchRating));
    const titles = matchingFlashcards.map(card => card.documents[0].title); // getting the titles
    const temp = matchingFlashcards.map(card => card); // getting the flashcardSets 
    setSearchResults(search(searchKey,titles, 0.7).map(index => temp[index]));
  }, [searchKey, searchTopic, searchRating]);


  useEffect(() => {
    axios.get('https://educate-backend-69dte.ondigitalocean.app/api/get_collections') // TODO dev only
      .then(response => {
        console.log('API Response:', response.data);
        setCollections(response.data);
      })
      .catch(err => {
        console.log('Error fetching data:', err);
        setError('An error occured while fetching data');
      });
  }, []);

  if (error){
    return <div>{error}</div>
  }

  // getting the flashCard sets' metadata
  const getSets = (start, end) => {
    if (!collections || collections.length === 0) {
      console.log('No collections available');
      return [];
    }

    // Slice the collections array from start to end
    const arr = collections.slice(start, end);

    // Loop through each collection to ensure it has documents
    let validCollections = [];

    arr.forEach((collection, index) => {
      if (collection.documents && collection.documents.length > 0) {
        validCollections.push(collection);
      } else {
        console.log(`No documents found in Collection ${index + 1}`);
      }
    });

    // If we found valid collections, return them
    if (validCollections.length > 0) {
      return validCollections;
    } else {
      console.log('No collections with valid documents found');
      return [];
    }
  };

  

  return (
    // outside container
    <div className="grow w-full flex justify-center bg-educate-blue-100 md:px-20 pt-10 pb-44">
      {/* inside container */}
      <div className="flex flex-col gap-12 w-full md:w-3/4 px-4 md:px-0">
        {/* search */}
        <div className="flex flex-col gap-6 w-full md:w-auto">
          <h1 className="text-2xl md font-plain font-medium">Hey. 👋 <br className="md:hidden" />What SAT topic would you like to study today?</h1>
          {/* horizontal */}
          <div className="flex items-center justify-center gap-2 md:gap-6 w-full md:w-auto">
            {/* search bar */}
            <div className="grow flex items-center border border-off-white-500 rounded-md pl-4 md:pl-6 md:px-6 py-3 md:py-4 bg-off-white-100">
              <MagnifyingGlassIcon className="w-6 h-6 text-educate-blue-700" />
              <input type="text" className="grow ml-3 md:ml-4 font-plain outline-none " placeholder="Search by title..." value={ searchKey } onChange={ e => setSearchKey(e.target.value) } />
            </div>
            {/* dropdown filter */}
            <div className="rounded-md text-xs md:text-sm border border-off-white-500 px-0 md:px-6 py-3 bg-off-white-100">
              <select value={ searchRating } onChange={e => setSearchRating(e.target.value === "undefined" ? undefined : parseInt(e.target.value))} className="md:pr-2 outline-none tracking-tighter">
                <option value="undefined" >Filter</option> {/* Set value to an empty string */}
                { new Array(5).fill(0).map((_, i) => <option key={ i } value={ 5 - i }>{ "⭐".repeat(5 - i) }</option>) }
              </select>
            </div>
          </div>
          {/* topics */}
          <div className="justify-center flex flex-items gap-4">
            { topics.map((topic, i) => <Button fill={ searchTopic === topic.title } key={ i } onClick={ () => setSearchTopic(searchTopic === topic.title ? undefined : topic.title) }>{ topic.icon } { topic.title }</Button>) }
          </div>
        </div>
        { searchResults && searchResults.length > 0
          ? (
            <div className="flex flex-col">
            <h3 className="text-lg font-plain font-medium">Search Results!</h3>
            {
              // Create an array of groups of 3 elements
              Array.from({ length: Math.ceil(searchResults.length / 3) }, (_, i) => 
                searchResults.slice(i * 3, i * 3 + 3) // Get a group of 3 elements
              ).map((group, index) => (
                // Render a SetRow for each group of 3 elements
                <SetRow key={index} title="" sets={group} />
              ))
            }
          </div>
          )
          : (
            <div className="flex flex-col gap-8">
              { searchKey || searchTopic ? <h3 className="text-lg font-plain font-medium text-red-600 italic">Sorry. We couldn't find any flashcards from your search.</h3> : null }
              <SetRow title="⏰ Check out what your peers are studying" sets={getSets(0, 3)} />
              <SetRow title="🔥 Trending flashcard sets" sets={getSets(3,6)} />
              <SetRow title="🆕 This just in!" sets={getSets(6,9)} />
            </div>
          )
        }
      </div>
    </div>
    
  );
}