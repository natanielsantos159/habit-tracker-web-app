import React from 'react';
import deleteIcon from '../assets/delete.png';
import DayState from '../components/DayState';

function Home() {
  const habits = { 
    "Drink water": {
      "2023-10-01": true,
      "2023-10-02": true,
      "2023-10-03": true,
      "2023-10-04": false,
      "2023-10-05": true,
    },
    "Drink water5": {
      "2023-10-01": true,
      "2023-10-02": true,
      "2023-10-03": true,
      "2023-10-04": false,
      "2023-10-05": true,
    },
    "Drink water4": {
      "2023-10-01": true,
      "2023-10-02": true,
      "2023-10-03": true,
      "2023-10-04": false,
      "2023-10-05": true,
    },
    "Drink water1": {
      "2023-10-01": true,
      "2023-10-02": true,
      "2023-10-03": true,
      "2023-10-04": false,
      "2023-10-05": true,
    },
    "Drink waterw": {
      "2023-10-01": true,
      "2023-10-02": true,
      "2023-10-03": true,
      "2023-10-04": false,
      "2023-10-05": true,
    }
  };
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <main className="container relative flex flex-col gap-8 px-4 pt-16">
      {habits === null ||
        (Object.keys(habits).length === 0 && (
          <h1 className="mt-20 text-4xl font-light text-[--tg-theme-hint-color] font-display text-center">No habits yet.</h1>
        ))
      }
      {habits !== null &&
        Object.entries(habits).map(([habit, habitStreak]) => (
          <div key={habit}>
            <div className='flex justify-between items-center'>
              <span className="text-xl font-light text-[--tg-theme-text-color]">
                {habit}
              </span>
              <button><img src={deleteIcon} alt="Trash icon" height={20} width={20} /></button>
            </div>

            <section className='grid grid-cols-7 bg-[--tg-theme-secondary-bg-color] rounded-md p-2'>
              {weekDays.map((day) => (
                <div key={day} className="flex flex-col">
                  <span className="font-sans text-xs text-[--tg-theme-text-color] text-center">
                    {day}
                  </span>
                  <DayState isDone={true} />
                </div>
              ))} 
            </section>
          </div>
        ))
      }
    </main>
  );
}

export default Home;