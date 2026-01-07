import axios from 'axios';
import { useEffect, useState } from "react";


function CollectionList() {
  const [collections, setCollections] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/get_collections')
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
  
  return (
    <div>
        <h1>Collections</h1>
        {collections.map((collection, index) => (
            <div key={index}>
                <h2>Collection: {collection.collection}</h2>
                <ul>
                    {collection.documents.map((doc, docIndex) => (
                        <li key={docIndex}>
                          {doc.dateCreated}
                          </li>
                    ))}
                </ul>
            </div>
        ))}
    </div>
);
}

export default CollectionList;
