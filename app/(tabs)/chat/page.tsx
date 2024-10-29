import { getUserProfile } from "@/lib/session";
import ChatRoomsWrapper from "@/app/(tabs)/chat/components/chat-rooms-wrapper";
import { getUserChatCounts, getUserChatRooms } from "./services";

const Chat = async () => {
  const user = await getUserProfile();
  const initialChatRooms = await getUserChatRooms(user.id);
  const totalChatRoomCounts = await getUserChatCounts(user.id);

  console.log(initialChatRooms, totalChatRoomCounts);

  return (
    <div className="p-4">
      <ChatRoomsWrapper
        initialChatRooms={initialChatRooms}
        user={user}
        totalChatRoomCounts={totalChatRoomCounts}
      />
    </div>
  );
};

export default Chat;
