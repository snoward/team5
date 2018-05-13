/* eslint-disable no-undef */
import { Howl } from 'howler';

const NEW_MEESAGE_SOUND_PATH = 'static/sounds/newMessage.mp3';
const NEW_CONVERSATION_SOUND_PATH = 'static/sounds/newConversation.mp3';
const SELF_MESSAGE_SOUND_PATH = 'static/sounds/selfMessage.mp3';

export let newMessageSound;
export let newConversationSound;
export let selfMessageSound;

export function initSounds() {
    newMessageSound = new Howl({ src: NEW_MEESAGE_SOUND_PATH });
    newConversationSound = new Howl({ src: NEW_CONVERSATION_SOUND_PATH });
    selfMessageSound = new Howl({ src: SELF_MESSAGE_SOUND_PATH });
}
