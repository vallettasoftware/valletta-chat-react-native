import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';

import { styles } from './styles';
import { ModalButton } from './common/button';
import { TextForm } from './forms/text/textForm';
import { InviteForm } from './forms/invite/inviteForm';
import { RenameForm } from './forms/rename/renameForm';
import { ActionOption } from '../../enums/actionOption';
import { BaseError } from '../../../../common/errors/baseError';
import { DefaultError } from '../../../../common/errors/defualtError';
import { TwilioMoneyError } from '../../../../common/errors/twilioMoneyError';
import { IModal, IModalButton, ISharpTalksConfiguration, modalTexts } from '../../../../store/models/common/Modal';
import { t } from '../../../../common/i18n';
import { MeetingInfo } from './forms/meeting/meetingInfo';

interface ISharpTalksState {
  action: ActionOption;
  modal?: IModal;
  withArguments?: boolean;
  button?: IModalButton;
  defaultButtonTitle?: string;
  swapButtons?: boolean;
  shouldClose?: boolean;
  onClose?: () => void;
}

class SharpTalksModal extends Component<unknown, ISharpTalksState> {
  private static ref: SharpTalksModal | null;

  private formArguments?: any;

  private defaultState: ISharpTalksState = {
    action: ActionOption.CANCEL,
    swapButtons: false,
    shouldClose: true,
    modal: undefined,
    withArguments: undefined,
    button: undefined,
    defaultButtonTitle: undefined,
  };

  static setRef(ref: SharpTalksModal | null) {
    this.ref = ref;
  }

  private setArguments(funcArguments: any) {
    this.formArguments = funcArguments;
  }

  static show(configuration: ISharpTalksConfiguration) {
    this.ref?.show(configuration);
  }

  static showError(error?: unknown) {
    this.ref?.hide();
    this.ref?.showError(error as BaseError);
  }

  static hide() {
    this.ref?.hide();
  }

  constructor(props: unknown) {
    super(props);

    this.state = {
      action: ActionOption.CANCEL,
      swapButtons: false,
      shouldClose: true,
    };
  }

  private show = (configuration: ISharpTalksConfiguration) => {
    const { button } = this.state;

    if (!configuration) {
      this.showError();
      return;
    }

    if (!configuration.button && button) {
      configuration.button = undefined;
    }

    this.setState({ ...configuration }, () => console.log(' state = ', this.state));
  };

  private showError = (error?: BaseError) => {
    if (!error) {
      this.show({
        action: ActionOption.ERROR,
        modal: modalTexts.default,
        withArguments: false,
      });
    }

    if (error instanceof TwilioMoneyError) {
      this.setError(modalTexts.notEnoughMoney, t('COMMON.ACTIONS.OK_I_UNDERSTOOD'));
    } else if (error instanceof DefaultError) {
      this.setError(modalTexts.default);
    } else {
      this.setError(modalTexts.default);
    }
  };

  private setError = (modal: IModal, defaultButtonTitle?: string) =>
    this.show({ action: ActionOption.ERROR, modal, withArguments: false, defaultButtonTitle });

  private hide = () => {
    const { action, onClose } = this.state;

    if (action !== ActionOption.CANCEL) {
      this.setState({ ...this.defaultState });
    }
    if (onClose) onClose();
  };

  private chooseForm = (isSomethingWrong: boolean) => {
    const { action, modal } = this.state;

    if (isSomethingWrong) {
      return <TextForm modal={modal ?? modalTexts.default} />;
    }

    let form = null;

    switch (action) {
      case ActionOption.RENAME:
        form = <RenameForm setArguments={(args: any) => this.setArguments(args)} />;
        break;
      case ActionOption.INVITE:
        form = <InviteForm setArguments={(args: any) => this.setArguments(args)} />;
        break;
      case ActionOption.SUCCESS:
        form = <TextForm modal={modal ?? modalTexts.default} image={require('../../../../assets/icons/success.png')} />;
        break;
      case ActionOption.MEETING_INFO:
        form = <MeetingInfo setArguments={(args: any) => this.setArguments(args)} />
        break;
      case ActionOption.DELETE:
      case ActionOption.ERROR:
        form = <TextForm modal={modal ?? modalTexts.default} />;
        break;
      case ActionOption.CANCEL:
        break;
      case ActionOption.LONG_NAME_ERROR:
        form = <TextForm modal={modal ?? modalTexts.longNameError} />;
        break;
      default:
        this.hide();
        break;
    }

    return form;
  };

  private actionButtonPress = async () => {
    const { withArguments, button, shouldClose, action } = this.state;
    if (action !== ActionOption.INVITE && withArguments && !this.formArguments) {
      this.showError();
      return;
    }

    if (button) {
      try {
        await button.onPress(this.formArguments);

        if (shouldClose) {
          this.hide();
        }
      } catch (error) {
        this.showError(error);
      }
    } else {
      this.hide();
      this.show({ action: ActionOption.ERROR, modal: modalTexts.default, withArguments: false });
    }
  };

  private isSomethingWrong = (modal?: IModal, button?: IModalButton) =>
    !modal ||
    modal.title === modalTexts.default.title ||
    modal.text === modalTexts.default.text ||
    (modal.withActionButton && !button);

  private createButtons = (isSomethingWrong: boolean) => {
    const { action, defaultButtonTitle, button, swapButtons } = this.state;

    if (isSomethingWrong || action === ActionOption.SUCCESS) {
      return (
        <View style={styles.buttons}>
          <ModalButton
            rightButton
            hasMargin={false}
            onPress={this.hide}
            title={defaultButtonTitle || t('COMMON.ACTIONS.CANCEL')}
          />
        </View>
      );
    }

    if (swapButtons) {
      return (
        <View style={styles.buttons}>
          {!isSomethingWrong && button && (
            <ModalButton hasMargin={false} onPress={this.actionButtonPress} title={button.title} />
          )}
          <ModalButton rightButton onPress={this.hide} title={defaultButtonTitle || t('COMMON.ACTIONS.CANCEL')} />
        </View>
      );
    }

    return (
      <View style={styles.buttons}>
        <ModalButton hasMargin={false} onPress={this.hide} title={defaultButtonTitle || t('COMMON.ACTIONS.CANCEL')} />
        {!isSomethingWrong && button && (
          <ModalButton rightButton onPress={this.actionButtonPress} title={button.title} />
        )}
      </View>
    );
  };

  render() {
    const { action, modal, button } = this.state;
    const isVisible = action !== ActionOption.CANCEL;
    const isSomethingWrong = this.isSomethingWrong(modal, button);

    return (
      <View>
        <Modal isVisible={isVisible} onBackButtonPress={this.hide} onBackdropPress={this.hide}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>
                  {isSomethingWrong || !modal ? modalTexts.default.title : modal.title}
                </Text>
              </View>
            </View>
            <View style={styles.bodyContainer}>
              <View style={styles.body}>{this.chooseForm(isSomethingWrong)}</View>
            </View>
            <View style={styles.buttonsContainer}>{this.createButtons(isSomethingWrong)}</View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default SharpTalksModal;
