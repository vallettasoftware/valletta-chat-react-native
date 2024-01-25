import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    backgroundColor: '#4993e4',
    borderRadius: 15,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  container: {
    width: '100%',
  },
  emailContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 30,
  },
  emailFieldContainer: {
    flex: 1,
  },
  emailTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  error: {
    alignSelf: 'flex-start',
    color: '#FF9B9B',
  },
  input: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    color: '#000',
    flex: 1,
    fontSize: 18,
    justifyContent: 'center',
    lineHeight: 22,
    paddingLeft: 16,
    paddingRight: 5,
    paddingVertical: 13,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: 'row',
    width: '100%',
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
  tagsList: {
    marginTop: 10,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});
