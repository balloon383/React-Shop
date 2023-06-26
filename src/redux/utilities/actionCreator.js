const actionCreator = (type, payload) => {

    if (payload || typeof(payload) === 'number') {
      return { type, payload };
    } else {
      return { type };
      }
  };

  export default actionCreator
  