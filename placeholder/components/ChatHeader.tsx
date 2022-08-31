import {
  ChatHeaderProps,
  ChatObject,
  PersonObject,
  Avatar,
} from "react-chat-engine-advanced";
import styles from '../styles/chat.module.css'

interface CustomChatHeaderProps extends ChatHeaderProps {
  chat?: ChatObject;
  username: string;
  secret: string;
}

export const getOtherUser = (
  chat: ChatObject,
  username: string
): PersonObject | undefined => {
  const otherMember = chat.people.find(
    (member) => member.person.username !== username
  );
  return otherMember?.person;
};

const ChatHeader = (props: CustomChatHeaderProps) => {
  const otherMember: PersonObject | undefined =
    props.chat && getOtherUser(props.chat, props.username);

    return (
      <div className={styles.header}>
      {otherMember && (
        <div>
          <Avatar
            className={styles.headerAvatar}
            avatarUrl={otherMember?.avatar}
            username={otherMember?.username}
            isOnline={otherMember?.is_online}
          />

          <div className={styles.headerText}>
            <div className={styles.title}>
              {otherMember.first_name} {otherMember.last_name}
            </div>
            <div className={styles.title}>
              {otherMember.is_online ? "Online" : "Offline"}
            </div>
          </div>
          </div>
      )}
          </div>
    )
    
    
     
        

}
export default ChatHeader