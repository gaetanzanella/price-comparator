#!/usr/bin/env bash

echoStart() { echo "# 🚀 $1"; }
echoSuccess() { echo "# ✅ $1"; }
die() { echo "$2" >&2; exit "$1"; }
try() { ( set -x; "$@"; ); ret="$?"; (( "$ret" == 0 )) || die 3 "Error while calling '$*' ($ret)"; }
