import React, { useEffect, useState } from 'react';
import './App.css';
import colors from './colorsArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

//fa-quote-left

function App() {
  const quoteURL =
    'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

  const [quote, setQuote] = useState(
    'Life isn’t about getting and having, it’s about giving and being.'
  );

  const [author, setAuthor] = useState('Kevin Kruse');

  const [quotesArray, setQuotesArray] = useState([]);

  const [selectedColor, setSelectedColor] = useState('#282c34');

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJson = await response.json();
    setQuotesArray(parsedJson.quotes);
    console.log(parsedJson);
  };

  useEffect(() => {
    fetchQuotes(quoteURL);
  }, [quoteURL]);

  const getRandomQuote = () => {
    let randomInt = Math.floor(quotesArray.length * Math.random());
    let randomColor = Math.floor(colors.length * Math.random());
    setSelectedColor(colors[randomColor]);
    setQuote(quotesArray[randomInt].quote);
    setAuthor(quotesArray[randomInt].author);
  };

  return (
    <div className='App'>
      <main style={{ backgroundColor: selectedColor, color: selectedColor }}>
        <div id='quote-box'>
          <p id='text'>
            <FontAwesomeIcon icon={faQuoteLeft} />
            {quote}
          </p>
          <p id='author'>- {author}</p>
          <div className='buttons'>
            <a
              id='tweet-quote'
              href={encodeURI(
                `http://www.twitter.com/intent/tweet?text=${quote}
  - ${author}`
              )}
              style={{ backgroundColor: selectedColor }}
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>{' '}
            <button
              id='new-quote'
              onClick={getRandomQuote}
              style={{ backgroundColor: selectedColor }}
            >
              New quote
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
