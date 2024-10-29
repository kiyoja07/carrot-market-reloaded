import {
  getChatRoomList,
  getUserChatRoomIds,
} from "@/app/(tabs)/chat/repositories";
import { removeDupElements } from "@/lib/utils";

export const getUserChatRooms = async (userId: number) => {
  return await getChatRoomList(userId);
};

export const getUserChatCounts = async (userId: number) => {
  const ids = await getUserChatRoomIds(userId);
  const pureIds = removeDupElements(ids.map((e) => e.chatRoomId));
  return pureIds.length;
};
