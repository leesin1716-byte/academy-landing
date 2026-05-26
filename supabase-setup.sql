-- Supabase SQL Editor에서 실행하세요
create table consultations (
  id          bigserial primary key,
  name        text not null,
  tel         text not null,
  interest    text not null,
  message     text default '',
  created_at  timestamptz default now()
);

-- 외부에서 직접 읽기 금지 (서버에서만 접근)
alter table consultations enable row level security;

-- service_role key만 쓰기 허용 (anon은 차단)
create policy "service only insert"
  on consultations for insert
  using (false)
  with check (false);
