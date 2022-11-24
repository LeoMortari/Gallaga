export const AddLogin = (idHotel, idUsuario) => {
  return {
    type: "LOGIN",
    payload: { idHotel, idUsuario },
  };
};
