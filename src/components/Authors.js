import React from 'react';

export default function Authors ({ letter, authors }) {
  return (
    <div className="authors-block authors__authors-block">
      <h2 className="authors-block__letter no-margin">
        {letter}
      </h2>
      <ul className="authors-block__list list-style">
        {authors.map((author) => {
          return (
            <li
              key={author.index}
              className="authors-block__author no-margin">
              <a href="https://" className="authors-block__author-link main-link">
                {author.author}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
