"use server";

import db from "@/lib/db";
import { removeDupElements } from "@/lib/utils";
import { CONTENT_PER_PAGE } from "@/lib/constants";

export const getUserChatRoomIds = async (userId: number) => {
  return db.message.findMany({
    where: { userId },
    select: { chatRoomId: true },
  });
};

export const getChatRoomList = async (userId: number) => {
  const subQueryResult = await getUserChatRoomIds(userId);

  const userChatRoomIds = removeDupElements(
    subQueryResult.map((e) => e.chatRoomId)
  );

  //   const chatRooms = await db.chatRoom.findMany({
  //     include: {
  //       messages: {
  //         where: {
  //           chatRoomId: { in: userChatRoomIds },
  //         },
  //         include: {
  //           user: {
  //             select: { username: true, avatar: true },
  //           },
  //         },
  //       },
  //     },
  //     take: CONTENT_PER_PAGE,
  //   });

  const chatRooms = await db.chatRoom.findMany({
    where: {
      id: { in: userChatRoomIds },
    },
    include: {
      messages: {
        where: {
          chatRoomId: { in: userChatRoomIds },
        },
        include: {
          user: {
            select: { username: true, avatar: true },
          },
        },
      },
    },
    take: CONTENT_PER_PAGE,
  });

  console.log(chatRooms);
  const talkedRooms = chatRooms.filter((e) => e.messages.length > 0);
  //   setQueryLog("채팅 리스트 불러오기", "getRoomList", talkedRooms);
  return talkedRooms;
};

export const getMoreChatRooms = async (page: number, userId: number) => {
  const subQueryResult = await getUserChatRoomIds(userId);
  const userChatRoomIds = removeDupElements(
    subQueryResult.map((e) => e.chatRoomId)
  );
  const chatRooms = await db.chatRoom.findMany({
    include: {
      messages: {
        where: {
          chatRoomId: { in: userChatRoomIds },
        },
        include: {
          user: {
            select: { username: true, avatar: true },
          },
        },
      },
    },
    skip: CONTENT_PER_PAGE * page,
    take: CONTENT_PER_PAGE,
  });
  const talkedRooms = chatRooms.filter((e) => e.messages.length > 0);
  //   setQueryLog("채팅 리스트 불러오기", "getRoomList", talkedRooms);
  return talkedRooms;
};
