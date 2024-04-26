import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { FormEvent, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { store } from '../../helper/store';

const Filters = () => {
  const [search, setSearch] = useState<string>('')
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['search', search],
    mutationFn: (search: string) => store.setSearch(search),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['search'] });
    }
  });

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(search);
    console.log('Filters search: ', search)
  };

  return (
    <div>
      <Paper
        component="form" onSubmit={handleSearch}
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, margin: '10px 0' }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Note Tags"
          inputProps={{ 'aria-label': 'search google maps' }}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  )
}

export default Filters