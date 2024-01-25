import React from 'react';

class VideoRef {
  isConnected() {
    return this.instance?.current?.connect;
  }

  disconnect() {
    if (this.isConnected()) {
      this.instance.current.disconnect();
    }
  }

  connect(twilioToken: string, uniqueName: string, enableAudio: boolean, enableVideo: boolean) {
    try {
      this.instance.current.connect({
        accessToken: twilioToken,
        roomName: uniqueName,
        enableAudio,
        enableVideo,
        enableRemoteAudio: true,
      });
    } catch (e) {
      console.log('VideoRef connect e = ', e);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public readonly instance: any = React.createRef();
}

const videoRef = new VideoRef();

export default videoRef;
