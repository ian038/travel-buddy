import React from 'react';
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'

const App: React.FC = () => {
  return (
    <>
      <Header />
      <div className='grid grid-cols-3 mx-4 my-8 text-xl container w-full'>
        <div className='xs:gap-12 md:gap-4'>
          <List />
        </div>
        <div className='xs:gap-12 md:gap-8'>
          <Map />
        </div>
      </div>
    </>
  );
}

export default App;
