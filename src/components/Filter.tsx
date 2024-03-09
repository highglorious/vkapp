import { useAtom } from "jotai";
import { ChipsSelect, FormItem, Group, Header, Radio } from "@vkontakte/vkui";
import { ChangeEvent, useMemo } from "react";
import { useGroups } from "../hooks/useGroups";
import {
  selectColorAtom,
  selectFriendsAtom,
  selectGroupAtom,
} from "../state/atoms";
import { FilterFriendsType, FilterGroupType } from "../types/filter";

export const Filter = () => {
  const [selectedFriends, setSelectedFriends] = useAtom(selectFriendsAtom);
  const [selectedGroup, setSelectedGroup] = useAtom(selectGroupAtom);
  const [selectedColor, setSelectedColor] = useAtom(selectColorAtom);

  const onFriendsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFriends(e.target.value as FilterFriendsType);
  };
  const onGroupChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedGroup(e.target.value as FilterGroupType);
  };

  const { groups } = useGroups();

  const colors = useMemo(
    () =>
      [...new Set(groups?.map((group) => group.avatar_color!))]
        //.filter((c) => c !== undefined)
        .map((color) => {
          if (color === undefined) {
            return {
              label: "Нет аватара",
              value: "noavatar",
            };
          } else
            return {
              value: color,
              label: color,
            };
        }),
    [groups]
  );

  return (
    <Group header={<Header mode="secondary">Фильтр</Header>}>
      <FormItem top="Тип группы">
        <Radio
          name="closedGroup"
          value="all"
          checked={selectedGroup === "all"}
          onChange={onGroupChange}
        >
          Все
        </Radio>
        <Radio
          name="closedGroup"
          value="closed"
          checked={selectedGroup === "closed"}
          onChange={onGroupChange}
        >
          Закрытые
        </Radio>
        <Radio
          name="closedGroup"
          value="open"
          checked={selectedGroup === "open"}
          onChange={onGroupChange}
        >
          Открытые
        </Radio>
      </FormItem>

      <FormItem top="Друзья">
        <Radio
          name="friends"
          value="all"
          checked={selectedFriends === "all"}
          onChange={onFriendsChange}
        >
          Все
        </Radio>
        <Radio
          name="friends"
          value="yes"
          checked={selectedFriends === "yes"}
          onChange={onFriendsChange}
        >
          Есть друзья
        </Radio>
        <Radio
          name="friends"
          value="no"
          checked={selectedFriends === "no"}
          onChange={onFriendsChange}
        >
          Нет друзей
        </Radio>
      </FormItem>

      <FormItem top="Аватарка">
        <ChipsSelect
          value={selectedColor}
          onChange={setSelectedColor}
          options={colors}
          placeholder="Все"
        />
      </FormItem>
    </Group>
  );
};
