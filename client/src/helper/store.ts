export const store = {
  search: '',
  
  setSearch: async (search: string) => {
    store.search = search
    console.log('store.search: ', store.search)
  },

  getSearch: async () => {
    return store.search
  }

}