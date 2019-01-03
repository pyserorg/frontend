#!/bin/sh


BIN_DIR=`dirname $0`
. "${BIN_DIR}/common.sh"
setup


cd "${PROJECT_ROOT}"
"${PACKAGE_MANAGER}" test --coverage --color
