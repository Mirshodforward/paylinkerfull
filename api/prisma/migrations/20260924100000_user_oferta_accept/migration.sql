-- Ommaviy oferta aksepti: qachon va qaysi tahrir qabul qilingani
ALTER TABLE "users" ADD COLUMN "oferta_accepted_at" TIMESTAMP(3);
ALTER TABLE "users" ADD COLUMN "oferta_version" TEXT;
