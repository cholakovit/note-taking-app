import { PaletteMode, colors, createTheme } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { deleteNote, postNote, updateNote } from "./fn";
import { useParams } from "react-router-dom";
import { store } from "./store";

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

export const useGetNotes = (searchQuery = "") => {
  const queryKey = ['notes', { query: searchQuery }];
  const { data: notes, error, isLoading } = useQuery({
    queryKey,
    queryFn: () => {
      const url = searchQuery
        ? `${import.meta.env.VITE_NOTES_URL}/search?query=${encodeURIComponent(searchQuery)}`
        : import.meta.env.VITE_NOTES_URL;
      return fetch(url).then(res => res.json());
    },
    refetchOnWindowFocus: false,
    retry: 5,
  });

  return { notes, error, isLoading };
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  
  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = (noteId: string) => {
    deleteMutation.mutate(noteId);
  };

  return { handleDelete, deleteMutation };
}

export const useNoteForm = () => {
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [noteDescription, setNoteDescription] = useState<string>('');
  const [noteTags, setNoteTags] = useState<string>('');
  const [titleError, setTitleError] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const [tagError, setTagError] = useState<boolean>(false);

  const validateTitle = () => {
    if (noteTitle.trim() === '') {
      setTitleError(true);
      return false;
    }
    setTitleError(false);
    return true;
  };

  const validateDescription = () => {
    if (noteDescription.trim() === '') {
      setDescriptionError(true);
      return false;
    }
    setDescriptionError(false);
    return true;
  };

  const validateTags = () => {
    if (noteTags.trim() === '') {
      setTagError(true);
      return false;
    }
    setTagError(false);
    return true;
  };

  const mutation = useMutation({
    mutationFn: postNote,
    onSuccess: () => {
      alert('Note created successfully!');
      setNoteTitle('');
      setNoteDescription('');
      setNoteTags('');
    },
    onError: (error: Error) => {
      console.error('Error creating note:', error.message);
    }
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateTitle() && !validateDescription() && !validateTags()) return;
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
    titleError,
    descriptionError,
    tagError,
  };
};

export const useNoteFormUpdate = () => {
  const { id } = useParams<{ id: string }>();
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [noteDescription, setNoteDescription] = useState<string>('');
  const [noteTags, setNoteTags] = useState<string>('');

  const mutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      alert('Note updated successfully!');
    },
    onError: (error: Error) => {
      console.error('Error updating note:', error.message);
    }
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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

export function useSearchFilter() {
  const [search, setSearch] = useState<string>('');
  const queryClient = useQueryClient();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    store.setSearch(search);
    queryClient.invalidateQueries({ queryKey: ['search'] });
  };

  const handleClear = () => {
    setSearch(''); 
    store.setSearch(''); 
    queryClient.invalidateQueries({ queryKey: ['search'] });
  };

  return { search, setSearch, handleSubmit, handleClear };
}

export const useAlertWithTimeout = ({ initialAlert, timeout }: AlertWithTimeoutHookProps): string | null => {
  const [alert, setAlert] = useState<string | null>(initialAlert);

  useEffect(() => {
    setAlert(initialAlert);

    // Clear the alert after the specified timeout
    const timer = setTimeout(() => {
      setAlert(null);
    }, timeout);

    // Clean up the timeout when the component unmounts or when the alert changes
    return () => clearTimeout(timer);
  }, [initialAlert, timeout]);

  return alert;
};

