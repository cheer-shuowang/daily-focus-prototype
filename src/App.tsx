import { useState } from 'react';

type Category = 'teaching' | 'design' | 'admin';

type Priority = {
  id: number;
  title: string;
  category: Category;
  categoryLabel: string;
  initiallyDone: boolean;
};

const priorities: Priority[] = [
  { id: 1, title: 'Prepare class slides', category: 'teaching', categoryLabel: 'Teaching', initiallyDone: false },
  { id: 2, title: 'Review Figma design', category: 'design', categoryLabel: 'Design', initiallyDone: true },
  { id: 3, title: 'Send workshop reminder', category: 'admin', categoryLabel: 'Admin', initiallyDone: true },
  { id: 4, title: 'Plan the next lesson', category: 'teaching', categoryLabel: 'Teaching', initiallyDone: false },
];

const initialDone = priorities.map((priority) => priority.initiallyDone);

function App() {
  const [done, setDone] = useState<boolean[]>(initialDone);
  const completedCount = done.filter(Boolean).length;
  const hasChanged = done.some((value, index) => value !== initialDone[index]);

  function togglePriority(index: number) {
    setDone((current) => current.map((value, currentIndex) => currentIndex === index ? !value : value));
  }

  return (
    <main className="app-shell">
      <header className="page-header">
        <span className="state-label">{hasChanged ? 'STATE B • after tapping a task' : 'STATE A • starting screen'}</span>
        <h1>Good morning, Bhavina</h1>
        <p className="date">Thursday, 8 October</p>
      </header>

      <section className="progress-card" aria-label="Today's progress">
        <div className="progress-copy">
          <span>Today’s progress</span>
          <strong>{completedCount} of {priorities.length}</strong>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-label="Today's progress"
          aria-valuemin={0}
          aria-valuemax={priorities.length}
          aria-valuenow={completedCount}
        >
          <div className="progress-fill" style={{ width: `${completedCount / priorities.length * 100}%` }} />
        </div>
      </section>

      <section className="priorities-section" aria-labelledby="priorities-heading">
        <h2 id="priorities-heading">Your priorities</h2>
        <div className="priority-list">
          {priorities.map((priority, index) => (
            <button
              className={`priority-card ${done[index] ? 'is-done' : ''}`}
              key={priority.id}
              type="button"
              role="checkbox"
              aria-checked={done[index]}
              aria-label={priority.title}
              onClick={() => togglePriority(index)}
            >
              <span className="task-check" aria-hidden="true">
                {done[index] && <svg viewBox="0 0 20 20" fill="none"><path d="m5.4 10.2 3.2 3.2 6-6.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </span>
              <span className="task-body">
                <span className="task-title">{priority.title}</span>
                <span className={`category-tag ${priority.category}`}>{priority.categoryLabel}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <button className="reset-button" type="button" onClick={() => setDone([...initialDone])}>Reset demo</button>
    </main>
  );
}

export default App;
