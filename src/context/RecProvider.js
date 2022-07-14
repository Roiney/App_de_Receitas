import React from 'react';
import PropTypes from 'prop-types';
import contexto from './index';
// import data from '../serviceApi';

// const { mealDb, cockTailDb } = data;

export default function RecProvider({ children }) {
  // const [login, setLogin] = useState('');
  // const [theMealDB, setTheMealDB] = useState('');
  // const [cockTailDB, setCockTailDB] = useState('');

  // useEffect(() => {
  //   const call = async () => {

  //   };
  //   return call;
  // },[]);

  const context = 'test';
  return (
    <contexto.Provider value={ { context } }>
      {children}
    </contexto.Provider>
  );
}

RecProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
