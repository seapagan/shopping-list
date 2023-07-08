drop policy "users can do all to their own data" on "public"."shopping";

alter table "public"."shopping" add column "_prev" bigint;

create policy "users can read/edit/delete their own data"
on "public"."shopping"
as permissive
for all
to authenticated
using ((auth.uid() = user_id));



