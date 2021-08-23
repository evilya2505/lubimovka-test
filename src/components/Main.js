import React from 'react';
import SearchInput from './SearchInput';
import Card from './Card';
import Authors from './Authors';

export default function Main({ onSearch, matchedAuthors, matchedPlays, isPressed, currentUserRequest }) {
  // Стейт-переменная, хранящая информацию о том, было ли найдено что-то по запросу
  const [isFound, setIsFound] = React.useState(false);

  React.useEffect(() => {
    // В зависимости от того, пустые ли массивы с результатами поиска, устанавливает значение стейт-переменной isFound
    (matchedAuthors.length > 0 || matchedPlays.length > 0)
      ? setIsFound(true)
      : setIsFound(false);
  }, [matchedAuthors, matchedPlays, currentUserRequest])

  return (
    <main className="content">

      <section className="search-section">
        <SearchInput
          onSearch={onSearch}
          currentUserRequest={currentUserRequest}
          isPressed={isPressed}
          isFound={isFound}
        />
      </section>

      <section className="search-results content__search-results">
        <div className="cards search-results__cards">
          {matchedPlays.length > 0 && matchedPlays.map(play => {
            return (
              <Card
                play={play}
                key={play._id}
              />
            )
          })}
        </div>

        <div className="authors">
          {matchedAuthors.length > 0 && matchedAuthors.map((blockOfAuthors) => {
            return (
              <Authors
                letter={blockOfAuthors[0]['author'][0]}
                authors={blockOfAuthors}
                key={blockOfAuthors[0]['author'].charCodeAt(0)}
              />
            )
          })}
        </div>
      </section>
    </main>
  )
}
