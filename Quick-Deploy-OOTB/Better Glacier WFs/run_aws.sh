#!/bin/bash
export QTDIR=/usr/lib64/qt-3.3
export QTINC=/usr/lib64/qt-3.3/include
export http_proxy=http://ccproxy01.disid.disney.com:8081
export PATH=/reachengine/cmds:/reachengine/utilities:/usr/lib/jvm/java-1.7.0-openjdk.x86_64/bin:/usr/lib64/qt-3.3/bin:/usr/local/bin:/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/sbin
export MAIL=/var/spool/mail/svcreachengine
export JAVA_HOME=/usr/lib/jvm/java-1.7.0-openjdk.x86_64
export LANG=en_US.UTF-8
export https_proxy=http://ccproxy01.disid.disney.com:8081
export HOME=/home/local/DISID/svcreachengine
export SHLVL=2
export LOGNAME=svcreachengine
export CVS_RSH=ssh
export QTLIB=/usr/lib64/qt-3.3/lib
export G_BROKEN_FILENAMES=1

aws "$@"