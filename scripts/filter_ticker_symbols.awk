BEGIN {FS = ","; "date +'%Y-%m-%d'"|getline date;}
($3 != "Mutual Fund") && (($5 ~ /19[0-9][0-9]/) || ($5 ~ /20[0-9][0-9]/)) && ($6 ~ /2021/) && ($2 !~ /SHE|SHG/) && ($2 != "") && ($1 !~ /[:alpha:]/)  {
    gsub(" ", "_", $2); print $1","$2","$3","$4","$5","$6
    }

