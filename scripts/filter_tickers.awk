BEGIN {FS = ","; "date +'%Y-%m-%d'"|getline date;}
(($6 ~ /202[0-9]/) && ($5 ~ /19[0-9][0-9]/) || ($5 ~ /200[0-9]/)) && ($2 !~ /SHE|SHG/) && ($2 != "")  {
    gsub(" ", "_", $2); print $1","$2","$3","$4","$5","$6
    }

