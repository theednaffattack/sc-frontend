import {
  GetAllTeamMembersQuery,
  User
} from "../../gql-gen/generated/apollo-graphql";

interface TeamMemberListProps {
  invitees: GetAllTeamMembersQuery["getAllTeamMembers"];
  setInvitees: React.Dispatch<
    React.SetStateAction<
      ({
        __typename?: "User" | undefined;
      } & Pick<User, "id" | "name" | "teamRole">)[]
    >
  >;
}

export const SelectedTeamMemberList: React.FC<TeamMemberListProps> = ({
  invitees
}) => {
  return (
    <ul>
      {invitees?.map((user, index) => (
        <li key={`selected-${user?.id}` ?? index + "selected-team-member-key"}>
          {user.name}
        </li>
      )) ?? null}
    </ul>
  );
};
