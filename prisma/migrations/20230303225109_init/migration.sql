-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialMedia" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "socialmedia_url" TEXT NOT NULL,

    CONSTRAINT "SocialMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aboutme" (
    "id" TEXT NOT NULL,
    "desc" TEXT NOT NULL,

    CONSTRAINT "Aboutme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hero" (
    "id" TEXT NOT NULL,
    "titleFirst" TEXT NOT NULL,
    "higlightText" TEXT NOT NULL,
    "mainText" TEXT NOT NULL,
    "titleSec" TEXT NOT NULL,

    CONSTRAINT "hero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "discordID" TEXT NOT NULL,
    "pronouns" TEXT,
    "message" TEXT NOT NULL,
    "readSolved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lessons" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "lessonTitle" TEXT NOT NULL,
    "recording" TEXT NOT NULL,
    "notes" TEXT,
    "homework" TEXT,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercice" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,

    CONSTRAINT "exercice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExercicesOnLessons" (
    "lessonId" TEXT NOT NULL,
    "exerciceId" TEXT NOT NULL,

    CONSTRAINT "ExercicesOnLessons_pkey" PRIMARY KEY ("lessonId","exerciceId")
);

-- CreateTable
CREATE TABLE "Resources" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "Resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Audio" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Audio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AudioOnResources" (
    "resourceId" TEXT NOT NULL,
    "audioId" TEXT NOT NULL,

    CONSTRAINT "AudioOnResources_pkey" PRIMARY KEY ("resourceId","audioId")
);

-- CreateTable
CREATE TABLE "LessonCodes" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "public_or_private" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT true,
    "timeCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userID" TEXT NOT NULL,

    CONSTRAINT "LessonCodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "hour" TEXT NOT NULL,
    "transactionID" TEXT,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avaiable_hours" (
    "id" TEXT NOT NULL,
    "hour" TEXT NOT NULL,

    CONSTRAINT "avaiable_hours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paypal_order_logs" (
    "id" TEXT NOT NULL,
    "invoice_id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "bookingId" TEXT NOT NULL,
    "item_bought" TEXT NOT NULL,

    CONSTRAINT "paypal_order_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "LessonCodes_id_key" ON "LessonCodes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "LessonCodes_code_key" ON "LessonCodes"("code");

-- CreateIndex
CREATE UNIQUE INDEX "booking_id_key" ON "booking"("id");

-- CreateIndex
CREATE UNIQUE INDEX "avaiable_hours_id_key" ON "avaiable_hours"("id");

-- CreateIndex
CREATE UNIQUE INDEX "paypal_order_logs_id_key" ON "paypal_order_logs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "paypal_order_logs_bookingId_key" ON "paypal_order_logs"("bookingId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercicesOnLessons" ADD CONSTRAINT "ExercicesOnLessons_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercicesOnLessons" ADD CONSTRAINT "ExercicesOnLessons_exerciceId_fkey" FOREIGN KEY ("exerciceId") REFERENCES "exercice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AudioOnResources" ADD CONSTRAINT "AudioOnResources_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AudioOnResources" ADD CONSTRAINT "AudioOnResources_audioId_fkey" FOREIGN KEY ("audioId") REFERENCES "Audio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonCodes" ADD CONSTRAINT "LessonCodes_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paypal_order_logs" ADD CONSTRAINT "paypal_order_logs_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
