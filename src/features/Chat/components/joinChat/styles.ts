import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  buttonPropStyle: {
    borderRadius: 10,
    paddingVertical: 18,
  },
  container: {
    paddingHorizontal: 27,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 4,
    color: '#000',
    fontSize: 18,
    height: 60,
    lineHeight: 22,
    marginBottom: 26,
    paddingHorizontal: 16,
  },
  inputError: {
    backgroundColor: '#FFDEDE',
    borderBottomWidth: 2,
    borderColor: '#FF7070',
    color: '#FF7070',
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 29,
    paddingHorizontal: 50,
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 29,
    marginVertical: 44,
    textAlign: 'center',
  },
  error: {
    color: '#ff9b9b',
    fontSize: 16,
    marginBottom: 10,
    marginTop: -15,
  }
});
