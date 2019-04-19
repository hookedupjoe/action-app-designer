echo off
REM 1 = yourname@us.ibm.com (i.e. joefran@us.ibm.com)
REM 2 = Org (i.e. joefran)
REM 3 = Space (i.e. dev)
ibmcloud api https://api.ng.bluemix.net
ibmcloud login -u %1 -o %2 -s %3 --sso
echo on