/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `manufacturer` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Product` table. All the data in the column will be lost.
  - The primary key for the `ProductLike` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `ArticleTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[productId,userId]` on the table `ProductLike` will be added. If there are existing duplicate values, this will fail.
  - Made the column `articleId` on table `Comment` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `title` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ArticleLike" DROP CONSTRAINT "ArticleLike_articleId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleLike" DROP CONSTRAINT "ArticleLike_userId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleTag" DROP CONSTRAINT "ArticleTag_articleId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_articleId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_productId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_userId_fkey";

-- DropIndex
DROP INDEX "Article_authorId_idx";

-- DropIndex
DROP INDEX "Comment_articleId_idx";

-- DropIndex
DROP INDEX "Comment_productId_idx";

-- DropIndex
DROP INDEX "Product_userId_idx";

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "createdAt",
DROP COLUMN "productId",
DROP COLUMN "updatedAt",
ALTER COLUMN "articleId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "manufacturer",
DROP COLUMN "name",
DROP COLUMN "tags",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "ProductLike" DROP CONSTRAINT "ProductLike_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ProductLike_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "ArticleTag";

-- DropTable
DROP TABLE "Notification";

-- CreateTable
CREATE TABLE "ProductComment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserArticles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserArticles_AB_unique" ON "_UserArticles"("A", "B");

-- CreateIndex
CREATE INDEX "_UserArticles_B_index" ON "_UserArticles"("B");

-- CreateIndex
CREATE UNIQUE INDEX "ProductLike_productId_userId_key" ON "ProductLike"("productId", "userId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductComment" ADD CONSTRAINT "ProductComment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductComment" ADD CONSTRAINT "ProductComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleLike" ADD CONSTRAINT "ArticleLike_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleLike" ADD CONSTRAINT "ArticleLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserArticles" ADD CONSTRAINT "_UserArticles_A_fkey" FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserArticles" ADD CONSTRAINT "_UserArticles_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
