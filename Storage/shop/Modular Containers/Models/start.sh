#!/bin/bash
for i in `seq 1 1`;
do
    #echo i=$i
    if [ $i -eq 1 ]
    then
        clearence="0.2"
    fi
    echo clearence=$clearence

    for j in `seq 1 3`;
    do
        #echo j=$j
        if [ $j -eq 1 ]
        then
            corner="false"
            wall="false"
        elif [ $j -eq 2 ]
        then
            corner="true"
            wall="false"
        elif [ $j -eq 3 ]
        then
            corner="false"
            wall="true"
        fi
        echo corner=$corner
        echo wall=$wall

        for k in `seq 1 5`;
        do
            #echo k=$k
            length=$k
            echo length=$length

            for l in `seq 1 5`;
            do
                #echo l=$l
                width=$l
                echo width=$width

                for m in `seq 1 2`
                do
                    #echo m=$m
                    (( height = m * 20))
                    echo height=$height

                    fname=""

                    if [ $corner = "true" ]
                    then
                        fname+="corner "
                    elif [ $wall = "true" ]
                    then
                        fname+="wall "
                    fi

                    fname+=$clearence
                    fname+="c "

                    fname+=$length
                    fname+="x"
                    fname+=$width
                    fname+="x"
                    fname+=$height
                    fname+=" Modular Container.stl"
                    
                    echo $fname
                    # -D corner=$corner wall=$wall length=$length width=$width height=$height
                    openscad -D clearence=$clearence -D corner=$corner -D wall=$wall -D length=$length -D width=$width -D height=$height -o "$fname" modularContainer.scad
                done
            done
        done
    done
done