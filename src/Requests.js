const key = process.env.REACT_APP_TMDB_API_KEY;

const requests = {
  theSeventhSeal: `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=Det+sjunde+inseglet`,
  lastYearAtMarienbad: `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=L'Année+dernière+à+Marienbad`,
  auHasardBalthazar: `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=au+hasard+balthazar`,

  andreiTarkovsky: `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=Tarkovsky`,
  fredericoFellini: `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=Fellini`,
  ingmarBergman: `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=Ingmar+Bergman`,
  michelangeloAntonioni: `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=Antonioni`,
  robertBresson: `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=Robert+Bresson`,
  alainResnais: `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=Resnais`,
};

export default requests;
