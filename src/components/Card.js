import React from 'react';

export default function Card({ play }) {
  return (
    <div className="card cards__card">
      <div className="card__cover">
        <p className="card__cover-title no-margin">
          {play.title}
        </p>
        <ul className="card__menu list-style">
          <li className="card__menu-item">
            <button className="card__menu-btn btn btn_type_big btn_line-type_top">
              Смотреть читку
              <div className="arrow arrow_type_top-left" />
            </button>
          </li>
          <li className="card__menu-item">
            <button className="card__menu-btn btn btn_type_big btn_line-type_top">
              Скачать пьесу
              <div className="arrow arrow_type_bottom" />
            </button>
          </li>
        </ul>
      </div>
      <div className="card__info">
        <a href="https://" className="card__title main-link no-margin">
          {play.author_firstName + ' ' + play.author_lastName}
        </a>
        <p className="card__city no-margin">
          {play.city}
        </p>
        <p className="card__year no-margin">
          {play.year}
        </p>
      </div>
    </div>
  )
}
