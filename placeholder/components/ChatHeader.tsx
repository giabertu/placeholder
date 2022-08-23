import {
  ChatHeaderProps,
  ChatObject,
  PersonObject,
  Avatar,
} from "react-chat-engine-advanced";
import axios from "axios";

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
      <div className="ce-custom-chat-header">
      {otherMember && (
        <div>
          <Avatar
            className="ce-custom-header-avatar"
            avatarUrl={otherMember?.avatar}
            username={otherMember?.username}
            isOnline={otherMember?.is_online}
          />

          <div className="ce-custom-header-text">
            <div className="ce-custom-header-title">
              {otherMember.first_name} {otherMember.last_name}
            </div>
            <div className="ce-custom-header-subtitle">
              {otherMember.is_online ? "Online" : "Offline"}
            </div>
          </div>
          </div>
      )}
          </div>
    )
    
    
     
        

}
export default ChatHeader