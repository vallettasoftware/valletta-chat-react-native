import React, { Component } from 'react';
import { Platform, View } from 'react-native';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import {
  ParticipantEventCb,
  RoomErrorEventCb,
  RoomEventCb,
  TrackEventCb,
  TrackEventCbArgs,
  TwilioVideo,
} from 'react-native-twilio-video-webrtc';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import messageService from '../../services/messageService';

import Header from '../../components/header';
import { StatusConnection } from '../../enums/statusConnection';
import { FooterTabs } from '../../components/footerTabs';
import { SharpDevBackground } from '../../../../components/imageBackround';
import { IMenuComponent } from '../../../../store/models/common/Menu';
import { IParticipantConfig } from '../../../../store/models/common/Participants';
import SharpTalksModal from '../../components/modalOption';
import videoRef from '../../../../common/VideoRef';
import { styles } from './styles';
import { BaseProps } from './models';
import { Participants } from '../../components/participants';
import { parseParticipant } from '../../../../common/Participant';
import Sound from 'react-native-sound';

const soundNote = require('../../../../assets/audio/sound-01.mp3');

Sound.setCategory('Playback');
const ring = new Sound(soundNote, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

type IChatProps = BaseProps;

interface IChatState {
  participants: Map<string, IParticipantConfig>; // key: sid
}

export class Chat extends Component<IChatProps, IChatState> {
  private static initialState: IChatState = {
    participants: new Map<string, IParticipantConfig>(),
  };

  constructor(props: IChatProps) {
    super(props);

    this.state = Chat.initialState;
  }

  private onConnect = () => {
    try {
      this.leaveConference().then(() => {
        activateKeepAwake();
        this.requestPermissions(Platform.OS);
      });
    } catch (e) {
      console.log('error after connect = ', e);
    }
  };

  componentDidMount() {
    this.onConnect();
  }

  componentWillUnmount() {
    this.handleLeaveConference();
  }

  componentDidUpdate(prevProps: Readonly<IChatProps>, prevState: Readonly<IChatState>) {
    const { headphone: currHeadphone } = this.props;
    const { headphone: prevHeadphone } = prevProps;

    if (currHeadphone.audioJack !== prevHeadphone.audioJack || currHeadphone.bluetooth !== prevHeadphone.bluetooth) {
      if (Platform.OS === 'android') {
        this.setSoundSettings();
      }
    }
  }

  private setSoundSettings = () => {
    const { headphone } = this.props;

    if (videoRef.isConnected()) {
      const { current } = videoRef.instance;
      current.setBluetoothHeadsetConnected(true).then(() => {
        const isHeadphone = headphone.audioJack || headphone.bluetooth;
        current.toggleSoundSetup(!isHeadphone);
      });
    }
  };

  public close = () => {
    const { navigation } = this.props;
    navigation.navigate('Main');
  };

  private requestPermissions = (devicePlatform: string) => {
    const { navigation, route, connectToRoom } = this.props;

    const connect = () => {
      try {
        if (route && route.params) {
          const { email, uniqueName } = (route.params as { email: string; uniqueName: number }) || {};
          if (email && uniqueName) {
            connectToRoom({ email, uniqueName: uniqueName.toString() });
          }
        }
      } catch (e) {
        console.log('connect error = ', e);
      }
    };

    switch (devicePlatform) {
      case 'ios':
        requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE]).then(connect);
        break;
      case 'android':
        requestMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO]).then(connect);
        break;
      default:
        console.error('Not supported platform:', devicePlatform);
        navigation.navigate('Main');
    }
  };

  private changeMicrophoneState = () => {
    const { isAudioEnabled } = this.props;

    if (videoRef.isConnected()) {
      videoRef.instance.current
        .setLocalAudioEnabled(!isAudioEnabled)
        .then((enabled: boolean) => this.updateLocalParticipant(enabled));
    }
  };

  private changeCameraState = () => {
    const { isVideoEnabled } = this.props;

    if (videoRef.isConnected()) {
      videoRef.instance.current
        .setLocalVideoEnabled(!isVideoEnabled)
        .then((enabled: boolean) => this.updateLocalParticipant(enabled, false));
    }
  };

  private updateLocalParticipant = (isEnabled: boolean, isAudioUpdate = true) => {
    const {
      mySpeakerId,
      isVideoEnabled: isLocalVideo,
      isAudioEnabled: isLocalAudio,
      setVideoEnabled,
      setAudioEnabled,
    } = this.props;
    const { participants } = this.state;
    let isAudioEnabled = isLocalAudio;
    let isVideoEnabled = isLocalVideo;

    if (mySpeakerId) {
      const localParticipantConfig = participants.get(mySpeakerId);

      if (!localParticipantConfig) {
        SharpTalksModal.showError();
        return;
      }

      if (isAudioUpdate) {
        localParticipantConfig.isAudioEnabled = isEnabled;
        isAudioEnabled = isEnabled;
      } else {
        localParticipantConfig.isVideoEnabled = isEnabled;
        isVideoEnabled = isEnabled;
      }

      const newParticipant = participants.set(mySpeakerId, localParticipantConfig);

      this.setState({ participants: newParticipant });
      setVideoEnabled(isVideoEnabled);
      setAudioEnabled(isAudioEnabled);
    } else {
      SharpTalksModal.showError();
    }
  };

  private disconnectFromRoom = () => {
    try {
      const { disconnect } = this.props;
      const { participants } = this.state;
      videoRef.disconnect();
      this.updateMenuParticipants(new Map<string, IParticipantConfig>());
      participants.clear();
      disconnect();
    } catch (e) {
      console.log('Chat.disconnectFromRoom error = ', e);
    }
  };

  private leaveConference = async () => {
    try {
      deactivateKeepAwake();
      await this.disconnectFromRoom();
      messageService.leaveChannel();
    } catch (e) {
      console.log('leaveConference error = ', e);
    }
  };

  private handleLeaveConference = async () => {
    const { navigation } = this.props;
    await this.leaveConference();
    navigation.navigate('Main');
  };

  private getLocalParticipant = (participants: { identity: string; sid: string }[]) => {
    const { route } = this.props;
    const parsedParticipants = participants.map(({ identity }) => {
      const { hasError, parsed } = parseParticipant(identity);
      return hasError ? null : parsed;
    });

    if (route?.params?.email) {
      const index = parsedParticipants.findIndex((el) => el && el.email === route?.params?.email);
      return participants[index];
    }
    throw new Error('Local user cannot be found in conference');
  };

  private onRoomDidConnect: RoomEventCb = (arg) => {
    const { participants } = this.state;
    const {
      navigation,
      setCamera,
      isAudioEnabled,
      isVideoEnabled,
      setStatus,
      setMySpeakerId,
      setActiveSpeaker,
      subscribeOnChat,
      setIdentity,
    } = this.props;
    const localParticipant = this.getLocalParticipant(arg.participants);

    const { hasError, parsed } = parseParticipant(localParticipant.identity);

    if (!hasError && parsed) {
      const { name, email } = parsed;
      setIdentity(parsed);

      subscribeOnChat();

      if (isVideoEnabled) {
        setCamera(true);
      }

      if (Platform.OS === 'android') {
        this.setSoundSettings();
      }

      const participantConfig: IParticipantConfig = {
        participantSid: '',
        videoTrackSid: '',
        isAudioEnabled,
        isVideoEnabled,
        isRemote: false,
        name,
        email,
      };

      if (localParticipant && localParticipant.identity) {
        const updateParticipants = participants.set(localParticipant.sid, participantConfig);
        this.setState({
          participants: updateParticipants,
        });

        setMySpeakerId(localParticipant.sid);
        setActiveSpeaker(localParticipant.sid);
        setStatus(StatusConnection.CONNECTED);
      } else {
        console.error('onRoomDidConnect: email is undefined');
        navigation.goBack();
      }
    }
  };

  private onRoomDidDisconnect: RoomErrorEventCb = ({ roomName, roomSid, error }) => {
    if (error) {
      console.error('onRoomDidDisconnect error', error);
    }
  };

  private onRoomDidFailToConnect: RoomErrorEventCb = ({ roomName, roomSid, error }) => {
    console.log('onRoomDidFailToConnect', roomName, roomSid);

    if (error) {
      console.error('onRoomDidFailToConnect error', error);
    }

    const { navigation } = this.props;
    navigation.goBack();
  };

  private getAddTrackCallback: (type: 'audio' | 'video') => TrackEventCb = (type) => ({ participant, track }) => {
    ring.play();

    const { participants } = this.state;
    const isExistParticipant = participants.has(participant.identity);
    const { hasError, parsed } = parseParticipant(participant.identity);

    if (isExistParticipant) {
      const remoteParticipant = participants.get(participant.identity);
      if (remoteParticipant) {
        if (type === 'audio') {
          remoteParticipant.isAudioEnabled = track.enabled;
        } else {
          remoteParticipant.isVideoEnabled = track.enabled;
        }

        const newRemoteParticipants = participants.set(participant.identity, remoteParticipant);
        this.updateMenuParticipants(newRemoteParticipants);
        if (newRemoteParticipants.size > 1) {
          const { setCamera } = this.props;
          setCamera(true);
        }
        this.setState({participants: newRemoteParticipants})
      }
    }

    if (!hasError && parsed && !isExistParticipant) {
      const { name, email } = parsed;
      const remoteParticipantConfig: IParticipantConfig = {
        videoTrackSid: track.trackSid,
        participantSid: participant.sid,
        [type === 'audio' ? 'isAudioEnabled' : 'isVideoEnabled']: track.enabled,
        isRemote: true,
        name,
        email,
      };
      const newRemoteParticipants = participants.set(participant.identity, remoteParticipantConfig);
      this.updateMenuParticipants(newRemoteParticipants);
      if (newRemoteParticipants.size > 1) {
        const { setCamera } = this.props;
        setCamera(true);
      }
      this.setState({ participants: newRemoteParticipants });
    }
  };

  private onParticipantRemovedVideoTrack: TrackEventCb = ({ participant, track }) => {
    const { participants } = this.state;
    const newRemoteParticipants = new Map<string, IParticipantConfig>(participants);
    const isDeleted = newRemoteParticipants.delete(participant.identity);
    if (newRemoteParticipants.size === 1) {
      const { setCamera } = this.props;
      setCamera(false);
    }

    if (isDeleted) {
      this.updateMenuParticipants(newRemoteParticipants);
    }

    this.setState({ participants: newRemoteParticipants });
  };

  private onParticipantEnabledVideoTrack: TrackEventCb = (trackEvent) => {
    this.updateRemoteParticipant(trackEvent, true);
  };

  private onParticipantDisabledVideoTrack: TrackEventCb = (trackEvent) => {
    this.updateRemoteParticipant(trackEvent, false);
  };

  private onParticipantEnabledAudioTrack: TrackEventCb = (trackEvent) => {
    this.updateRemoteParticipant(trackEvent, true, false);
  };

  private onParticipantDisabledAudioTrack: TrackEventCb = (trackEvent) => {
    this.updateRemoteParticipant(trackEvent, false, false);
  };

  private updateRemoteParticipant = (trackEvent: TrackEventCbArgs, isEnabled: boolean, isVideoUpdate = true) => {
    const { participants } = this.state;
    const { participant } = trackEvent;
    const remoteParticipantOption = participants.get(participant.identity);

    if (remoteParticipantOption) {
      if (isVideoUpdate) {
        remoteParticipantOption.isVideoEnabled = isEnabled;
      } else {
        remoteParticipantOption.isAudioEnabled = isEnabled;
      }

      const newRemoteParticipants = participants.set(participant.identity, remoteParticipantOption);

      if (!isVideoUpdate) {
        this.updateMenuParticipants(newRemoteParticipants);
      }

      this.setState({ participants: newRemoteParticipants });
    }
  };

  private onParticipantDisconnect: ParticipantEventCb = (p) => {
    const { participants } = this.state;
    participants.delete(p.participant.identity);
    this.setState({ participants });
  };

  private openMenu = (menuComponent: IMenuComponent) => {
    const { navigation, setMenu, toggle } = this.props;
    setMenu(menuComponent);
    toggle(false);
    if (menuComponent.name === 'ConferenceSettings') navigation.openDrawer();
    else navigation.dangerouslyGetParent()?.dangerouslyGetParent()?.openDrawer();
  };

  private updateMenuParticipants = (participants?: Map<string, IParticipantConfig>) => {
    const { participants: stateParticipants } = this.state;
    const { setMenu, route } = this.props;
    const newParticipants = participants ?? stateParticipants;
    const menuParticipants = Array.from(newParticipants, ([sid, participantConfig]) => ({
      name: participantConfig.name,
      isAudioEnabled: participantConfig.isAudioEnabled,
    }));

    setMenu({ name: 'Participants', participants: menuParticipants, uniqueName: route?.params?.uniqueName });
  };

  render() {
    const { participants } = this.state;
    const { route, isVideoEnabled, isAudioEnabled } = this.props;

    return (
      <SharpDevBackground image={require('../../../../assets/shutterstock.png')}>
        <View style={styles.container}>
          <Header toggleOpen={() => this.openMenu({ name: 'ConferenceSettings' })} />
          <Participants participants={participants} />
          <TwilioVideo
            ref={videoRef.instance}
            onRoomDidConnect={this.onRoomDidConnect}
            onRoomDidDisconnect={this.onRoomDidDisconnect}
            onParticipantAddedAudioTrack={this.getAddTrackCallback('audio')}
            onRoomDidFailToConnect={this.onRoomDidFailToConnect}
            onParticipantAddedVideoTrack={this.getAddTrackCallback('video')}
            onParticipantRemovedVideoTrack={this.onParticipantRemovedVideoTrack}
            onParticipantEnabledVideoTrack={this.onParticipantEnabledVideoTrack}
            onParticipantDisabledVideoTrack={this.onParticipantDisabledVideoTrack}
            onParticipantEnabledAudioTrack={this.onParticipantEnabledAudioTrack}
            onParticipantDisabledAudioTrack={this.onParticipantDisabledAudioTrack}
            onRoomParticipantDidDisconnect={this.onParticipantDisconnect}
          />
        </View>
        <FooterTabs
          id={route?.params?.uniqueName}
          isAudioEnabled={isAudioEnabled}
          isVideoEnabled={isVideoEnabled}
          changeVideoState={this.changeCameraState}
          openMenu={this.openMenu}
          participants={participants}
          onPress={this.handleLeaveConference}
          changeMicroState={this.changeMicrophoneState}
        />
      </SharpDevBackground>
    );
  }
}
