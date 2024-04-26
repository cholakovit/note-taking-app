import { PaletteMode, colors, createTheme } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { deleteNote, postNote, updateNote } from "./fn";
import { useParams } from "react-router-dom";

export const useWeatherTheme = (mode: PaletteMode) => {
  // memoizing the result so it won't calculate every time
  const theme = useMemo(
    () =>
      createTheme({
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                margin: 0,
                mode,
                ...(mode === "light"
                  ? {
                      backgroundColor: colors.grey[100],
                      color: colors.grey[900],
                    }
                  : {
                      backgroundColor: colors.orange[900],
                      color: colors.grey[100],
                    }),
              },
            },
          },
        },
        palette: {
          primary: {
            main: mode === "light" ? colors.grey[600] : colors.orange[900],
            black: mode === "light" ? colors.grey[400] : colors.grey[900],
            white: mode === "light" ? colors.grey[800] : colors.grey[600],
            lighter: mode === "light" ? colors.grey[800] : colors.grey[400],
            iconColor: mode === "light" ? colors.grey[900] : colors.grey[100],
          },
          mode, 
        } as CustomPalette, 
      }),
    [mode]
  );

  return theme;
};

export const useGetNotes = () => {
  const { data: notes, error, isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: () => fetch(import.meta.env.VITE_NOTES_URL!).then(res => res.json()),
    refetchOnWindowFocus: false,
    retry: 5
  })
  return { notes, error, isLoading }
}

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}

export const useNoteForm = () => {
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [noteDescription, setNoteDescription] = useState<string>('');
  const [noteTags, setNoteTags] = useState<string>('');

  const mutation = useMutation({
    mutationFn: postNote,
    onSuccess: () => {
      // Handle success (could also reset form here)
      alert('Note created successfully!');
      setNoteTitle('');
      setNoteDescription('');
      setNoteTags('');
    },
    onError: (error: Error) => {
      console.error('Error creating note:', error.message);
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({
      title: noteTitle,
      description: noteDescription,
      tags: noteTags
    });
  };

  return {
    noteTitle,
    setNoteTitle,
    noteDescription,
    setNoteDescription,
    noteTags,
    setNoteTags,
    handleSubmit,
    mutation,
  };
};

export const useNoteFormUpdate = () => {
  const { id } = useParams<{ id: string }>();
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDescription, setNoteDescription] = useState('');
  const [noteTags, setNoteTags] = useState('');

  const mutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      alert('Note updated successfully!');
    },
    onError: (error: Error) => {
      console.error('Error updating note:', error.message);
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({
      _id: id,
      title: noteTitle,
      description: noteDescription,
      tags: noteTags
    });
  };

  return {
    noteTitle,
    setNoteTitle,
    noteDescription,
    setNoteDescription,
    noteTags,
    setNoteTags,
    handleSubmit,
    mutation
  };
};

