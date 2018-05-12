/* eslint-disable no-undef */
const NEW_MEESAGE_SOUND_PATH = 'static/sounds/newMessage.mp3';
const NEW_CONVERSATION_SOUND_PATH = 'static/sounds/newConversation.mp3';
const SELF_MESSAGE_SOUND_PATH = 'static/sounds/selfMessage.mp3';

export let newMessageSound;
export let newConversationSound;
export let selfMessageSound;

export function initSounds() {
    newMessageSound = new Audio(NEW_MEESAGE_SOUND_PATH);
    newMessageSound.volume = 1;

    newConversationSound = new Audio(NEW_CONVERSATION_SOUND_PATH);
    newConversationSound.volume = 1;

    selfMessageSound = new Audio(SELF_MESSAGE_SOUND_PATH);
    selfMessageSound.volume = 1;
}
