export const GET_ADMIN_ELECTIONS_QUERY = `
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
    count(v.user_id)::int as total_voters,
    e.created_at
from
    elections as e
    inner join users as u on u.id = e.creator_id
    left join voters as v on v.election_id = e.id
where
    e.creator_id=$1
group by
    e.id,
    u.id
order by
    e.created_at desc;
`;

export const GET_VOTER_ELECTIONS_QUERY = `
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
    v.status as voter_status,
    v.joined_at as voter_joined_at,
    count(v.user_id)::int as total_voters,
    e.created_at
from
    elections as e
    inner join users as u on u.id = e.creator_id
    left join voters as v on v.election_id = e.id
where
    v.user_id=$1
group by
    e.id,
    u.id
order by
    e.created_at desc;
`;
