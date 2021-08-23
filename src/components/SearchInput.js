import React from 'react';

export default function SearchInput({ onSearch, isFound, currentUserRequest }) {
  // --- Стейт-переменные ---
  // Хранит значение value у поля формы
  const [request, setRequest] = React.useState('');
  // Хранит текст заголовка
  const [title, setTitle] = React.useState('');
  // Хранит информацию о том, нажата ли кнопка "Искать"
  const [isPressed, setIsPressed] = React.useState(false);

  React.useEffect(() => {
    if (isPressed && currentUserRequest !== '') {
      // В зависмости от того, было ли что-либо найдено по запросу пользователя, устанавливает значение стейт-переменной, отвечающей за заголовок
      (isFound)
        ? setTitle(`По запросу «${currentUserRequest}» мы нашли`)
        : setTitle(`По запросу «${currentUserRequest}» мы ничего не нашли`);
    } else {
      setTitle('Поиск');
    }
  }, [currentUserRequest, isFound, isPressed]);

  // Обработчик кнопки поиска
  function handleSubmit(e) {
    e.preventDefault();

    setIsPressed(true);
    onSearch(request);
  }

  // Обработчик изменения input
  function handleOnChange(e) {
    setRequest(e.target.value);
  }

  return (
    <form
      className="form form_type_search"
      onSubmit={handleSubmit}
    >
      <h1 className="form__title no-margin">
        {title}
      </h1>
      <fieldset
        className="form__fieldset form__fieldset_type_search">
        <input
          type="text"
          placeholder="Введите автора или название пьесы"
          className="form__item form__item_type_search"
          name="search"
          value={request}
          onChange={handleOnChange}
        />
        <button
          type="submit"
          className="form__save-btn form__save-btn_type_search btn btn_type_small btn_line-type_left-bottom"
        >
          <div className="arrow" />
          Искать
        </button>
      </fieldset>
    </form>
  )
}
