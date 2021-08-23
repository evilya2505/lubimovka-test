import React from 'react';
import Main from './Main';
import data from '../data.json';

function App() {
  const playsData = data.result;
  const authorsData = playsData
    // Возвращает массив только из авторов
    .map(obj => {
      return obj.author_lastName + ' ' + obj.author_firstName;
    })
    // Убирает одинаковых авторов
    .reduce((stack, item) => {

      (!stack.includes(item) && stack.push(item));

      return stack;
    }, [])
    // Сортирует в алфавитном порядке
    .sort()
    // Возвращает массив из объектов, содержащих информацию об авторе и его индекс
    .map((item, i) => {return {author: item, index: i}});

  // --- Стейт-переменные ---
  // Хранят данные подходящие под запрос пользователя
  const [matchedAuthors, setMatchedAuthors] = React.useState([]);
  const [matchedPlays, setMatchedPlays] = React.useState([]);

  // Хранит текущий запрос пользователя
  const [currentUserRequest, setCurrentUserRequest] = React.useState('');

  // Разбивает подходящих под запрос массив авторов на подмассивы
  function splitArrIntoBlocks(arrayOfAuthors) {
    // -- Переменные, которые потребуется при вызове метода reduce --
    // В массиве будут храниться авторы, чьи фамилии начинаются на одну и ту же букву
    let stack = [];
    // Хранит первую букву блока авторов
    let firstLetter = arrayOfAuthors[0]['author'][0];

    // Собирает авторов, чьи фамилии начинаются на одну и ту же букву в подмассивы
    return arrayOfAuthors.reduce((newArray, authorObj, i) => {
      if (firstLetter === authorObj.author[0]) {
        stack.push(authorObj);

        (i === arrayOfAuthors.length - 1) && newArray.push(stack);
      } else {
        newArray.push(stack);
        stack = [authorObj];

        (i === arrayOfAuthors.length - 1)
          ? newArray.push(stack)
          : firstLetter = authorObj.author[0];
      }

      return newArray
    }, []);
  }

  // Удаляет из строки все, кроме букв и цифр, заменяя на пробел -> убирает двойные пробелы -> заменяет ё на е -> обрезает пробелы из начала и конца строки
  function replacer(str) {
    return str
    .replace(/[^a-zа-яё0-9\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .replace(/ё/g,'е')
    .trim();
  }

  // Функция проверяет, содержит ли строка слова из запроса пользователя
  function isCointainValue(dataStr, inputValue) {
    inputValue = replacer(inputValue);
    dataStr = replacer(dataStr);

    if (inputValue !== '') {
      // Разбивает строку на массив строк
      let inputValueArr = inputValue.split(' ');
      let dataStrArr = dataStr.split(' ');

      // -- Переменная, которая понадобится при использовании метода reduce --
      // Количество совпадений
      let amountOfMatches = 0;

      //  Проходится по каждому слову в запросе пользователя, вернет значение false или true, зависимости от того, сколько совпадений найдется
      return inputValueArr.reduce((isMatch, inputWord) => {
        dataStrArr.forEach((strWord) => {
          // Если нашлось совпадение, то прибавляет к количеству совпадений 1
          if (strWord.toLowerCase().indexOf(inputWord.toLowerCase()) === 0) {
            amountOfMatches +=1;
            // Если количество совпадений, равняется или больше количеству слов в запросе пользователя, значит строка подходит под запрос
            (amountOfMatches >= inputValueArr.length) && (isMatch = true)
          }
        });
        return isMatch
      }, false);
    }
  }

  function hadleSearchButton(value) {
    // Обрезает пробелы из начала и конца строки
    value = value.trim();

    // Если инпут не пуст, то начинается поиск совпадений
    if (value !== '') {
      // Очистка от результатов прошлых поисков
      setMatchedAuthors([]);
      setMatchedPlays([]);

      setCurrentUserRequest(value);

      // Собирает всех авторов, подошедших под запрос пользователя в массив
      let matchedAuthorsTemp = [];

      // -- Проходится по массивам данных --
      playsData.forEach(play => {
        // Если строка подходит под запрос, то устанавливает значение стейт-переменной
        (isCointainValue(play.title, value)) && setMatchedPlays(prevArr => [...prevArr, play]);
      });

      authorsData.forEach(author => {
        // Если строка подходит под запрос, то добавляет автора в массив matchedAuthorsTemp
        (isCointainValue(author.author, value) && matchedAuthorsTemp.push(author));
      });

      // Если подошедших под запрос авторов больше одного, то вызывается функция, которая разобьет массив авторов на блоки
      if (matchedAuthorsTemp.length > 1) {
        setMatchedAuthors(splitArrIntoBlocks(matchedAuthorsTemp));
      } else {
        // Если подошел только один автор, то устанавливает значение стейт-переменной
        (matchedAuthorsTemp.length !== 0) && setMatchedAuthors([matchedAuthorsTemp]);
      }
    }
  }

  return (
    <div className="root">
      <Main
        currentUserRequest={currentUserRequest}
        data={data}
        onSearch={hadleSearchButton}
        matchedAuthors={matchedAuthors}
        matchedPlays={matchedPlays}
      />
    </div>
  );
}

export default App;
