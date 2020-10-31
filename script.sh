ASSETSFOLDER=assets/timeline
for mediafile in `ls $ASSETSFOLDER | grep .mp4`; do
  FILENAME=$(echo $mediafile | sed -n 's/.mp4//p' | sed -n 's/-1920x1080//p')
  INPUT=$ASSETSFOLDER/$mediafile
  FOLDER_TARGET=$ASSETSFOLDER/$FILENAME
  mkdir -p $FOLDER_TARGET
done