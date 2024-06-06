import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Background from './components/Background';
import Title from './components/Title';
import Page from './components/Page';
import LoadFile from './components/LoadFile';
import Results from './components/Results';

function App() {
  const pagesRef = useRef<Array<HTMLDivElement | null>>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault(); // Prevent default smooth scrolling behavior

      if (e.deltaY > 0 && currentPageIndex < pagesRef.current.length - 1) {
        setCurrentPageIndex((prevIndex) => prevIndex + 1);
      } else if (e.deltaY < 0 && currentPageIndex > 0) {
        setCurrentPageIndex((prevIndex) => prevIndex - 1);
      }

      scrollToCurrentPage();
    };

    window.addEventListener('wheel', handleScroll, {passive: false});

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [currentPageIndex]);

  const scrollToCurrentPage = () => {
    const currentPage = pagesRef.current[currentPageIndex];
    currentPage?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    document.title = "Classification of document paragraphs";
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = ''; // Set href to an empty string
    document.head.appendChild(link);
    
    return () => {
      // Clean up: remove the dynamically added link element
      document.head.removeChild(link);
    };
  }, []);
  
  return (
    <div>
      <Background/>
      <Page ref={(el: HTMLDivElement | null) => (pagesRef.current[0] = el)}>
        <Title/> 
      </Page>
      <Page ref={(el: HTMLDivElement | null) => (pagesRef.current[1] = el)}>
        <LoadFile/>
      </Page>
    </div>
  );
}

export default App;
