rm -rf /usr/share/logtalk
rm -rf /usr/share/logtalk-3.41.0-stable
git clone https://github.com/LogtalkDotOrg/logtalk3.git 
mv ./logtalk3 /usr/share/logtalk
sh /usr/share/logtalk/scripts/install.sh