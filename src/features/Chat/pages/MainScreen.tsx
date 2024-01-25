import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../store';
import { toggleUnread } from '../../../store/conference/messages';
import { setChats, setMenuComponent } from '../../../store/Main';
import { ChatService } from '../services/chatService';
import ChatsList from '../components/chatsList/ChatsList';
import JoinChat from '../components/joinChat';
import AddChat from '../components/addChat';
import Header from '../components/header';
import { SharpDevBackground } from '../../../components/imageBackround';
import SharpTalksModal from '../components/modalOption';
import { checkAuth, NavProps } from '../../../common/checkAuthHoc';
import { ErrorHandler } from '../../../common/ErrorHandler';
import { useUser } from '../../../common/useUser';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
});

const MainScreen: React.FC<NavProps> = ({ navigation, route }: NavProps) => {
  const dispatch = useDispatch();
  const { conferences, listNeedUpdate } = useSelector((state: RootState) => state.main);
  const { user, callWithRefresh } = useUser();
  const { email } = user;

  const params = route?.params?.params?.params?.params;
  const uniqueName: number = (params?.uniqueName as number) || (params || {})['uniqueName?email=:email'];

  const updateChats = async () => {
    if (email) {
      const { data, error } = await ChatService.getChats(email);
      if (data) {
        dispatch(setChats(data));
      }
      if (error) ErrorHandler.handleNoMoneyError(error);
    }
  };

  useEffect(() => {
    if (route?.params?.params?.params?.params) {
      if (email && uniqueName) {
        navigateToChat(Number(uniqueName));
      } else {
        callWithRefresh(updateChats);
      }
    }
  }, [uniqueName]);

  const [update, setUpdate] = useState(listNeedUpdate);
  useEffect(() => {
    callWithRefresh(updateChats);
  }, [update]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('drawerClose', () => {
      dispatch(toggleUnread(false));
    });
    return unsubscribe;
  }, [navigation]);

  const [joinError, setJoinError] = useState<string | null>(null);

  const navigateToChat = async (uniqueName: number) => {
    setJoinError(null);

    try {
      if (email) {
        if (!conferences.find((chatItem) => chatItem.uniqueName === uniqueName)) {
          await callWithRefresh(updateChats);
        }

        try {
          await ChatService.connectToRoom(uniqueName, [email]);
          navigation.navigate('Chat', { uniqueName, email });
        } catch (error) {
          setJoinError(error.message);
        }
      } else {
        SharpTalksModal.showError();
      }
    } catch (error) {
      SharpTalksModal.showError(error);
    }
  };

  const clearJoinError = () => {
    setJoinError(null);
  }

  const openMenu = () => {
    dispatch(setMenuComponent({ name: 'Settings' }));
    navigation.openDrawer();
  };

  return (
    <SharpDevBackground>
      <ScrollView style={styles.container}>
        <Header toggleOpen={openMenu} />
        <JoinChat navigateToChat={navigateToChat} error={joinError} clearError={clearJoinError} />
        <AddChat email={email} />
        {conferences.length > 0 && <ChatsList onPress={navigateToChat} chats={conferences} updateChats={setUpdate} />}
      </ScrollView>
    </SharpDevBackground>
  );
};

export default checkAuth(MainScreen);
