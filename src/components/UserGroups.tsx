import { Group, Header, SimpleCell, Avatar } from "@vkontakte/vkui";
import { useGroups } from "../hooks/useGroups";
import { Friends } from "./Friends";
import { declOfNum } from "../utils/numeralize";
import { useMemo } from "react";
import { useAtomValue } from "jotai";
import { selectFriendsAtom, selectGroupAtom, colorAtom } from "../state/atoms";
import { GroupType } from "../types/api";

export function UserGroups() {
  const { groups } = useGroups();
  const selectedFriends = useAtomValue(selectFriendsAtom);
  const selectedGroup = useAtomValue(selectGroupAtom);
  const selectedColor = useAtomValue(colorAtom);

  const applyFilter = (item: GroupType) =>
    ((selectedFriends === "yes" && item.friends) ||
      (selectedFriends === "no" && !item.friends) ||
      selectedFriends === "all") &&
    ((selectedGroup === "closed" && item.closed) ||
      (selectedGroup === "open" && !item.closed) ||
      selectedGroup === "all") &&
    (selectedColor.includes(item.avatar_color ?? "noavatar") ||
      selectedColor.length === 0);

  const filteredGroups = groups?.filter(applyFilter);

  const content = useMemo(
    () =>
      filteredGroups?.map(
        ({ id, name, closed, avatar_color, members_count, friends }) => (
          <>
            <Group key={id} header={<Header mode="secondary"> {name}</Header>}>
              {avatar_color && (
                <Avatar
                  size={100}
                  gradientColor="custom"
                  style={{ backgroundColor: avatar_color }}
                />
              )}

              <SimpleCell>
                {closed ? "Закрытая группа" : "Открытая группа"}
              </SimpleCell>

              <SimpleCell>
                {declOfNum(members_count, [
                  "подписчик",
                  "подписчика",
                  "подписчиков",
                ])}
              </SimpleCell>
              <Friends friends={friends} />
            </Group>
          </>
        )
      ),
    [filteredGroups]
  );

  return (
    <Group header={<Header mode="secondary">Список групп</Header>}>
      {content}
    </Group>
  );
}
