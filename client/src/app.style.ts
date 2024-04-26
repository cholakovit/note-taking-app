import { styled } from "@mui/system";

export const FormHolder = styled('form')(({ theme }) => ({
  backgroundColor: theme.palette.primary.black,
  width: '400px',
  padding: '15px',
  borderRadius: '5px',

  '& > :not(style)': { 
    margin: theme.spacing(1)
  },
}));