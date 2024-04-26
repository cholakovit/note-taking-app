import { createBrowserRouter } from "react-router-dom";
import CreateNote from "../components/CreateNote";
import UpdateNote from "../components/UpdateNode";
import NotFound from "../components/NotFound/NotFound";
import ListNotes from "../components/ListNotes";




export const router = createBrowserRouter([
  {
    path: '/',
    element: <ListNotes />,
    errorElement: <NotFound />
  },

  {
    path: '/create-note',
    element: <CreateNote />,
    errorElement: <NotFound />
  },

  {
    path: '/update-note/:id',
    element: <UpdateNote />,
    errorElement: <NotFound />
  },

])