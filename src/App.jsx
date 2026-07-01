import { useState } from 'react'
import './App.css'



function App() {
  const [currentItem, setCurrentItem] = useState(null);
  const [banList, setBanList] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

async function getData() {
  if (loading) return;

  setLoading(true);

  try {
    const date = getRandomDate();

    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=&date=${date}`
    );

    const data = await response.json();

    setCurrentItem(data);

    setHistory(prev => [...prev, data]);

  } finally {
    setLoading(false);
  }
}

  function addBans(value) {
    if (banList.includes(value)) {
      return
    }
    setBanList([...banList,value]);
  }

  function removeBan(value) {
    setBanList(banList.filter(item => item !== value));
  }
  function getRandomDate() {
  const start = new Date(1995, 5, 16); // APOD start date
  const end = new Date();

  const randomTime =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());

  const date = new Date(randomTime);

  return date.toISOString().split("T")[0];
}

  return (
    <div className="layout">

      <div className="leftPanel">
        <h2>History</h2>

        {history.map((item, index) => (
          <p key={index}>
          {item.date}
          </p>
        ))}
      </div>

      <div className = "mainPanel">
        <h1 id="headerText"> NASA Discover APOD</h1>

        <button className="DiscoverButton" 
        onClick={getData} 
        disabled={loading === true}>
          Discover! ☄️
        </button>

        {currentItem && (
          <div>
            <h2>{currentItem.title}</h2>

            <img 
            src = {currentItem.url} 
            alt = {currentItem.title} 
            width = "400" 
            />

            <button onClick={() => addBans(currentItem.date)}>
              {currentItem.date}
            </button>
            <p>Why? {currentItem.explanation}</p>
          </div>
        )}
      </div>
      <div className="rightPanel">
        <h2> Ban List</h2>

          {banList.map((item) => (
          <button key={item} onClick={() => removeBan(item)}> 
            {item}
          </button>
          ))}
      </div>


  </div>


  )
}

export default App
