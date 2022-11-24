const INITIAL_STATE = { idUsuario: null, idHotel: null };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
