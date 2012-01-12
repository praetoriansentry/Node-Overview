#!/usr/bin/perl

print "starttime\tseconds\tctime\tdtime\tttime\twait\tindex\tlang\tconcurrency\tlabel\n";
$i = 1;
while(<>) {
    if (/^starttime/) {
        $i = 1;
        next;
    }
    chomp;
    $ARGV =~ /(.+?)_\d+?_(\d+?)\.dat/;
    print;
    print "\t";
    print $i;
    print "\t";
    print $1;
    print "\t";
    print $2;
    print "\t";
    print $1;
    print ' ';
    print $2;
    print ' Concurrent';
    print "\n";
    $i++;
}
