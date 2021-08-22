#!/bin/sh
find  ~/clinic-management/pages-management --name "*.tsx" -exec sh -c 'mv "$1" "${1%.tsx}.js"' _ {} \;