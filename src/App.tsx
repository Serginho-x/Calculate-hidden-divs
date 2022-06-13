import React, { useLayoutEffect, useState, useRef } from 'react';
import './App.css';

const App: React.FC = () => {
  const authorsRef = useRef<HTMLDivElement>(null);

  const authors = [
    'Liam	Olivia',
    'Noah	Emma',
    'Oliver	Charlotte',
    'Elijah	Amelia',
    'James Ava',
    'William Sophia',
    'Benjamin	Isabella',
    'Lucas Mia',
    'Henry Evelyn',
    'Theodore	Harper',
    'Oliver	Charlotte',
    'Elijah	Amelia',
    'James Ava',
  ];

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

  // detect resize screen
  useWindowSize();

  const renderAuthorsShadow = () => {
    if (authors.length <= 2) {
      return authors.join(', ');
    } else {
      return authors.map((item: any, index: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <span key={item + index}>{item},&nbsp;</span>
      ));
    }
  };

  const renderAuthors = () => {
    if (authorsRef.current?.children && authorsRef.current?.children.length > 2) {
      const children = authorsRef.current?.children as any;
      const firstChild = children[0] as HTMLElement;
      const lastChild = children[children.length - 1] as HTMLElement;
      let freeSpace =
        authorsRef.current.offsetWidth - firstChild.offsetWidth - lastChild.offsetWidth - 180; // space without 1st child, last child, space for counter and icon
      const array = [];
      let counter = children.length - 2;
      console.log(counter);
      for (let index = 1; index < children.length - 1; index += 1) {
        const element = children[index] as HTMLElement;
        const elementWidth = element.offsetWidth;
        if (freeSpace - elementWidth >= 0) {
          freeSpace -= elementWidth;
          counter -= 1;
          array.push(children[index].textContent);
        }
      }
      return (
        <>
          +{children[0].textContent && <span>{children[0].textContent}&nbsp;</span>}
          {array.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <span key={item + index}>{item}&nbsp;</span>
          ))}
          {!!counter && <span>{`... (${counter} more) ... `}&nbsp;</span>}
          <span>{children[children.length - 1].textContent.replace(/,/g, '')}</span>
        </>
      );
    }
    return authors[0] && <>+ {authors.join(', ')}</>;
  };

  return (
    <div className='authors-wrapper'>
      <div className='authors-shadow' ref={authorsRef}>
        {renderAuthorsShadow()}
      </div>
      <div className='authors'>{renderAuthors()}</div>
    </div>
  );
};

export default App;
