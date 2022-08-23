import {
  ChatCard,
  ChatCardProps,
  ChatObject,
  PersonObject
} from "react-chat-engine-advanced";
import { UserType } from "../lib/models/User";


interface CustomChatCardProps extends ChatCardProps {
  username: string;
  isActive: boolean;
  onChatCardClick: (chatId: number) => void;
  chat?: ChatObject;
  allUsers: UserType[];
}


export const getOtherUser = (chat: ChatObject, username: string): PersonObject | undefined => {
  const otherMember = chat.people.find(
    (member) => member.person.username !== username
  );
  return otherMember?.person;
};

const CustomChatCard = (props: CustomChatCardProps) => {
  if (!props.chat) return <div />;

  const otherMember = getOtherUser(props.chat, props.username);
  if (otherMember) {
    props.allUsers.forEach(user => {
      if (user.username === otherMember?.username) {
        otherMember.avatar = user.custom_json.avatar
      }
    })
  }


  const firstName = otherMember ? otherMember.first_name : "";
  const lastName = otherMember ? otherMember.last_name : "";
  const username = otherMember ? otherMember.username : "";
  const messageText = props.chat.last_message.text;
  const hasNotification =
    props.chat.last_message.sender_username !== props.username;
  console.log('Here is the otherMember ', otherMember)

  return (
    <ChatCard
      title={`${firstName} ${lastName}`}
      description={
        messageText === null || messageText.length === 0
          ? "Say hello!"
          : messageText
      }
      hasNotification={hasNotification}
      avatarUrl={otherMember?.avatar}
      avatarUsername={username}
      avatarStyle={{
        boxShadow: otherMember?.is_online
          ? "rgb(24 144 255 / 35%) 0px 2px 7px"
          : "rgb(245 34 45 / 35%) 0px 2px 7px",
        border: otherMember?.is_online
          ? "1px solid rgb(24 144 255)"
          : "1px solid rgb(245 34 45)",
      }}
      isActive={props.isActive}
      onClick={() => props.chat && props.onChatCardClick(props.chat.id)}
    />
  );
};

export default CustomChatCard;
