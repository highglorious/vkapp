import { Group, Header, SimpleCell } from "@vkontakte/vkui";
import { GroupType } from "../types/api";
import { useMemo, useState } from "react";
import { declOfNum } from "../utils/numeralize";

export const Friends = ({ friends }: Pick<GroupType, "friends">) => {
  const [activeFriends, setActiveFriends] = useState<boolean>(false);

  const items = useMemo(
    () =>
      friends?.map(({ first_name, last_name }) => (
        <SimpleCell>
          {first_name} {last_name}
        </SimpleCell>
      )),
    [friends]
  );

  return (
    <>
      {friends && (
        <SimpleCell onClick={() => setActiveFriends(!activeFriends)}>
          {declOfNum(friends.length, ["друг", "друга", "друзей"])}
        </SimpleCell>
      )}
      {activeFriends && (
        <Group header={<Header mode="secondary">Друзья</Header>}>{items}</Group>
      )}
    </>
  );
};
