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
    setSearchResults(search(searchKey,titles).map(index => temp[index]));
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
    <div className="grow w-full flex justify-center bg-educate-blue-100 px-20 pt-10 pb-44">
      {/* inside container */}
      <div className="flex flex-col gap-12 w-3/4">
        {/* search */}
        <div className="flex flex-col gap-6">
          <div className="text-3xl font-plain font-medium">Hey. 👋 What SAT topic would you like to study today?</div>
          {/* horizontal */}
          <div className="flex items-center gap-6">
            {/* search bar */}
            <div className="grow flex items-center border border-off-white-500 rounded-md px-6 py-4 bg-off-white-100">
              <MagnifyingGlassIcon className="w-6 h-6 text-educate-blue-700" />
              <input type="text" className="grow ml-4 font-plain outline-none " placeholder="Search topic..." value={ searchKey } onChange={ e => setSearchKey(e.target.value) } />
            </div>
            {/* dropdown filter */}
            <div className="rounded-md border border-off-white-500 px-6 py-3 bg-off-white-100">
              <select value={ searchRating }    onChange={e => setSearchRating(e.target.value === "undefined" ? undefined : parseInt(e.target.value))}className="pr-2 outline-none">
                <option value="undefined" >Filter by...</option> {/* Set value to an empty string */}
                { new Array(5).fill(0).map((_, i) => <option key={ i } value={ 5 - i }>{ "⭐".repeat(5 - i) }</option>) }
              </select>
            </div>
          </div>
          {/* topics */}
          <div className="justify-center flex flex-items gap-4">
            { topics.map((topic, i) => <Button fill={ searchTopic === topic.title } key={ i } onClick={ () => setSearchTopic(searchTopic === topic.title ? undefined : topic.title) }>{ topic.icon } { topic.title }</Button>) }
          </div>
        </div>
      </div>
    </div>
  );
}