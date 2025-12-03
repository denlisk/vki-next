import type GroupInterface from '@/types/GroupInterface';
import { groupService } from '@/services/GroupService';

const defaultGroups: GroupInterface[] = [
  {
    Id: 1,
    Name: 'Group-1',
    Contacts: 'group1@test.test',
    Students: [],
  },
  {
    Id: 2,
    Name: 'Group-2',
    Contacts: 'group2@test.test',
    Students: [],
  },
  {
    Id: 3,
    Name: 'Group-3',
    Contacts: 'group3@test.test',
    Students: [],
  },
  {
    Id: 4,
    Name: 'Group-4',
    Contacts: 'group4@test.test',
    Students: [],
  },
];

export async function GET(): Promise<Response> {
  const newGroups: GroupInterface[] = [];
  const existGroups: GroupInterface[] = [];

  await Promise.all(defaultGroups.map(async (group) => {
    const exists: GroupInterface = await groupService.getGroupsById(group.Id);
    if (!exists) {
      const newGroup: GroupInterface = await groupService.addGroup(group);
      newGroups.push(newGroup);
    }
    else {
      existGroups.push(exists);
    }
  }));

  return new Response(JSON.stringify({
    newGroups,
    existGroups,
  }), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
