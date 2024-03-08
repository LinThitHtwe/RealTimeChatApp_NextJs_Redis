"use client";
import { chatHrefConstructor } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

interface PageProps {
  friends: User[];
  sessionId: string;
}

const SidebarChatList: FC<PageProps> = ({ sessionId, friends }) => {
  const router = useRouter();
  const pathName = usePathname();

  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (pathName?.includes("chat")) {
      setUnseenMessages((prev) => {
        return prev.filter((msg) => !pathName.includes(msg.senderId));
      });
    }
  }, [pathName]);

  return (
    <ul role="list" className="max-h-[25rem] overflow-y-auto -mx-2 space-y-1">
      {friends.sort().map((friend) => {
        const unseenMessagesCount = unseenMessages.filter(
          (unseenMessage) => unseenMessage.senderId == friend.id
        ).length;

        return (
          <li key={friend.id}>
            <a
              href={`/dashboard/chat/${chatHrefConstructor(
                sessionId,
                friend.id
              )}`}
              className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
            >
              {friend.name}
              {unseenMessagesCount > 0 ? (
                <div className="bg-indigo-600 font-medium text-xs text-white w-4 h-4 rounded-full flex justify-center items-center">
                  {unseenMessagesCount}
                </div>
              ) : null}
            </a>
          </li>
        );
      })}

      {/* {activeChats.sort().map((friend) => {
    const unseenMessagesCount = unseenMessages.filter((unseenMsg) => {
      return unseenMsg.senderId === friend.id
    }).length

    return (
      <li key={friend.id}>
        <a
          href={`/dashboard/chat/${chatHrefConstructor(
            sessionId,
            friend.id
          )}`}
          className='text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'>
          {friend.name}
          {unseenMessagesCount > 0 ? (
            <div className='bg-indigo-600 font-medium text-xs text-white w-4 h-4 rounded-full flex justify-center items-center'>
              {unseenMessagesCount}
            </div>
          ) : null}
        </a>
      </li>
    )
  })} */}
    </ul>
  );
};

export default SidebarChatList;
