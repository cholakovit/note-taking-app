import { MutationFunction } from "@tanstack/react-query";


export const deleteNote = async (noteId: string): Promise<void> => {
  const response = await fetch(`${import.meta.env.VITE_NOTES_URL}/${noteId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete note');
  }
}

export const postNote: MutationFunction<Note, Note> = async (noteData) => {
  const response = await fetch(import.meta.env.VITE_NOTES_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(noteData),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const updateNote = async (noteData: Note): Promise<void> => {
  const { _id, ...data } = noteData;
  const response = await fetch(`http://localhost:3001/notes/${_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update note');
  }
  return response.json();
};

