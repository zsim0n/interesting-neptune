#!/usr/bin/env bash

set -e
set -o pipefail
set -v

curl -s -X POST https://api.stackbit.com/project/5f11a419257e7b001ec8b6d2/webhook/build/pull > /dev/null
npx @stackbit/stackbit-pull --stackbit-pull-api-url=https://api.stackbit.com/pull/5f11a419257e7b001ec8b6d2
curl -s -X POST https://api.stackbit.com/project/5f11a419257e7b001ec8b6d2/webhook/build/ssgbuild > /dev/null
gatsby build
curl -s -X POST https://api.stackbit.com/project/5f11a419257e7b001ec8b6d2/webhook/build/publish > /dev/null
