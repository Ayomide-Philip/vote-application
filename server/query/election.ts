const ADMIN_ELECTIONS_SELECT = `
  select
    e.id,
    u.fullname as admin_fullname,
    u.image_url as admin_profile_picture,
    e.title as election_title,
    e.description as election_description,
    e.election_code,
    e.start_time,
    e.end_time,
    e.election_type,
    'admin'::text as role,
    null::varchar as voter_status,
    null::timestamptz as voter_joined_at,
    count(v.user_id)::int as total_voters,
    e.created_at
  from
    elections as e
    inner join users as u on u.id = e.creator_id
    left join voters as v on v.election_id = e.id
  where
    e.creator_id = $1
  group by
    e.id,
    u.id
`;

const VOTER_ELECTIONS_SELECT = `
  select
    e.id,
    u.fullname as admin_fullname,
    u.image_url as admin_profile_picture,
    e.title as election_title,
    e.description as election_description,
    e.election_code,
    e.start_time,
    e.end_time,
    e.election_type,
    'voter'::text as role,
    v.status as voter_status,
    v.joined_at as voter_joined_at,
    (select count(*)::int from voters as v2 where v2.election_id = e.id) as total_voters,
    e.created_at
  from
    voters as v
    inner join elections as e on e.id = v.election_id
    inner join users as u on u.id = e.creator_id
  where
    v.user_id = $1
`;

export const GET_ADMIN_ELECTIONS_QUERY = `
  ${ADMIN_ELECTIONS_SELECT}
  order by
    e.created_at desc;
`;

export const GET_VOTER_ELECTIONS_QUERY = `
  ${VOTER_ELECTIONS_SELECT}
  order by
    v.joined_at desc;
`;

export const GET_ALL_ELECTIONS_QUERY = `
  ${ADMIN_ELECTIONS_SELECT}
  union all
  ${VOTER_ELECTIONS_SELECT}
  order by
    created_at desc;
`;
