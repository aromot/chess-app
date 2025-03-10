-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_directoryId_fkey" FOREIGN KEY ("directoryId") REFERENCES "Directory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
