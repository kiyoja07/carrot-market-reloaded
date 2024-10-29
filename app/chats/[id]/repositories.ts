import db from "@/lib/db";
// import { setQueryLog } from "@/libs/utils";

export const getRoom = async (id: string) => {
  const room = await db.chatRoom.findUnique({
    where: { id },
    include: {
      users: {
        select: { id: true },
      },
    },
  });

  //   setQueryLog("채팅방 입장", "getRoom", room);
  return room;
};

export const getMessage = async (chatRoomId: string) => {
  const messages = await db.message.findMany({
    where: { chatRoomId },
    select: {
      id: true,
      payload: true,
      created_at: true,
      userId: true,
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  //   setQueryLog("채팅 메시지 목록 불러오기", "getMessage", messages);
  return messages;
};

export const createMessage = async (
  payload: string,
  chatRoomId: string,
  userId: number
) => {
  const result = await db.message.create({
    data: {
      payload,
      chatRoomId,
      userId,
    },
    select: { id: true },
  });
  //   setQueryLog("채팅 메시지 기록", "createMessage", result);
  return result;
};

export const getMsgsInCurrentChatRoom = async (chatRoomId: string) => {
  return db.message.count({
    where: {
      chatRoomId,
    },
  });
};

export const delChatRoom = async (chatRoomId: string) => {
  await db.chatRoom.delete({
    where: { id: chatRoomId },
  });
};
