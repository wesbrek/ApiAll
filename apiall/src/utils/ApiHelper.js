export const getBreakingBad = async() => {
      const api = await fetch('https://breaking-bad-quotes.herokuapp.com/v1/quotes');
      const quote = await api.json();
      return quote
  }

export const get = () => {
    fetch(
        `https://breaking-bad-quotes.herokuapp.com/v1/quotes`
      )
        .then((resp) => resp.json())
        .then((res) => {
          return res
        })
        .catch((ex) => {
          console.error(ex);
        });
}