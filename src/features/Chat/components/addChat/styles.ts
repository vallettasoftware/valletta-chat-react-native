import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  error: {
    alignSelf: 'flex-start',
    color: '#FF9B9B',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 4,
    color: '#000',
    fontSize: 18,
    height: 60,
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  inputError: {
    backgroundColor: '#FFDEDE',
    borderBottomWidth: 2,
    borderColor: '#FF7070',
    color: '#FF7070',
  },
  loadingInput: {
    backgroundColor: '#9099A1',
    color: '#223343',
  },
  modal: {
    alignSelf: 'stretch',
    backgroundColor: '#223343',
    borderRadius: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 29,
    marginVertical: 44,
    textAlign: 'center',
  },
  wrapper: { marginTop: 22, paddingHorizontal: 27 },
});
