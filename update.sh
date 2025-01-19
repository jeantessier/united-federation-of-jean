#!/bin/sh

for service in book-service author-service year-service gateway
do
    echo '==========' $service '==========='
    (
        cd $service
        npm update
    )
done

