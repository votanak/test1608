import { useState } from 'react';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';
registerLocale('ru', ru);
import styled from 'styled-components';
import { useEffect } from 'react';

const AppStyle = styled.div``;

function App() {
  const [addData, setAddData] = useState({
    environmenttype: '',
    serial: '',
    notes: '',
  });
  useEffect(() => {
    setEnvTypes([
      'environmenttype1',
      'environmenttype2',
      'environmenttype3',
      'environmenttype4',
      'environmenttype5',
    ]);
  }, []);

  const [envTypes, setEnvTypes] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [isChosen, setIsChosen] = useState(false);
  const [chosenPosition, setChosenPosition] = useState(false);
  const [searchedString, setSearchedString] = useState('');
  const [chosenIndex, setChosenIndex] = useState(0);
  const [searchedData, setSearchedData] = useState([]);

  const addPosition = (e) => {
    e.preventDefault();
    console.log(addData);
    const request = async (url, method, params) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_SERVER_URL}${url}`,
          {
            method,
            headers: {
              'Content-Type': 'application/json',
            },
            ...(method === 'POST' ? params : {}),
          },
        );
        return response.json();
      } catch (e) {
        console.log(e);
        return e;
      }
    };
    request('/req', 'POST', {
      body: JSON.stringify({
        environmenttype: addData.environmenttype,
        serial: addData.serial,
        notes: addData.notes,
      }),
    }).then((data) => alert(data));
    setFormData({
      environmenttype: '',
      serial: '',
      notes: '',
    });
  };

  const sendEditForm = () => {};

  const choseHandler = (e) => {
    setChosenIndex(e.target.value);
    setChosenPosition(searchedData[e.target.value]);
  };

  const deleteHandler = (e) => {
    e.preventDefault();
  };

  const saveHandler = (e) => {
    e.preventDefault();
  };

  const searchHandler = (e) => {
    e.preventDefault();
    setSearchedData([
      {
        environmenttype: 'environmenttype1',
        serial: 'serial1',
        notes: 'notes1',
      },
      {
        environmenttype: 'environmenttype2',
        serial: 'serial2',
        notes: 'notes2',
      },
      {
        environmenttype: 'environmenttype3',
        serial: 'serial3',
        notes: 'notes3',
      },
    ]);
  };

  console.log(isChosen);

  return (
    <AppStyle>
      <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Добавление оборудования
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full ">
          <form className="space-y-6" onSubmit={addPosition}>
            <div>
              <label
                htmlFor="add-environmenttype"
                className="block text-sm font-medium leading-6 text-gray-900 mx-auto sm:max-w-sm">
                Тип оборудования
              </label>
              <div className="mt-2 ">
                <select
                  name="add-environmenttype"
                  id="add-environmenttype"
                  required
                  className="bg-gray-50 mx-auto sm:max-w-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={addData.environmenttype}
                  onChange={(e) =>
                    setAddData({ ...addData, environmenttype: e.target.value })
                  }>
                  <option value="">-- Выберите тип --</option>
                  {envTypes.map((el, ind) => (
                    <option value={el} key={ind}>
                      {el}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="">
              <label
                htmlFor="add-serial"
                className="block text-sm font-medium leading-6 text-gray-900 mx-auto sm:max-w-sm">
                Серийный номер
              </label>
              <div className="mt-2">
                <textarea
                  name="add-serial"
                  id="add-serial"
                  placeholder="серийный номер"
                  required
                  className="bg-gray-50 mx-auto sm:max-w-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={addData.serial}
                  onChange={(e) =>
                    setAddData({ ...addData, serial: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="mx-auto sm:max-w-sm">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="add-notes"
                  className="block text-sm font-medium leading-6 text-gray-900 ">
                  Примечание
                </label>
              </div>
              <div className="mt-2">
                <textarea
                  id="add-notes"
                  name="add-notes"
                  required
                  placeholder="примечания"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setAddData({
                      ...addData,
                      notes: e.target.value,
                    });
                  }}
                  value={addData.notes}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:max-w-sm">
                Добавить
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* -----------------------------------------------Поиск, просмотр, изменение------------------------------------------------------------------------------ */}
      <div className="flex min-h-full flex-col justify-center px-6 my-10 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mb-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Поиск, просмотр, изменение
          </h2>
        </div>
        <form action="">
          <div id="search" className="flex justify-center mb-2 ">
            <input
              name="search"
              id="search"
              placeholder="поиск"
              list="searchrez"
              required
              className=" bg-gray-50 mr-2 sm:max-w-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={searchedString}
              onChange={(e) => setSearchedString(e.target.value)}
            />
            <button
              type="submit"
              onClick={searchHandler}
              className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:max-w-sm">
              поиск
            </button>
          </div>
        </form>
        <select
          id="searchrez"
          className={`bg-white ${
            !searchedData.length && 'hidden'
          } justify-center w-30`}
          value={chosenIndex}
          size={searchedData.length}
          onChange={choseHandler}>
          {searchedData.map((el, ind) => (
            <option
              key={ind}
              value={ind}>{`${el.environmenttype}, сер.№ ${el.serial}`}</option>
          ))}
        </select>

        <div className="mt-10 sm:mx-auto sm:w-full ">
          <form className="space-y-6" onSubmit={saveHandler}>
            <div>
              <label
                htmlFor="environmenttype"
                className="block text-sm font-medium leading-6 text-gray-900 mx-auto sm:max-w-sm">
                Тип оборудования
              </label>
              <div className="mt-2 ">
                <select
                  name="environmenttype"
                  id="environmenttype"
                  required
                  disabled={!editMode}
                  className="bg-gray-50 mx-auto sm:max-w-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={chosenPosition.environmenttype}
                  onChange={(e) =>
                    setChosenPosition({
                      ...searchedData,
                      environmenttype: e.target.value,
                    })
                  }>
                  <option value="">-- Выберите тип --</option>
                  {envTypes.map((el, ind) => (
                    <option value={el} key={ind}>
                      {el}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="">
              <label
                htmlFor="market"
                className="block text-sm font-medium leading-6 text-gray-900 mx-auto sm:max-w-sm">
                Серийный номер
              </label>
              <div className="mt-2">
                <textarea
                  name="market"
                  id="market"
                  placeholder="серийные номера"
                  required
                  disabled={!editMode}
                  className="bg-gray-50 mx-auto sm:max-w-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={chosenPosition.serial}
                  onChange={(e) =>
                    setChosenPosition({
                      ...searchedData,
                      market: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="mx-auto sm:max-w-sm">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium leading-6 text-gray-900 ">
                  Примечание
                </label>
              </div>
              <div className="mt-2">
                <textarea
                  id="notes"
                  name="notes"
                  disabled={!editMode}
                  required
                  placeholder="примечания"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setChosenPosition({
                      ...chosenPosition,
                      notes: e.target.value,
                    });
                  }}
                  value={chosenPosition.notes}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                disabled={!isChosen}
                onClick={deleteHandler}
                className="flex justify-center rounded-md bg-indigo-600 mx-2 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:max-w-sm">
                Удалить
              </button>
              <button
                disabled={!editMode}
                onClick={saveHandler}
                className={`justify-center ${
                  !editMode ? 'hidden' : 'flex'
                } rounded-md bg-indigo-600 mx-2 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:max-w-sm`}>
                Сохранить
              </button>
              <button
                disabled={!isChosen}
                onClick={() => setEditMode(true)}
                className={`justify-center ${
                  editMode ? 'hidden' : 'flex'
                } rounded-md bg-indigo-600 mx-2 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:max-w-sm`}>
                редактировать
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppStyle>
  );
}

export default App;
