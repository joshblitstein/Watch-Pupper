import {React, useEffect, useState} from 'react'
import './App.css'

export default function Watches() {


const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://us-central1-chronos-data.cloudfunctions.net/getWatches")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          console.log(result)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
      console.log(items)
    return (

       
       <ul className='list'>
        {items.map(item => (
          <li className='listEls' key={item.imgUrl}>
              <a href={item.url} target='_blank'>
            <img src={(item.imgUrl == "null") ?  item.imgUrlBackUp : item.imgUrl }/>
            {console.log(item.imgUrl ? item.imgUrl : item.imgUrlBackUp )}
            </a>
            <h2>{item.title}</h2>
          </li>
        ))}
      </ul> 
      
    );
  }
}
