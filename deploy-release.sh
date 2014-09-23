#!/bin/bash
set -e

# Sync the contents of this directory where the site should have been built
SOURCE_DIR=./

if [ ! -d "$SOURCE_DIR" ]; then
  echo "SOURCE_DIR ($SOURCE_DIR) does not exist, build the source directory before deploying"
  exit 1
fi

REPO=$(git config remote.origin.url)

if [ -n "$TRAVIS_BUILD_ID" ]; then

  echo TARGET_BRANCH: $TARGET_BRANCH
  echo DEPLOY_BRANCH: $DEPLOY_BRANCH

  if [ "$TRAVIS_BRANCH" != "$DEPLOY_BRANCH" ]; then
    echo "Travis should only deploy from the DEPLOY_BRANCH ($DEPLOY_BRANCH) branch"
    exit 0
  else
    if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
      echo "Travis should not deploy from pull requests"
      exit 0
    else
      REPO=${REPO/git:\/\/github.com\//git@github.com:}
    fi
  fi
fi


REPO_NAME=$(basename $REPO)
echo REPO_NAME: ${REPO_NAME}

TARGET_DIR=$(mktemp -d /tmp/$REPO_NAME.XXXX)
echo TARGET_DIR: ${TARGET_DIR}

echo '0'
REV=$(git rev-parse HEAD)

git remote set-url origin https://${GIT_TOKEN}@github.com/PlainConcepts/DBHApi.git
git clone --branch realease https://${GIT_TOKEN}@github.com/PlainConcepts/DBHApi.git ${TARGET_DIR}


echo '1'
rsync -rt --delete --exclude=".git" --exclude=".travis.yml" $SOURCE_DIR/ $TARGET_DIR/
cd $TARGET_DIR
git add -A .
git commit --allow-empty -m "Built from commit $REV"
echo '2'
git push https://${GIT_TOKEN}@github.com/PlainConcepts/DBHApi.git $TARGET_BRANCH
echo '3'

