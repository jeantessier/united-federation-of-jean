#!/bin/sh

readonly SERVICES=(
    book-service
    author-service
    year-service
    gateway
)

for service in ${SERVICES[*]}
do
    echo '==========' $service '=========='
    (
        cd $service
        \rm -R node_modules package-lock.json
        npm install
    )
done
