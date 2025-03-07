import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import type { Quote } from './types';

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const App = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [randomQuote, setRandomQuote] = useState<Quote>({
    quote: '',
    author: ''
  });

  const fetchRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  };

  useEffect(() => {
    const fetchQuotes = async () => {
      setIsLoading(true);

      try {
        const res: Response = await fetch(
          'https://api.breakingbadquotes.xyz/v1/quotes/100'
        );
        const data: Quote[] = await res.json();
        setQuotes(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          throw error;
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  useEffect(() => {
    if (quotes.length > 0) {
      fetchRandomQuote();
    }
  }, [quotes]);

  return (
    <div className='container mx-auto px-4'>
      <img
        id='logo'
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Breaking_Bad_logo.svg/2560px-Breaking_Bad_logo.svg.png'
      />
      <div id='quote-box'>
        {isLoading ? (
          <>
            <div className='skeleton h-6 mb-2'></div>
            <div className='skeleton h-6 mb-4'></div>
            <p className='skeleton ml-auto h-4 w-16'></p>
          </>
        ) : error ? (
          <p className='text-2xl text-center'>
            There was an error loading the quotes. Please try again.
          </p>
        ) : (
          <AnimatePresence key={randomQuote.quote}>
            <motion.div
              id='text'
              variants={fadeVariants}
              initial='hidden'
              animate='visible'
              exit='hidden'
              transition={{ duration: 2 }}
            >
              {randomQuote.quote}
            </motion.div>
            <motion.div
              id='author'
              variants={fadeVariants}
              initial='hidden'
              animate='visible'
              exit='hidden'
              transition={{ duration: 2 }}
            >
              - {randomQuote.author}
            </motion.div>
            <div className='flex justify-between items-center'>
              <a
                id='tweet-quote'
                href={`https://twitter.com/intent/tweet?hashtag=quotes&text=${randomQuote.quote}`}
                title='Tweet this quote!'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 512 512'
                  width={24}
                  height={24}
                  fill='#fff'
                >
                  <path d='M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z' />
                </svg>
              </a>
              <button id='new-quote' onClick={fetchRandomQuote}>
                New quote
              </button>
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default App;
