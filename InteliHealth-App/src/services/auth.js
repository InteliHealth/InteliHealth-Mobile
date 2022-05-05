import AsyncStorage from '@react-native-async-storage/async-storage'

export const getLogedUser = async () => {
  const jsonUser = await AsyncStorage.getItem("logedUser");
  return jsonUser != null ? JSON.parse(jsonUser) : null;
};

export const desestrutcureUser = async () => {
  const { nome, sobrenome, email, foto, idUsuario } = await getLogedUser();
  setNome(nome);
  setSobrenome(sobrenome);
  setEmail(email);
  setFoto(foto);
  setId(idUsuario);
};
