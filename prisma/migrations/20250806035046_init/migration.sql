-- CreateTable
CREATE TABLE "public"."main_table" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "favorite_item" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "main_table_pkey" PRIMARY KEY ("id")
);
