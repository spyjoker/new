import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

function Journal() {
  const [entries, setEntries] = useState([]);
  const [newEntryText, setNewEntryText] = useState('');
  const [selectedMood, setSelectedMood] = useState('happy'); // Default mood

  useEffect(() => {
    fetchJournalEntries();
  }, []);

  const fetchJournalEntries = async () => {
    try {
      const response = await axios.get(`${config.backendUrl}/api/journal/`);
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching journal entries:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.backendUrl}/api/journal/`, {
        text: newEntryText,
        mood: selectedMood,
      });
      setEntries([...entries, response.data]);
      setNewEntryText('');
    } catch (error) {
      console.error('Error submitting journal entry:', error);
    }
  };

  return (
    <div>
      <h2>Journal</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your journal entry here..."
          value={newEntryText}
          onChange={(e) => setNewEntryText(e.target.value)}
          rows="5"
          cols="50"
        ></textarea>
        <br />
        <label>
          Mood:
          <select value={selectedMood} onChange={(e) => setSelectedMood(e.target.value)}>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="neutral">Neutral</option>
            <option value="anxious">Anxious</option>
            <option value="stressed">Stressed</option>
          </select>
        </label>
        <br />
        <button type="submit">Add Entry</button>
      </form>

      <h3>Past Entries</h3>
      {entries.length === 0 ? (
        <p>No journal entries yet.</p>
      ) : (
        <ul>
          {entries.map((entry) => (
            <li key={entry.id}>
              <p><strong>Mood:</strong> {entry.mood}</p>
              <p>{entry.text}</p>
              <p><small>{new Date(entry.timestamp).toLocaleString()}</small></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Journal;
